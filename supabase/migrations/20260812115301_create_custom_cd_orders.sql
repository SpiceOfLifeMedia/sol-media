create schema if not exists private;

revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;

create table private.custom_cd_orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique check (reference ~ '^SOL-[0-9]{6}$'),
  client_idempotency_key uuid not null unique,
  status text not null default 'awaiting_etsy_payment'
    check (status in ('awaiting_etsy_payment', 'paid', 'cancelled')),
  full_name text not null,
  customer_email text not null,
  phone text not null,
  country text not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  email_delivery_state text not null default 'pending'
    check (email_delivery_state in ('pending', 'sent', 'partial_failure', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index custom_cd_orders_status_created_at_idx
  on private.custom_cd_orders (status, created_at desc);

create table private.custom_cd_rate_limits (
  fingerprint text not null,
  window_started_at timestamptz not null,
  attempts integer not null default 1 check (attempts > 0),
  primary key (fingerprint, window_started_at)
);

alter table private.custom_cd_orders enable row level security;
alter table private.custom_cd_rate_limits enable row level security;

revoke all on private.custom_cd_orders from public, anon, authenticated;
revoke all on private.custom_cd_rate_limits from public, anon, authenticated;
grant select, insert, update on private.custom_cd_orders to service_role;
grant select, insert, update, delete on private.custom_cd_rate_limits to service_role;

create or replace function public.create_custom_cd_order(
  p_payload jsonb,
  p_fingerprint text,
  p_idempotency_key uuid
)
returns table(reference text, created boolean)
language plpgsql
set search_path = pg_catalog, private
as $$
declare
  existing_reference text;
  current_attempts integer;
  rate_window timestamptz := date_trunc('hour', now());
  generated_reference text;
  inserted boolean := false;
begin
  select order_row.reference
    into existing_reference
    from private.custom_cd_orders as order_row
   where order_row.client_idempotency_key = p_idempotency_key;

  if existing_reference is not null then
    return query select existing_reference, false;
    return;
  end if;

  delete from private.custom_cd_rate_limits
   where window_started_at < now() - interval '7 days';

  insert into private.custom_cd_rate_limits (fingerprint, window_started_at, attempts)
  values (p_fingerprint, rate_window, 1)
  on conflict (fingerprint, window_started_at)
  do update set attempts = private.custom_cd_rate_limits.attempts + 1
  returning attempts into current_attempts;

  if current_attempts > 5 then
    raise exception 'rate_limit_exceeded' using errcode = 'P0001';
  end if;

  for attempt_number in 1..25 loop
    generated_reference := 'SOL-' || lpad(floor(random() * 1000000)::integer::text, 6, '0');
    begin
      insert into private.custom_cd_orders (
        reference,
        client_idempotency_key,
        full_name,
        customer_email,
        phone,
        country,
        payload
      ) values (
        generated_reference,
        p_idempotency_key,
        trim(p_payload->>'fullName'),
        lower(trim(p_payload->>'email')),
        trim(p_payload->>'phone'),
        trim(p_payload->>'country'),
        p_payload
      );
      inserted := true;
      exit;
    exception when unique_violation then
      select order_row.reference
        into existing_reference
        from private.custom_cd_orders as order_row
       where order_row.client_idempotency_key = p_idempotency_key;
      if existing_reference is not null then
        return query select existing_reference, false;
        return;
      end if;
    end;
  end loop;

  if not inserted then
    raise exception 'reference_generation_failed' using errcode = 'P0001';
  end if;

  return query select generated_reference, true;
end;
$$;

create or replace function public.mark_custom_cd_order_email_state(
  p_reference text,
  p_state text
)
returns void
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if p_state not in ('pending', 'sent', 'partial_failure', 'failed') then
    raise exception 'invalid_email_state' using errcode = '22023';
  end if;

  update private.custom_cd_orders
     set email_delivery_state = p_state,
         updated_at = now()
   where reference = p_reference;
end;
$$;

revoke all on function public.create_custom_cd_order(jsonb, text, uuid) from public, anon, authenticated;
revoke all on function public.mark_custom_cd_order_email_state(text, text) from public, anon, authenticated;
grant execute on function public.create_custom_cd_order(jsonb, text, uuid) to service_role;
grant execute on function public.mark_custom_cd_order_email_state(text, text) to service_role;

alter table private.custom_cd_orders
  drop constraint if exists custom_cd_orders_status_check;

alter table private.custom_cd_orders
  add constraint custom_cd_orders_status_check
  check (status in ('awaiting_etsy_payment', 'awaiting_site_payment', 'paid', 'cancelled'));

alter table private.custom_cd_orders
  add column if not exists payment_channel text not null default 'etsy'
    check (payment_channel in ('etsy', 'site')),
  add column if not exists stripe_checkout_session_id text unique,
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists amount_total integer check (amount_total is null or amount_total > 0),
  add column if not exists amount_paid integer check (amount_paid is null or amount_paid >= 0),
  add column if not exists paid_at timestamptz,
  add column if not exists customer_payment_email_delivery_state text not null default 'pending'
    check (customer_payment_email_delivery_state in ('pending', 'sent', 'failed')),
  add column if not exists owner_payment_email_delivery_state text not null default 'pending'
    check (owner_payment_email_delivery_state in ('pending', 'sent', 'failed'));

create index if not exists custom_cd_orders_checkout_session_idx
  on private.custom_cd_orders (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

drop function if exists public.create_custom_cd_order(jsonb, text, uuid);

create function public.create_custom_cd_order(
  p_payload jsonb,
  p_fingerprint text,
  p_idempotency_key uuid
)
returns table(
  reference text,
  created boolean,
  payment_channel text,
  stripe_checkout_session_id text
)
language plpgsql
set search_path = pg_catalog, private
as $$
declare
  existing_order private.custom_cd_orders%rowtype;
  current_attempts integer;
  rate_window timestamptz := date_trunc('hour', now());
  generated_reference text;
  inserted boolean := false;
  requested_channel text := p_payload->>'checkoutMethod';
  requested_amount integer;
begin
  if requested_channel not in ('etsy', 'site') then
    raise exception 'invalid_payment_channel' using errcode = '22023';
  end if;

  if jsonb_typeof(p_payload->'amountTotal') = 'number' then
    requested_amount := (p_payload->>'amountTotal')::integer;
  end if;
  if requested_amount is null or requested_amount <= 0 then
    raise exception 'invalid_amount_total' using errcode = '22023';
  end if;

  select order_row.*
    into existing_order
    from private.custom_cd_orders as order_row
   where order_row.client_idempotency_key = p_idempotency_key;

  if existing_order.reference is not null then
    return query select existing_order.reference, false, existing_order.payment_channel, existing_order.stripe_checkout_session_id;
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
        status,
        payment_channel,
        full_name,
        customer_email,
        phone,
        country,
        amount_total,
        payload
      ) values (
        generated_reference,
        p_idempotency_key,
        case when requested_channel = 'site' then 'awaiting_site_payment' else 'awaiting_etsy_payment' end,
        requested_channel,
        trim(p_payload->>'fullName'),
        lower(trim(p_payload->>'email')),
        trim(p_payload->>'phone'),
        trim(p_payload->>'country'),
        requested_amount,
        p_payload
      );
      inserted := true;
      exit;
    exception when unique_violation then
      select order_row.*
        into existing_order
        from private.custom_cd_orders as order_row
       where order_row.client_idempotency_key = p_idempotency_key;
      if existing_order.reference is not null then
        return query select existing_order.reference, false, existing_order.payment_channel, existing_order.stripe_checkout_session_id;
        return;
      end if;
    end;
  end loop;

  if not inserted then
    raise exception 'reference_generation_failed' using errcode = 'P0001';
  end if;

  return query select generated_reference, true, requested_channel, null::text;
end;
$$;

create or replace function public.attach_custom_cd_checkout(
  p_reference text,
  p_checkout_session_id text,
  p_customer_id text,
  p_amount_total integer
)
returns void
language plpgsql
set search_path = pg_catalog, private
as $$
declare
  affected_rows integer;
begin
  if p_checkout_session_id !~ '^cs_' or p_customer_id !~ '^cus_' or p_amount_total <= 0 then
    raise exception 'invalid_checkout_details' using errcode = '22023';
  end if;

  update private.custom_cd_orders as order_row
     set stripe_checkout_session_id = p_checkout_session_id,
         stripe_customer_id = p_customer_id,
         updated_at = now()
   where order_row.reference = p_reference
     and order_row.payment_channel = 'site'
     and order_row.status in ('awaiting_site_payment', 'paid')
     and order_row.amount_total = p_amount_total
     and (order_row.stripe_checkout_session_id is null or order_row.stripe_checkout_session_id = p_checkout_session_id);

  get diagnostics affected_rows = row_count;
  if affected_rows <> 1 then
    raise exception 'checkout_order_mismatch' using errcode = 'P0001';
  end if;
end;
$$;

create or replace function public.mark_custom_cd_order_paid(
  p_reference text,
  p_checkout_session_id text,
  p_payment_intent_id text,
  p_amount_subtotal integer,
  p_amount_paid integer,
  p_reward_code text default null
)
returns table(
  reference text,
  full_name text,
  customer_email text,
  phone text,
  payload jsonb,
  amount_total integer,
  amount_paid integer,
  reward_code text,
  customer_payment_email_delivery_state text,
  owner_payment_email_delivery_state text
)
language plpgsql
set search_path = pg_catalog, private
as $$
declare
  order_record private.custom_cd_orders%rowtype;
begin
  select order_row.*
    into order_record
    from private.custom_cd_orders as order_row
   where order_row.reference = p_reference
   for update;

  if order_record.reference is null
     or order_record.payment_channel <> 'site'
     or order_record.status not in ('awaiting_site_payment', 'paid')
     or order_record.stripe_checkout_session_id <> p_checkout_session_id
     or order_record.amount_total <> p_amount_subtotal
     or p_amount_paid < 0
     or p_amount_paid > p_amount_subtotal
     or (p_reward_code is not null and p_reward_code !~ '^SOL5-[0-9]{6}$') then
    raise exception 'paid_order_mismatch' using errcode = 'P0001';
  end if;

  update private.custom_cd_orders as order_row
     set status = 'paid',
         stripe_payment_intent_id = coalesce(nullif(p_payment_intent_id, ''), order_row.stripe_payment_intent_id),
         amount_paid = p_amount_paid,
         paid_at = coalesce(order_row.paid_at, now()),
         marketing_consent = coalesce((order_row.payload->>'marketingConsent')::boolean, false),
         marketing_consent_at = case
           when coalesce((order_row.payload->>'marketingConsent')::boolean, false) then coalesce(order_row.marketing_consent_at, now())
           else order_row.marketing_consent_at
         end,
         followup_promo_code = coalesce(order_row.followup_promo_code, p_reward_code),
         updated_at = now()
   where order_row.reference = p_reference
   returning order_row.* into order_record;

  return query select
    order_record.reference,
    order_record.full_name,
    order_record.customer_email,
    order_record.phone,
    order_record.payload,
    order_record.amount_total,
    order_record.amount_paid,
    order_record.followup_promo_code,
    order_record.customer_payment_email_delivery_state,
    order_record.owner_payment_email_delivery_state;
end;
$$;

create or replace function public.mark_custom_cd_payment_email_state(
  p_reference text,
  p_email_kind text,
  p_state text
)
returns void
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if p_email_kind not in ('customer', 'owner') or p_state not in ('pending', 'sent', 'failed') then
    raise exception 'invalid_payment_email_state' using errcode = '22023';
  end if;

  update private.custom_cd_orders
     set customer_payment_email_delivery_state = case when p_email_kind = 'customer' then p_state else customer_payment_email_delivery_state end,
         owner_payment_email_delivery_state = case when p_email_kind = 'owner' then p_state else owner_payment_email_delivery_state end,
         updated_at = now()
   where reference = p_reference;
end;
$$;

revoke all on function public.create_custom_cd_order(jsonb, text, uuid) from public, anon, authenticated;
revoke all on function public.attach_custom_cd_checkout(text, text, text, integer) from public, anon, authenticated;
revoke all on function public.mark_custom_cd_order_paid(text, text, text, integer, integer, text) from public, anon, authenticated;
revoke all on function public.mark_custom_cd_payment_email_state(text, text, text) from public, anon, authenticated;
grant execute on function public.create_custom_cd_order(jsonb, text, uuid) to service_role;
grant execute on function public.attach_custom_cd_checkout(text, text, text, integer) to service_role;
grant execute on function public.mark_custom_cd_order_paid(text, text, text, integer, integer, text) to service_role;
grant execute on function public.mark_custom_cd_payment_email_state(text, text, text) to service_role;

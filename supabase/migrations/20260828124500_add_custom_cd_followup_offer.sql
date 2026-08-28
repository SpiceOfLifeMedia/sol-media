alter table private.custom_cd_orders
  add column marketing_consent boolean not null default false,
  add column marketing_consent_at timestamptz,
  add column marketing_unsubscribed_at timestamptz,
  add column followup_promo_code text,
  add column followup_email_id text,
  add column followup_email_scheduled_at timestamptz,
  add column followup_email_state text not null default 'not_requested',
  add column unsubscribe_token_hash text;

alter table private.custom_cd_orders
  add constraint custom_cd_orders_followup_email_state_check
    check (followup_email_state in ('not_requested', 'pending', 'scheduled', 'failed', 'cancelled')),
  add constraint custom_cd_orders_followup_promo_code_check
    check (followup_promo_code is null or followup_promo_code ~ '^SOL5-[0-9]{6}$');

create unique index custom_cd_orders_followup_promo_code_idx
  on private.custom_cd_orders (followup_promo_code)
  where followup_promo_code is not null;

create unique index custom_cd_orders_unsubscribe_token_hash_idx
  on private.custom_cd_orders (unsubscribe_token_hash)
  where unsubscribe_token_hash is not null;

create or replace function public.configure_custom_cd_followup(
  p_reference text,
  p_marketing_consent boolean,
  p_unsubscribe_token_hash text
)
returns table(promo_code text)
language plpgsql
set search_path = pg_catalog, private
as $$
declare
  generated_promo_code text;
begin
  if p_marketing_consent and coalesce(length(p_unsubscribe_token_hash), 0) <> 64 then
    raise exception 'invalid_unsubscribe_token_hash' using errcode = '22023';
  end if;

  update private.custom_cd_orders
     set marketing_consent = p_marketing_consent,
         marketing_consent_at = case when p_marketing_consent then now() else null end,
         followup_promo_code = case when p_marketing_consent then 'SOL5-' || substring(reference from 5) else null end,
         followup_email_state = case when p_marketing_consent then 'pending' else 'not_requested' end,
         unsubscribe_token_hash = case when p_marketing_consent then p_unsubscribe_token_hash else null end,
         updated_at = now()
   where reference = p_reference
   returning followup_promo_code into generated_promo_code;

  if not found then
    raise exception 'order_not_found' using errcode = 'P0002';
  end if;

  return query select generated_promo_code;
end;
$$;

create or replace function public.mark_custom_cd_followup_email_state(
  p_reference text,
  p_state text,
  p_email_id text default null,
  p_scheduled_at timestamptz default null
)
returns void
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  if p_state not in ('pending', 'scheduled', 'failed', 'cancelled') then
    raise exception 'invalid_followup_email_state' using errcode = '22023';
  end if;

  update private.custom_cd_orders
     set followup_email_state = p_state,
         followup_email_id = coalesce(p_email_id, followup_email_id),
         followup_email_scheduled_at = coalesce(p_scheduled_at, followup_email_scheduled_at),
         updated_at = now()
   where reference = p_reference;
end;
$$;

create or replace function public.unsubscribe_custom_cd_followup(
  p_unsubscribe_token_hash text
)
returns table(email_id text)
language plpgsql
set search_path = pg_catalog, private
as $$
begin
  return query
  update private.custom_cd_orders
     set marketing_consent = false,
         marketing_unsubscribed_at = coalesce(marketing_unsubscribed_at, now()),
         followup_email_state = 'cancelled',
         updated_at = now()
   where unsubscribe_token_hash = p_unsubscribe_token_hash
   returning followup_email_id;
end;
$$;

revoke all on function public.configure_custom_cd_followup(text, boolean, text) from public, anon, authenticated;
revoke all on function public.mark_custom_cd_followup_email_state(text, text, text, timestamptz) from public, anon, authenticated;
revoke all on function public.unsubscribe_custom_cd_followup(text) from public, anon, authenticated;
grant execute on function public.configure_custom_cd_followup(text, boolean, text) to service_role;
grant execute on function public.mark_custom_cd_followup_email_state(text, text, text, timestamptz) to service_role;
grant execute on function public.unsubscribe_custom_cd_followup(text) to service_role;

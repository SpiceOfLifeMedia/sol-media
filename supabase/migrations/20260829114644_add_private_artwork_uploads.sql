insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'custom-cd-artwork',
  'custom-cd-artwork',
  false,
  20971520,
  array['image/png', 'image/jpeg', 'application/pdf']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create table if not exists private.custom_cd_artwork_uploads (
  idempotency_key uuid primary key,
  fingerprint text not null,
  files jsonb not null,
  created_at timestamptz not null default now(),
  finalized_at timestamptz
);

alter table private.custom_cd_artwork_uploads enable row level security;

revoke all on table private.custom_cd_artwork_uploads from public, anon, authenticated;
grant select, insert, update on table private.custom_cd_artwork_uploads to service_role;

create or replace function public.prepare_custom_cd_artwork_upload(
  p_idempotency_key uuid,
  p_fingerprint text,
  p_files jsonb
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, private
as $$
begin
  if p_fingerprint is null or length(p_fingerprint) < 16 then
    raise exception 'invalid_fingerprint';
  end if;

  if jsonb_typeof(p_files) <> 'object'
     or not (p_files ?& array['front', 'back', 'disc'])
     or (select count(*) from jsonb_object_keys(p_files)) <> 3 then
    raise exception 'invalid_artwork_files';
  end if;

  if exists (
    select 1
    from private.custom_cd_artwork_uploads
    where idempotency_key = p_idempotency_key
  ) then
    if not exists (
      select 1
      from private.custom_cd_artwork_uploads
      where idempotency_key = p_idempotency_key
        and fingerprint = p_fingerprint
        and files = p_files
        and finalized_at is null
    ) then
      raise exception 'upload_session_conflict';
    end if;
    return;
  end if;

  if (
    select count(*)
    from private.custom_cd_artwork_uploads
    where fingerprint = p_fingerprint
      and created_at >= now() - interval '1 hour'
  ) >= 5 then
    raise exception 'rate_limit_exceeded';
  end if;

  insert into private.custom_cd_artwork_uploads (idempotency_key, fingerprint, files)
  values (p_idempotency_key, p_fingerprint, p_files);
end;
$$;

create or replace function public.finalize_custom_cd_artwork_upload(
  p_idempotency_key uuid
)
returns void
language sql
security definer
set search_path = pg_catalog, private
as $$
  update private.custom_cd_artwork_uploads
  set finalized_at = coalesce(finalized_at, now())
  where idempotency_key = p_idempotency_key;
$$;

revoke all on function public.prepare_custom_cd_artwork_upload(uuid, text, jsonb) from public, anon, authenticated;
revoke all on function public.finalize_custom_cd_artwork_upload(uuid) from public, anon, authenticated;
grant execute on function public.prepare_custom_cd_artwork_upload(uuid, text, jsonb) to service_role;
grant execute on function public.finalize_custom_cd_artwork_upload(uuid) to service_role;

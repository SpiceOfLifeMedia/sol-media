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

revoke all on function public.prepare_custom_cd_artwork_upload(uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.prepare_custom_cd_artwork_upload(uuid, text, jsonb) to service_role;

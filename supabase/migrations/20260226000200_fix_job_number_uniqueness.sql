-- Make job numbers unique per company (not globally), and allocate atomically.

-- Replace global unique(job_number) with unique(company_id, job_number).
alter table public.jobs
drop constraint if exists jobs_job_number_key;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'jobs_company_id_job_number_key'
      and conrelid = 'public.jobs'::regclass
  ) then
    alter table public.jobs
      add constraint jobs_company_id_job_number_key unique (company_id, job_number);
  end if;
end
$$;

-- Allocate the next job number by reading current max under a transaction lock.
create or replace function public.assign_job_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  max_value integer;
begin
  if new.job_number is not null and btrim(new.job_number) <> '' then
    return new;
  end if;

  if new.company_id is null then
    raise exception 'company_id is required to generate job_number';
  end if;

  -- Serialize numbering per company within the current transaction.
  perform pg_advisory_xact_lock(hashtext(new.company_id::text));

  select coalesce(
    max(nullif(regexp_replace(j.job_number, '\D', '', 'g'), '')::integer),
    0
  )
  into max_value
  from public.jobs j
  where j.company_id = new.company_id;

  new.job_number := 'JOB-' || lpad((max_value + 1)::text, 3, '0');
  return new;
end;
$$;

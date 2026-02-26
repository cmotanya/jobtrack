-- Atomic per-company job number allocation.
-- This avoids race conditions from app-side "count + 1" logic.

create table if not exists public.company_job_counters (
  company_id uuid primary key,
  last_value integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Seed counters from existing jobs so numbering continues correctly.
insert into public.company_job_counters (company_id, last_value)
select
  j.company_id,
  coalesce(max(nullif(regexp_replace(j.job_number, '\D', '', 'g'), '')::integer), 0) as last_value
from public.jobs j
where j.company_id is not null
group by j.company_id
on conflict (company_id) do update
set
  last_value = greatest(public.company_job_counters.last_value, excluded.last_value),
  updated_at = now();

create or replace function public.assign_job_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  next_value integer;
begin
  -- Respect explicit values if supplied.
  if new.job_number is not null and btrim(new.job_number) <> '' then
    return new;
  end if;

  if new.company_id is null then
    raise exception 'company_id is required to generate job_number';
  end if;

  insert into public.company_job_counters (company_id, last_value, updated_at)
  values (new.company_id, 1, now())
  on conflict (company_id) do update
  set
    last_value = public.company_job_counters.last_value + 1,
    updated_at = now()
  returning last_value into next_value;

  new.job_number := 'JOB-' || lpad(next_value::text, 3, '0');
  return new;
end;
$$;

drop trigger if exists before_insert_assign_job_number on public.jobs;

create trigger before_insert_assign_job_number
before insert on public.jobs
for each row
execute function public.assign_job_number();

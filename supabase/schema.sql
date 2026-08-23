-- Run this file once in Supabase: SQL Editor > New query.
-- Reservation data stays server-side: the browser never receives the service-role key.

create table if not exists public.restaurant_settings (
  id boolean primary key default true check (id),
  max_covers_per_slot integer not null default 30 check (max_covers_per_slot > 0)
);

insert into public.restaurant_settings (id, max_covers_per_slot)
values (true, 30)
on conflict (id) do nothing;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  reservation_date date not null,
  reservation_time time not null,
  guests smallint not null check (guests between 1 and 20),
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_slot_idx
  on public.reservations (reservation_date, reservation_time, status);

-- Serialises the availability check and insert, avoiding overbooking during simultaneous requests.
create or replace function public.create_reservation(
  p_guest_name text,
  p_guest_email text,
  p_guest_phone text,
  p_reservation_date date,
  p_reservation_time time,
  p_guests smallint,
  p_notes text default null
)
returns public.reservations
language plpgsql
security definer
set search_path = public
as $$
declare
  max_covers integer;
  booked_covers integer;
  result public.reservations;
begin
  select max_covers_per_slot into max_covers
  from public.restaurant_settings
  where id = true
  for update;

  select coalesce(sum(guests), 0) into booked_covers
  from public.reservations
  where reservation_date = p_reservation_date
    and reservation_time = p_reservation_time
    and status in ('pending', 'confirmed');

  if booked_covers + p_guests > max_covers then
    raise exception 'Ce créneau n’est plus disponible.';
  end if;

  insert into public.reservations (
    guest_name, guest_email, guest_phone, reservation_date, reservation_time, guests, notes
  ) values (
    p_guest_name, p_guest_email, p_guest_phone, p_reservation_date, p_reservation_time, p_guests, p_notes
  ) returning * into result;

  return result;
end;
$$;

alter table public.restaurant_settings enable row level security;
alter table public.reservations enable row level security;

revoke all on public.restaurant_settings from anon, authenticated;
revoke all on public.reservations from anon, authenticated;
revoke all on function public.create_reservation(text, text, text, date, time, smallint, text) from public;
grant execute on function public.create_reservation(text, text, text, date, time, smallint, text) to service_role;

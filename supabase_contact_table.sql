-- Create 'contact' table for contact form submissions
create table public.contact (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied', 'archived'))
);

-- Enable Row Level Security (RLS)
alter table public.contact enable row level security;

-- Create policy to allow anonymous inserts
create policy "Allow anonymous inserts"
  on public.contact
  for insert
  with check (true);

-- Create policy to allow only authenticated users to read/update (admin access)
create policy "Allow authenticated users to view"
  on public.contact
  for select
  using (auth.role() = 'authenticated');

create policy "Allow authenticated users to update"
  on public.contact
  for update
  using (auth.role() = 'authenticated');

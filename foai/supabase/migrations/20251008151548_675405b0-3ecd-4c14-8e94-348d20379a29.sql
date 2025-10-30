-- Create enum for problem status
create type public.problem_status as enum ('pending', 'processing', 'solved', 'error');

-- Create problems table to store uploaded math problems and solutions
create table public.problems (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  image_url text not null,
  recognized_eq text,
  latex_form text,
  steps jsonb,
  final_answer text,
  status problem_status default 'pending' not null,
  error_message text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.problems enable row level security;

-- RLS policies for problems
create policy "Users can view their own problems"
  on public.problems for select
  using (auth.uid() = user_id);

create policy "Users can insert their own problems"
  on public.problems for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own problems"
  on public.problems for update
  using (auth.uid() = user_id);

create policy "Users can delete their own problems"
  on public.problems for delete
  using (auth.uid() = user_id);

-- Create storage bucket for uploaded images
insert into storage.buckets (id, name, public)
values ('math-uploads', 'math-uploads', true);

-- Storage policies for math-uploads bucket
create policy "Users can upload their own images"
  on storage.objects for insert
  with check (
    bucket_id = 'math-uploads' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view their own images"
  on storage.objects for select
  using (
    bucket_id = 'math-uploads' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Anyone can view public images"
  on storage.objects for select
  using (bucket_id = 'math-uploads');

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to automatically update updated_at
create trigger update_problems_updated_at
  before update on public.problems
  for each row
  execute function public.update_updated_at_column();

-- C.S. Noël Nyundo School Website
-- Migration 1: Initial schema
-- No public access policies are created in this migration.

begin;

-- 1. School notices
create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 200),
  slug text not null unique check (char_length(slug) between 1 and 220),
  summary text check (summary is null or char_length(summary) <= 500),
  body text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);

-- 2. Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) <= 30),
  subject text not null check (char_length(subject) between 2 and 200),
  message text not null check (char_length(message) between 5 and 5000),
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'resolved', 'spam')),
  handled_by uuid references auth.users(id) on delete set null,
  handled_at timestamptz,
  created_at timestamptz not null default now()
);

-- 3. Public admission applications
create table public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  student_first_name text not null
    check (char_length(student_first_name) between 1 and 100),
  student_last_name text not null
    check (char_length(student_last_name) between 1 and 100),
  date_of_birth date not null
    check (date_of_birth <= current_date),
  class_applying text not null
    check (char_length(class_applying) between 1 and 100),
  previous_school text
    check (previous_school is null or char_length(previous_school) <= 200),
  parent_name text not null
    check (char_length(parent_name) between 2 and 150),
  parent_relationship text not null
    check (char_length(parent_relationship) between 2 and 50),
  parent_phone text not null
    check (char_length(parent_phone) between 7 and 30),
  parent_email text not null
    check (char_length(parent_email) <= 254),
  parent_address text
    check (parent_address is null or char_length(parent_address) <= 500),
  status text not null default 'submitted'
    check (status in (
      'submitted', 'under_review', 'needs_information',
      'accepted', 'rejected', 'withdrawn'
    )),
  reviewed_by uuid references auth.users(id) on delete set null,
  internal_notes text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- 4. Metadata for files held in private Supabase Storage
create table public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null
    references public.admission_applications(id) on delete cascade,
  storage_path text not null unique,
  original_file_name text not null
    check (char_length(original_file_name) between 1 and 255),
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  created_at timestamptz not null default now()
);

-- 5. Staff roles linked to Supabase Auth accounts
create table public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 150),
  role text not null
    check (role in ('admin', 'admissions_officer', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for common staff workflows
create index notices_status_published_at_idx
  on public.notices (status, published_at desc);

create index contact_messages_status_created_at_idx
  on public.contact_messages (status, created_at desc);

create index admission_applications_status_submitted_at_idx
  on public.admission_applications (status, submitted_at desc);

create index admission_applications_parent_email_idx
  on public.admission_applications (parent_email);

create index application_documents_application_id_idx
  on public.application_documents (application_id);

create index staff_profiles_role_active_idx
  on public.staff_profiles (role, active);

-- Enable Row Level Security on every application table
alter table public.notices enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admission_applications enable row level security;
alter table public.application_documents enable row level security;
alter table public.staff_profiles enable row level security;

-- No direct browser access until reviewed policies are added.
revoke all on table public.notices from anon, authenticated;
revoke all on table public.contact_messages from anon, authenticated;
revoke all on table public.admission_applications from anon, authenticated;
revoke all on table public.application_documents from anon, authenticated;
revoke all on table public.staff_profiles from anon, authenticated;

-- The trusted backend can perform server-side operations.
-- Keep its secret key exclusively on the server.
grant all on table public.notices to service_role;
grant all on table public.contact_messages to service_role;
grant all on table public.admission_applications to service_role;
grant all on table public.application_documents to service_role;
grant all on table public.staff_profiles to service_role;

commit;

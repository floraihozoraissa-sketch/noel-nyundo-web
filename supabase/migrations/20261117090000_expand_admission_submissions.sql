-- Admission submission expansion: preserve the existing schema and records.
begin;

alter table public.admission_applications
  add column if not exists student_middle_name text,
  add column if not exists gender text,
  add column if not exists nationality text,
  add column if not exists current_school text,
  add column if not exists current_class text,
  add column if not exists residential_address text,
  add column if not exists father_details jsonb,
  add column if not exists mother_details jsonb,
  add column if not exists emergency_contact jsonb;

alter table public.admission_applications
  drop constraint if exists admission_applications_gender_check;
alter table public.admission_applications
  add constraint admission_applications_gender_check
  check (gender is null or gender in ('male', 'female'));

alter table public.admission_applications
  drop constraint if exists admission_applications_nationality_check;
alter table public.admission_applications
  add constraint admission_applications_nationality_check
  check (nationality is null or nationality in ('rwandan', 'other'));

alter table public.application_documents
  add column if not exists document_type text not null default 'other';

alter table public.application_documents
  drop constraint if exists application_documents_document_type_check;
alter table public.application_documents
  add constraint application_documents_document_type_check
  check (document_type in (
    'birthCertificate',
    'previousSchoolReport',
    'immunizationRecord',
    'passportPhotos',
    'baptismCertificate',
    'parentId',
    'transferCertificate',
    'other'
  ));

create index if not exists application_documents_type_idx
  on public.application_documents (application_id, document_type);

commit;

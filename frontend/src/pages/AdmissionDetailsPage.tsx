
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  FileText,
  LoaderCircle,
  Save,
  UserRound,
  Users,
  CalendarDays,
  AlertCircle,
} from 'lucide-react';

import { supabase } from '../services/supabaseClient';
import {
  getApplicationById,
  updateApplication,
} from '../services/admissionsApi';

import type {
  AdmissionApplication,
  ApplicationDocument,
  ApplicationStatus,
} from '../services/admissionsApi';

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'needs_information', label: 'Needs Information' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function formatStatus(status: ApplicationStatus) {
  return status.replaceAll('_', ' ').replace(/\b\w/g, (letter) =>
    letter.toUpperCase()
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdmissionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState<AdmissionApplication | null>(null);
  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);
  const [status, setStatus] = useState<ApplicationStatus>('submitted');
  const [internalNotes, setInternalNotes] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadApplication = useCallback(async () => {
    if (!id) {
      setError('Application ID is missing.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        navigate('/staff/login');
        return;
      }

      const result = await getApplicationById(session.access_token, id);

      setApplication(result.application);
      setDocuments(result.documents);
      setStatus(result.application.status);
      setInternalNotes(result.application.internal_notes ?? '');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load this application.'
      );
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    void loadApplication();
  }, [loadApplication]);

  async function handleSave() {
    if (!id) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        navigate('/staff/login');
        return;
      }

      const updated = await updateApplication(session.access_token, id, {
        status,
        internal_notes: internalNotes.trim() || null,
      });

      setApplication(updated);
      setStatus(updated.status);
      setInternalNotes(updated.internal_notes ?? '');
      setSuccess('Application updated successfully.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update this application.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <button
          onClick={() => navigate('/staff/dashboard/admissions')}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700"
        >
          <ArrowLeft size={18} />
          Back to applications
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error || 'Application not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => navigate('/staff/dashboard/admissions')}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to applications
      </button>

      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-teal-700">
            Admissions / Application review
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            {application.student_first_name} {application.student_last_name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Reference: {application.reference_code}
          </p>
        </div>

        <span className="w-fit rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800">
          {formatStatus(application.status)}
        </span>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-teal-50 p-2 text-teal-700">
                <UserRound size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student information
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Detail label="First name" value={application.student_first_name} />
              <Detail label="Last name" value={application.student_last_name} />
              <Detail
                label="Date of birth"
                value={formatDate(application.date_of_birth)}
              />
              <Detail label="Class applying for" value={application.class_applying} />
              <Detail
                label="Previous school"
                value={application.previous_school || 'Not provided'}
              />
              <Detail
                label="Submitted on"
                value={formatDate(application.submitted_at)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                <Users size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Parent / Guardian information
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Detail label="Full name" value={application.parent_name} />
              <Detail
                label="Relationship"
                value={application.parent_relationship}
              />
              <Detail label="Phone number" value={application.parent_phone} />
              <Detail
                label="Email address"
                value={application.parent_email || 'Not provided'}
              />
              <div className="sm:col-span-2">
                <Detail
                  label="Address"
                  value={application.parent_address || 'Not provided'}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                <FileText size={20} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Uploaded documents
              </h2>
            </div>

            {documents.length === 0 ? (
              <p className="text-sm text-slate-500">
                No documents have been uploaded for this application.
              </p>
            ) : (
              <div className="space-y-3">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText className="shrink-0 text-slate-500" size={20} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-800">
                          {document.original_file_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {document.mime_type} · {formatFileSize(document.size_bytes)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {formatDate(document.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Secure document viewing and downloading will be enabled separately.
            </p>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Review application
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the application decision and staff notes.
            </p>

            <label
              htmlFor="application-status"
              className="mb-2 mt-5 block text-sm font-medium text-slate-700"
            >
              Application status
            </label>
            <select
              id="application-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ApplicationStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label
              htmlFor="internal-notes"
              className="mb-2 mt-5 block text-sm font-medium text-slate-700"
            >
              Internal notes
            </label>
            <textarea
              id="internal-notes"
              rows={6}
              value={internalNotes}
              onChange={(event) => setInternalNotes(event.target.value)}
              placeholder="Write notes for authorized admissions staff..."
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <CalendarDays size={18} />
              <h2 className="font-semibold">Review history</h2>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <Detail
                label="Submitted"
                value={formatDate(application.submitted_at)}
              />
              <Detail
                label="Last reviewed"
                value={
                  application.reviewed_at
                    ? formatDate(application.reviewed_at)
                    : 'Not reviewed yet'
                }
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

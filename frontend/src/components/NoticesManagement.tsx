
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Send,
  Archive,
  RotateCcw,
  X,
  RefreshCw,
} from 'lucide-react';

import {
  getManageNotices,
  createNotice,
  updateNotice,
  updateNoticeStatus,
  deleteNotice,
  type ApiNotice,
  type NoticeStatus,
} from '../services/noticesApi';

type Props = {
  accessToken: string;
  role: 'admin' | 'admissions_officer' | 'editor';
};

type Filter = 'all' | NoticeStatus;

type NoticeForm = {
  title: string;
  summary: string;
  body: string;
};

const emptyForm: NoticeForm = {
  title: '',
  summary: '',
  body: '',
};

function formatDate(date: string | null) {
  if (!date) return 'Not published';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return 'Unknown date';

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

function statusStyle(status: NoticeStatus) {
  switch (status) {
    case 'published':
      return 'bg-green-50 text-green-700';
    case 'draft':
      return 'bg-amber-50 text-amber-700';
    case 'archived':
      return 'bg-slate-100 text-slate-600';
  }
}

export default function NoticesManagement({ accessToken, role }: Props) {
  const [notices, setNotices] = useState<ApiNotice[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<ApiNotice | null>(null);
  const [form, setForm] = useState<NoticeForm>(emptyForm);

  const canDelete = role === 'admin';

  async function loadNotices() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getManageNotices(accessToken);
      setNotices(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to load notices.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadNotices();
  }, [accessToken]);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesFilter =
        filter === 'all' || notice.status === filter;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        notice.title.toLowerCase().includes(searchText) ||
        notice.slug.toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [notices, filter, search]);

  function openCreateForm() {
    setEditingNotice(null);
    setForm(emptyForm);
    setErrorMessage('');
    setSuccessMessage('');
    setIsFormOpen(true);
  }

  function openEditForm(notice: ApiNotice) {
    setEditingNotice(notice);
    setForm({
      title: notice.title,
      summary: notice.summary ?? '',
      body: notice.body,
    });
    setErrorMessage('');
    setSuccessMessage('');
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingNotice(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      setErrorMessage('Please provide a title and notice content.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        title: form.title.trim(),
        summary: form.summary.trim() || null,
        body: form.body.trim(),
      };

      if (editingNotice) {
        await updateNotice(accessToken, editingNotice.id, payload);
        setSuccessMessage('Notice updated successfully.');
      } else {
        await createNotice(accessToken, {
          ...payload,
          status: 'draft',
        });
        setSuccessMessage('Notice saved as a draft.');
      }

      closeForm();
      await loadNotices();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to save notice.'
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(
    notice: ApiNotice,
    status: NoticeStatus
  ) {
    const action =
      status === 'published'
        ? 'publish'
        : status === 'archived'
          ? 'archive'
          : 'return to drafts';

    if (!window.confirm(`Are you sure you want to ${action} this notice?`)) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      await updateNoticeStatus(accessToken, notice.id, status);
      setSuccessMessage(`Notice ${action === 'return to drafts' ? 'returned to drafts' : `${action}ed`} successfully.`);
      await loadNotices();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to update notice status.'
      );
    }
  }

  async function handleDelete(notice: ApiNotice) {
    if (!canDelete) return;

    if (
      !window.confirm(
        `Delete "${notice.title}" permanently? This action cannot be undone.`
      )
    ) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      await deleteNotice(accessToken, notice.id);
      setSuccessMessage('Notice deleted successfully.');
      await loadNotices();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to delete notice.'
      );
    }
  }

  const counts = {
    all: notices.length,
    published: notices.filter((notice) => notice.status === 'published').length,
    draft: notices.filter((notice) => notice.status === 'draft').length,
    archived: notices.filter((notice) => notice.status === 'archived').length,
  };

  return (
    <section className="mt-8 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            School notices
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Create, update and manage announcements for the school community.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadNotices()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <Plus size={17} />
            Create notice
          </button>
        </div>
      </div>

      {errorMessage && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-teal-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">
                {editingNotice ? 'Edit notice' : 'Create a new notice'}
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                {editingNotice
                  ? 'Update the information below.'
                  : 'New notices are saved as drafts.'}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              aria-label="Close notice form"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={19} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="notice-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                Notice title *
              </label>
              <input
                id="notice-title"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                maxLength={200}
                required
                placeholder="Enter a clear notice title"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label htmlFor="notice-summary" className="mb-1.5 block text-sm font-medium text-slate-700">
                Short summary
              </label>
              <textarea
                id="notice-summary"
                value={form.summary}
                onChange={(event) =>
                  setForm({ ...form, summary: event.target.value })
                }
                maxLength={500}
                rows={2}
                placeholder="A short preview for students and parents"
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
              <p className="mt-1 text-right text-xs text-slate-400">
                {form.summary.length}/500
              </p>
            </div>

            <div>
              <label htmlFor="notice-body" className="mb-1.5 block text-sm font-medium text-slate-700">
                Notice content *
              </label>
              <textarea
                id="notice-body"
                value={form.body}
                onChange={(event) =>
                  setForm({ ...form, body: event.target.value })
                }
                required
                rows={8}
                placeholder="Write the full notice here..."
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 text-sm leading-6 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
            >
              {isSaving
                ? 'Saving...'
                : editingNotice
                  ? 'Save changes'
                  : 'Save as draft'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          ['all', 'All notices'],
          ['published', 'Published'],
          ['draft', 'Drafts'],
          ['archived', 'Archived'],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-xl border p-4 text-left transition ${
              filter === value
                ? 'border-teal-600 bg-teal-50'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {counts[value]}
            </p>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search notices by title..."
          className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-600"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLoading ? (
          <p className="p-8 text-center text-sm text-slate-500">
            Loading notices...
          </p>
        ) : filteredNotices.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-semibold text-slate-800">
              No notices found
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {search || filter !== 'all'
                ? 'Try changing your search or filter.'
                : 'Create your first school notice to get started.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotices.map((notice) => (
              <article
                key={notice.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-slate-900">
                      {notice.title}
                    </h4>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle(notice.status)}`}>
                      {notice.status}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {notice.summary || 'No summary provided.'}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {notice.status === 'published'
                      ? `Published ${formatDate(notice.published_at)}`
                      : `Created ${formatDate(notice.created_at)}`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(notice)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  {notice.status === 'draft' && (
                    <button
                      type="button"
                      onClick={() => void handleStatusChange(notice, 'published')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-800"
                    >
                      <Send size={14} />
                      Publish
                    </button>
                  )}

                  {notice.status === 'published' && (
                    <button
                      type="button"
                      onClick={() => void handleStatusChange(notice, 'archived')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <Archive size={14} />
                      Archive
                    </button>
                  )}

                  {notice.status === 'archived' && (
                    <button
                      type="button"
                      onClick={() => void handleStatusChange(notice, 'draft')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <RotateCcw size={14} />
                      Restore
                    </button>
                  )}

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => void handleDelete(notice)}
                      aria-label={`Delete ${notice.title}`}
                      className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

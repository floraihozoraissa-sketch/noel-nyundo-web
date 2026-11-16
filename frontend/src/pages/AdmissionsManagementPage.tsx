
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { supabase } from '../services/supabaseClient';
import {
  getApplications,
  type AdmissionApplication,
  type ApplicationStatus,
} from '../services/admissionsApi';

const PAGE_SIZE = 10;

const statusOptions: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All applications' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under review' },
  { value: 'needs_information', label: 'Needs information' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

const statusStyles: Record<ApplicationStatus, string> = {
  submitted: 'bg-blue-50 text-blue-700',
  under_review: 'bg-amber-50 text-amber-700',
  needs_information: 'bg-orange-50 text-orange-700',
  accepted: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-700',
  withdrawn: 'bg-slate-100 text-slate-600',
};

function formatStatus(status: ApplicationStatus) {
  return status.replaceAll('_', ' ').replace(/\b\w/g, (letter) =>
    letter.toUpperCase()
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

interface ApplicationStats {
  total: number;
  submitted: number;
  underReview: number;
  accepted: number;
}

const emptyStats: ApplicationStats = {
  total: 0,
  submitted: 0,
  underReview: 0,
  accepted: 0,
};

export default function AdmissionsManagementPage() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState('');
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [stats, setStats] = useState<ApplicationStats>(emptyStats);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadApplications = useCallback(
    async (token: string, currentPage: number, currentStatus: ApplicationStatus | 'all') => {
      const result = await getApplications(
        token,
        currentPage,
        PAGE_SIZE,
        currentStatus === 'all' ? undefined : currentStatus
      );

      setApplications(result.applications);
      setTotalPages(result.pagination.totalPages);
      setTotalApplications(result.pagination.total);
    },
    []
  );

  const loadStats = useCallback(async (token: string) => {
    const [all, submitted, underReview, accepted] = await Promise.all([
      getApplications(token, 1, 1),
      getApplications(token, 1, 1, 'submitted'),
      getApplications(token, 1, 1, 'under_review'),
      getApplications(token, 1, 1, 'accepted'),
    ]);

    setStats({
      total: all.pagination.total,
      submitted: submitted.pagination.total,
      underReview: underReview.pagination.total,
      accepted: accepted.pagination.total,
    });
  }, []);

  const loadDashboard = useCallback(
    async (token: string, currentPage: number, currentStatus: ApplicationStatus | 'all') => {
      setErrorMessage('');

      await Promise.all([
        loadApplications(token, currentPage, currentStatus),
        loadStats(token),
      ]);
    },
    [loadApplications, loadStats]
  );

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        const token = data.session?.access_token;

        if (!token) {
          navigate('/staff/login', { replace: true });
          return;
        }

        if (!isMounted) return;

        setAccessToken(token);
        await loadDashboard(token, page, statusFilter);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Unable to load admissions information.'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [navigate, loadDashboard, page, statusFilter]);

  const filteredApplications = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return applications;

    return applications.filter((application) => {
      const studentName =
        `${application.student_first_name} ${application.student_last_name}`.toLowerCase();

      return (
        studentName.includes(search) ||
        application.reference_code.toLowerCase().includes(search)
      );
    });
  }, [applications, searchTerm]);

  async function handleRefresh() {
    if (!accessToken) return;

    try {
      setIsRefreshing(true);
      await loadDashboard(accessToken, page, statusFilter);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to refresh applications.'
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleStatusChange(value: string) {
    setStatusFilter(value as ApplicationStatus | 'all');
    setPage(1);
  }

  const statCards = [
    {
      label: 'Total applications',
      value: stats.total,
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Submitted',
      value: stats.submitted,
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'Under review',
      value: stats.underReview,
      icon: Clock3,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Accepted',
      value: stats.accepted,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              STAFF WORKSPACE
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Admissions Management
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review and manage student admission applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleRefresh()}
            disabled={isRefreshing || isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? 'animate-spin' : ''}
            />
            Refresh
          </button>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        <section
          aria-label="Application statistics"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {isLoading ? '—' : card.value}
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 ${card.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Student applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {totalApplications} application
                  {totalApplications === 1 ? '' : 's'} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search student or reference..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => handleStatusChange(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  aria-label="Filter applications by status"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="text-center">
                <RefreshCw
                  size={28}
                  className="mx-auto animate-spin text-teal-600"
                />
                <p className="mt-3 text-sm text-slate-500">
                  Loading applications...
                </p>
              </div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <GraduationCap size={28} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {searchTerm ? 'No matching applications' : 'No applications yet'}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {searchTerm
                  ? 'Try another student name or reference code.'
                  : 'Applications submitted through the public admissions form will appear here.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Student</th>
                      <th className="px-5 py-4 font-semibold">Reference</th>
                      <th className="px-5 py-4 font-semibold">Class</th>
                      <th className="px-5 py-4 font-semibold">Submitted</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.map((application) => (
                      <tr
                        key={application.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {application.student_first_name}{' '}
                            {application.student_last_name}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-600">
                          {application.reference_code}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {application.class_applying}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(application.submitted_at)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                          >
                            {formatStatus(application.status)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/staff/dashboard/admissions/${application.id}`
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                          >
                            <Eye size={16} />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page {page} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <p className="mt-5 text-xs text-slate-400">
          Student and guardian information is confidential. Only authorized
          admissions staff should access application records.
        </p>
      </div>
    </main>
  );
}

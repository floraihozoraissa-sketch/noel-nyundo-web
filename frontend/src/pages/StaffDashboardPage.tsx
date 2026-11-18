
import {
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react';

import NoticesManagement from '../components/NoticesManagement';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../services/supabaseClient';
import { getManageNotices } from '../services/noticesApi';
import { getContactMessages } from '../services/contactApi';
import ContactMessagesManagement from '../components/ContactMessagesManagement';
import {
  getAdminProfile,
  type StaffProfile,
} from '../services/staffApi';
import { getApplications } from '../services/admissionsApi';

type Section = 'Overview' | 'Notices' | 'Admissions' | 'Messages' | 'Settings';

const navigation: { label: Section; icon: LucideIcon }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Notices', icon: Newspaper },
  { label: 'Admissions', icon: GraduationCap },
  { label: 'Messages', icon: MessageSquare },
  { label: 'Settings', icon: Settings },
];

export default function StaffDashboardPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // Applications summary card state
  const [applicationsCount, setApplicationsCount] = useState<number | null>(null);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [applicationsError, setApplicationsError] = useState('');

  // Notices summary card state
  const [noticesCount, setNoticesCount] = useState<number | null>(null);
  const [isLoadingNotices, setIsLoadingNotices] = useState(true);
  const [noticesError, setNoticesError] = useState('');

  // Contact messages summary card state
  const [messagesCount, setMessagesCount] = useState<number | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [messagesError, setMessagesError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function verifyAdmin() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw new Error('Unable to retrieve your session.');
        }

        if (!session) {
          navigate('/staff/login', { replace: true });
          return;
        }

        if (isMounted) {
          setAccessToken(session.access_token);
        }

        const adminProfile = await getAdminProfile(session.access_token);

        if (!isMounted) return;

        setProfile(adminProfile);

        // Load the total number of admission applications.
        try {
          const result = await getApplications(
            session.access_token,
            1,
            1
          );

          if (isMounted) {
            setApplicationsCount(result.pagination.total);
          }
        } catch (error) {
          if (isMounted) {
            setApplicationsError(
              error instanceof Error
                ? error.message
                : 'Unable to load application statistics.'
            );
          }
        } finally {
          if (isMounted) {
            setIsLoadingApplications(false);
          }
        }

        // Load the total number of published notices.
        try {
          const notices = await getManageNotices(session.access_token);

          if (isMounted) {
            const publishedNotices = notices.filter(
              (notice) => notice.status === 'published'
            );

            setNoticesCount(publishedNotices.length);
          }
        } catch (error) {
          if (isMounted) {
            setNoticesError(
              error instanceof Error
                ? error.message
                : 'Unable to load notice statistics.'
            );
          }
        } finally {
          if (isMounted) {
            setIsLoadingNotices(false);
          }
        }

        // Load the number of new contact messages.
        try {
          const result = await getContactMessages(
            session.access_token,
            1,
            10
          );

          if (isMounted) {
            setMessagesCount(result.statistics.new);
          }
        } catch (error) {
          if (isMounted) {
            setMessagesError(
              error instanceof Error
                ? error.message
                : 'Unable to load message statistics.'
            );
          }
        } finally {
          if (isMounted) {
            setIsLoadingMessages(false);
          }
        }
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to verify administrator access.'
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage('Unable to sign out. Please try again.');
      setIsSigningOut(false);
      return;
    }

    navigate('/staff/login', { replace: true });
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-600">
          Verifying administrator access...
        </p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Access unavailable
          </h1>

          <p role="alert" className="mt-3 text-sm text-red-700">
            {errorMessage || 'Your account could not be verified.'}
          </p>

          <button
            onClick={() => navigate('/staff/login', { replace: true })}
            className="mt-6 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            Return to staff login
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">

      {/* Mobile header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
        <span className="font-bold text-slate-900">
          C.S. Noël Nyundo
        </span>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          aria-label="Toggle navigation"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } w-full shrink-0 border-r border-slate-200 bg-white lg:block lg:min-h-screen lg:w-64`}
      >
        <div className="border-b border-slate-200 px-6 py-7">
          <p className="text-xs font-bold tracking-[0.18em] text-teal-700">
            C.S. NOËL NYUNDO
          </p>

          <h1 className="mt-2 text-lg font-bold text-slate-900">
            School Portal
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Administration workspace
          </p>
        </div>

        <nav className="space-y-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main menu
          </p>

          {navigation.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === 'Admissions') {
                  navigate('/staff/dashboard/admissions');
                  return;
                }

                setActiveSection(item.label);
                setIsSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                activeSection === item.label
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} strokeWidth={1.8} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4 lg:mt-8">
          <div className="mb-4 px-2">
            <p className="text-sm font-semibold text-slate-800">
              {profile.fullName}
            </p>

            <p className="mt-1 text-xs capitalize text-slate-500">
              {profile.role.replaceAll('_', ' ')}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <LogOut size={17} />
            <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">

        <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              Administration / {activeSection}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {activeSection}
            </h2>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Administrator account
          </div>
        </header>

        {activeSection === 'Overview' ? (
          <>
            <section className="mt-8 rounded-2xl bg-slate-900 p-7 text-white sm:p-9">
              <p className="text-sm font-medium text-teal-300">
                SCHOOL ADMINISTRATION
              </p>

              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                Welcome back, {profile.fullName}!
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Manage school information, admissions, notices and
                communication from one central workspace.
              </p>
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">
                  School overview
                </h3>

                <span className="text-xs text-slate-500">
                  Dashboard preview
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {[
                  {
                    label: 'Notices',
                    value: isLoadingNotices
                      ? '...'
                      : noticesCount !== null
                        ? String(noticesCount)
                        : '—',
                    note: isLoadingNotices
                      ? 'Loading notices...'
                      : noticesError
                        ? 'Unable to load notice count'
                        : 'Published notices',
                  },
                  {
                    label: 'Applications',
                    value: isLoadingApplications
                      ? '...'
                      : applicationsCount !== null
                        ? String(applicationsCount)
                        : '—',
                    note: isLoadingApplications
                      ? 'Loading applications...'
                      : applicationsError
                        ? 'Unable to load application count'
                        : 'Total submitted applications',
                  },
                  {
                    label: 'Messages',
                    value: isLoadingMessages
                      ? '...'
                      : messagesCount !== null
                        ? String(messagesCount)
                        : '—',
                    note: isLoadingMessages
                      ? 'Loading messages...'
                      : messagesError
                        ? 'Unable to load message count'
                        : 'New contact messages',
                  },
                  {
                    label: 'Staff role',
                    value: 'Admin',
                    note: 'Verified by backend',
                  },
                ].map((item) => (
                  <article
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-slate-900">
                      {item.value}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {item.note}
                    </p>
                  </article>
                ))}

              </div>
            </section>

            <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-slate-900">
                Quick access
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Choose a management area from the sidebar to continue.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveSection('Notices')}
                  className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Manage notices
                </button>

                <button
                  onClick={() => navigate('/staff/dashboard/admissions')}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View admissions
                </button>
              </div>
            </section>
          </>
        ) : activeSection === 'Notices' ? (
          <NoticesManagement
            accessToken={accessToken}
            role={profile.role}
          />

        ) : activeSection === 'Messages' ? (
           <ContactMessagesManagement accessToken={accessToken} />
          
        ) : (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-8">
            <h3 className="text-lg font-bold text-slate-900">
              {activeSection}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              This management section has not been connected yet.
              We'll implement its functionality in the next development stages.
            </p>

            <button
              onClick={() => setActiveSection('Overview')}
              className="mt-5 text-sm font-semibold text-teal-700 hover:text-teal-900"
            >
              ← Back to overview
            </button>
          </section>
        )}

        {errorMessage && (
          <p role="alert" className="mt-6 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-5 text-xs text-slate-400">
          C.S. Noël Nyundo · Staff Administration Portal
        </footer>
      </main>
    </div>
  );
}

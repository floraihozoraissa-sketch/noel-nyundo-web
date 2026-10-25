import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../services/supabaseClient';
import { getAdminProfile, type StaffProfile } from '../services/staffApi';

export default function StaffDashboardPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

        const adminProfile = await getAdminProfile(session.access_token);

        if (isMounted) {
          setProfile(adminProfile);
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage('Unable to sign out. Please try again.');
      return;
    }

    navigate('/staff/login', { replace: true });
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-600">Verifying administrator access...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Access unavailable
          </h1>
          <p role="alert" className="mt-3 text-sm text-red-700">
            {errorMessage || 'Your account could not be verified as an administrator.'}
          </p>
          <button
            onClick={() => navigate('/staff/login', { replace: true })}
            className="mt-6 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Return to staff login
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-widest text-teal-700">
              C.S. NOËL NYUNDO
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Staff dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Welcome, {profile.fullName}.
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign out
          </button>
        </header>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Your staff role</p>
          <p className="mt-1 text-xl font-semibold capitalize text-slate-900">
            {profile.role.replaceAll('_', ' ')}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Your administrator permissions were verified by the school backend.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">
            Management tools
          </h2>
          <p className="mt-2 text-slate-600">
            We will add protected notice management and other school
            administration tools after the authentication flow is tested.
          </p>
        </section>

        {errorMessage && (
          <p role="alert" className="mt-6 text-sm text-red-700">
            {errorMessage}
          </p>
        )}
      </div>
    </main>
  );
}
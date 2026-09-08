import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '@/data/navigation';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav">
      <div className="bg-primary-900 text-neutral-300">
        <div className="container-content flex items-center justify-between min-h-8 py-1 text-caption gap-4">
          <p className="font-medium tracking-wide truncate">
            [Placeholder for school announcement or motto]
          </p>
          <div className="hidden sm:flex items-center gap-5 shrink-0">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-accent-400" />
              [Placeholder phone]
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-accent-400" />
              [Placeholder email]
            </span>
          </div>
        </div>
      </div>

      <div className="container-content flex items-center justify-between h-[4.5rem] md:h-20">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={closeMobile}
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-primary-900 flex items-center justify-center">
            <span className="font-sans font-extrabold text-white text-h3 leading-none">
              N
            </span>
          </div>
          <div className="leading-tight">
            <p className="font-sans font-bold text-neutral-900 text-small md:text-body tracking-tight">
              C.S. Noël Nyundo
            </p>
            <p className="text-caption text-neutral-500 font-medium tracking-wide">
              Faith · Excellence · Patriotism
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-small font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-800 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            to="/admissions/apply"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-small font-semibold rounded-lg bg-accent-400 text-neutral-900 hover:bg-accent-500 active:bg-accent-600 transition-colors duration-200 shadow-soft"
          >
            Apply Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMobile}
          className="xl:hidden p-2 -mr-2 text-neutral-700 hover:text-primary-700 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-neutral-200 bg-white">
          <nav className="container-content py-4 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `px-4 py-3 text-body font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-800 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-neutral-200">
              <Link
                to="/admissions/apply"
                onClick={closeMobile}
                className="flex items-center justify-center gap-1.5 w-full px-5 py-3 text-body font-semibold rounded-lg bg-accent-400 text-neutral-900 hover:bg-accent-500 transition-colors duration-200"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

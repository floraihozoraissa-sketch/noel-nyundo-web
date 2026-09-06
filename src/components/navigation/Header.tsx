import { NavLink, Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '@/data/navigation';
import { Button } from '@/components/buttons/Button';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200/80">
      <div className="container-content flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0"
          onClick={closeMobile}
        >
          <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-serif font-bold text-neutral-900 text-body">
              C.S. Noël Nyundo
            </p>
            <p className="text-caption text-neutral-500 font-medium">
              School of Excellence
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 text-small font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50/60'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button as="link" to="/admissions/apply" size="md">
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-2 -mr-2 text-neutral-700 hover:text-primary-700 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200/80 bg-white">
          <nav className="container-content py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `px-4 py-3 text-body font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-neutral-200">
              <Button
                as="link"
                to="/admissions/apply"
                size="md"
                className="w-full"
              >
                Apply Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

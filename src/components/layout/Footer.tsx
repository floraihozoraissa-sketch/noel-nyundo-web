import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { navLinks } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="bg-primary-950 text-neutral-300">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="leading-tight">
                <p className="font-serif font-bold text-white text-body">
                  C.S. Noël Nyundo
                </p>
                <p className="text-caption text-neutral-400 font-medium">
                  School of Excellence
                </p>
              </div>
            </Link>
            <p className="text-small text-neutral-400 leading-relaxed">
              [Placeholder for school mission statement — to be replaced with
              real content.]
            </p>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-widest text-neutral-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-small text-neutral-400 hover:text-accent-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-widest text-neutral-200 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-small text-neutral-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-400" />
                <span>[Placeholder for school address]</span>
              </li>
              <li className="flex items-start gap-2.5 text-small text-neutral-400">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-accent-400" />
                <span>[Placeholder for phone number]</span>
              </li>
              <li className="flex items-start gap-2.5 text-small text-neutral-400">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent-400" />
                <span>[Placeholder for email address]</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-widest text-neutral-200 mb-4">
              Admissions
            </h3>
            <p className="text-small text-neutral-400 mb-4 leading-relaxed">
              [Placeholder for a short admissions call-to-action description.]
            </p>
            <Link
              to="/admissions/apply"
              className="inline-flex items-center justify-center px-6 py-2.5 text-small font-semibold rounded-lg bg-accent-500 text-neutral-900 hover:bg-accent-600 transition-colors duration-200"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-neutral-500">
            © {new Date().getFullYear()} C.S. Noël Nyundo School. All rights
            reserved.
          </p>
          <p className="text-caption text-neutral-500">
            [Placeholder for additional legal/privacy links]
          </p>
        </div>
      </div>
    </footer>
  );
}

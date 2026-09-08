import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Notice Board', path: '/notices' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Contact Us', path: '/contact' },
];

const resourceLinks = [
  { label: 'Apply Now', path: '/admissions/apply' },
  { label: 'Admissions Info', path: '/admissions' },
  { label: 'Notice Board', path: '/notices' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Contact Us', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-primary-950 text-neutral-300">
      <div className="imigongo-divider" />

      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-primary-700 flex items-center justify-center">
                <span className="font-sans font-extrabold text-white text-h3 leading-none">
                  N
                </span>
              </div>
              <div className="leading-tight">
                <p className="font-sans font-bold text-white text-body tracking-tight">
                  C.S. Noël Nyundo
                </p>
                <p className="text-caption text-neutral-400 font-medium tracking-wide">
                  Faith · Excellence · Patriotism
                </p>
              </div>
            </Link>
            <p className="text-small text-neutral-400 leading-relaxed max-w-xs">
              [Placeholder for school mission statement — to be replaced with
              real content.]
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-800 hover:bg-primary-700 flex items-center justify-center transition-colors duration-200"
                  aria-label="Social media link"
                >
                  <Icon className="w-4 h-4 text-neutral-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-small font-semibold uppercase tracking-[0.18em] text-neutral-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
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
            <h3 className="text-small font-semibold uppercase tracking-[0.18em] text-neutral-200 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
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
            <h3 className="text-small font-semibold uppercase tracking-[0.18em] text-neutral-200 mb-4">
              Contact Us
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
            <div className="mt-5">
              <Link
                to="/admissions/apply"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-small font-semibold rounded-lg bg-accent-400 text-neutral-900 hover:bg-accent-500 transition-colors duration-200"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-neutral-500">
            © {new Date().getFullYear()} C.S. Noël Nyundo School. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5 text-caption text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

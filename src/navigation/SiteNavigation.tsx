import { NavLink } from 'react-router'

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About Us', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Notices', to: '/notices' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Student Life', to: '/student-life' },
  { label: 'Contact', to: '/contact' },
]

type SiteNavigationProps = {
  onNavigate?: () => void
}

export function SiteNavigation({ onNavigate }: SiteNavigationProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-5">
        {navigationItems.map(({ label, to, end }) => (
          <li key={to}>
            <NavLink
              className={({ isActive }) =>
                `block rounded px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy ${
                  isActive
                    ? 'text-school-navy'
                    : 'text-slate-700 hover:text-school-navy'
                }`
              }
              end={end}
              to={to}
              onClick={onNavigate}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

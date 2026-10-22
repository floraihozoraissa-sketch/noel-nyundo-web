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
      <ul className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-5">
        {navigationItems.map(({ label, to, end }) => (
          <li key={to}>
            <NavLink
              className={({ isActive }) =>
                `flex min-h-11 items-center rounded px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy xl:min-h-0 xl:px-2 ${
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

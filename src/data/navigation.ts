export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Notices', path: '/notices' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Contact', path: '/contact' },
] as const;

export type NavLink = (typeof navLinks)[number];

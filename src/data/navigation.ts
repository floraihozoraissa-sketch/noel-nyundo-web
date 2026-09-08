export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Notice Board', path: '/notices' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Contact Us', path: '/contact' },
] as const;

export type NavLink = (typeof navLinks)[number];

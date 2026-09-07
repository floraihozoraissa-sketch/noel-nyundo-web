import type { LucideIcon } from 'lucide-react';
import { GraduationCap, ShieldCheck, Globe2, Cross, Award, Flag, Church, Users, Scale } from 'lucide-react';

export type StatItem = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const schoolStats: StatItem[] = [
  { value: '800+', label: 'Students', icon: Users },
  { value: '50+', label: 'Years of Excellence', icon: ShieldCheck },
  { value: '100%', label: 'PLE Pass Rate', icon: GraduationCap },
  { value: '500+', label: 'Alumni Worldwide', icon: Globe2 },
];

export const schoolPillars = [
  {
    icon: Cross,
    title: 'Faith',
    description: 'Deepening spiritual understanding and nurturing faith daily.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for the highest standards in academics, sport and art.',
  },
  {
    icon: Flag,
    title: 'Patriotism',
    description: 'Cultivating a strong love of country and care for our community.',
  },
];

export const familyReasons = [
  {
    icon: Church,
    title: 'Catholic Education',
    description: 'Nurturing faith through strong teaching and character formation.',
  },
  {
    icon: GraduationCap,
    title: 'Excellent Academic Performance',
    description: 'Consistently achieving strong results and a love of learning.',
  },
  {
    icon: Users,
    title: 'Qualified Teachers',
    description: 'Our staff are highly trained professionals dedicated to every learner.',
  },
  {
    icon: Scale,
    title: 'Strong Discipline',
    description: 'Building character and responsibility through clear expectations.',
  },
];

export const homepageAnnouncements = [
  {
    date: 'May 18, 2026',
    category: 'Official Notice',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/1',
  },
  {
    date: 'May 12, 2026',
    category: 'Academic',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/2',
  },
  {
    date: 'May 05, 2026',
    category: 'Admissions',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/3',
  },
  {
    date: 'Apr 28, 2026',
    category: 'Official Notice',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/4',
  },
  {
    date: 'Apr 20, 2026',
    category: 'Academic',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/5',
  },
  {
    date: 'Apr 12, 2026',
    category: 'Admissions',
    title: 'End of Term 2 Examination Timetable',
    excerpt: 'The examination timetable has been published. Please check and prepare accordingly.',
    to: '/notices/6',
  },
];

export const schoolLifeTiles = [
  { label: 'School life photo placeholder', aspect: 'wide' as const },
  { label: 'School life photo placeholder', aspect: 'wide' as const },
  { label: 'School life photo placeholder', aspect: 'wide' as const },
  { label: 'School life photo placeholder', aspect: 'wide' as const },
  { label: 'School life photo placeholder', aspect: 'wide' as const },
  { label: 'School life photo placeholder', aspect: 'wide' as const },
];

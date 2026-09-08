import type { LucideIcon } from 'lucide-react';
import {
  Cross,
  Award,
  Flag,
  Heart,
  Users,
  BookOpen,
  Church,
  GraduationCap,
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Handshake,
} from 'lucide-react';

export type ValueItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type LeadershipItem = {
  name: string;
  title: string;
  bio: string;
};

export type FacilityItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const aboutCoreValues: ValueItem[] = [
  {
    icon: Cross,
    title: 'Faith',
    description: 'Rooted in Catholic values, we nurture spiritual growth and a living relationship with God.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We pursue the highest standards in academics, character, and service to others.',
  },
  {
    icon: Flag,
    title: 'Patriotism',
    description: 'We instill love of country, civic responsibility, and commitment to our community.',
  },
];

export const aboutIdentityValues: ValueItem[] = [
  {
    icon: Church,
    title: 'Catholic Identity',
    description: 'Daily prayer, liturgy, and formation are woven into every part of school life.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We treat each student as a unique gift, fostering care, respect, and dignity.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We form honest, responsible young people who do what is right even when no one is watching.',
  },
  {
    icon: Handshake,
    title: 'Service',
    description: 'Students learn to use their gifts in service to their neighbours and the wider community.',
  },
];

export const missionVision = {
  mission: {
    icon: Target,
    title: 'Our Mission',
    statement:
      '[Official Mission Statement — to be provided by the school.]',
  },
  vision: {
    icon: Eye,
    title: 'Our Vision',
    statement:
      '[Official Vision Statement — to be provided by the school.]',
  },
};

export const leadershipTeam: LeadershipItem[] = [
  {
    name: '[Principal Name]',
    title: '[Official Title]',
    bio: '[Placeholder for the principal\'s brief biography and leadership philosophy. To be replaced with official school content.]',
  },
  {
    name: '[Vice Principal Name]',
    title: '[Official Title]',
    bio: '[Placeholder for the vice principal\'s brief biography. To be replaced with official school content.]',
  },
  {
    name: '[Director of Studies Name]',
    title: '[Official Title]',
    bio: '[Placeholder for the director of studies\' brief biography. To be replaced with official school content.]',
  },
];

export const aboutFacilities: FacilityItem[] = [
  {
    icon: BookOpen,
    title: 'Library & Learning Resources',
    description: '[Placeholder for a description of the school\'s library and learning resources.]',
  },
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    description: '[Placeholder for a description of the school\'s academic programs and achievements.]',
  },
  {
    icon: Users,
    title: 'Student Community',
    description: '[Placeholder for a description of the school\'s vibrant student community and activities.]',
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Growth',
    description: '[Placeholder for a description of the school\'s approach to innovation and student growth.]',
  },
];

export const aboutHighlights = [
  { value: '800+', label: 'Students' },
  { value: '50+', label: 'Years of Excellence' },
  { value: '100%', label: 'PLE Pass Rate' },
  { value: '500+', label: 'Alumni Worldwide' },
];

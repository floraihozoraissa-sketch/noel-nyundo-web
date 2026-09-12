import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BookOpen,
  Church,
  Cross,
  Flag,
  HandHeart,
  Handshake,
  Heart,
  Library,
  MessageCircleHeart,
  Moon,
  Scale,
  ShieldCheck,
  Sun,
  Users,
} from 'lucide-react';

export type ValueItem = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export type LeadershipItem = {
  name: string;
  title: string;
  bio: string;
};

export type FacilityItem = {
  label: string;
};

export type StoryMilestone = {
  title: string;
  description: string;
};

export const aboutStoryMilestones: StoryMilestone[] = [
  {
    title: 'Our Beginning',
    description: '[Official founding story and school history to be provided by the school.]',
  },
  {
    title: 'Our Growth',
    description: '[Official story of the school\'s growth, community, and educational journey to be provided.]',
  },
  {
    title: 'Our Future',
    description: '[Official statement about the school\'s future direction and aspirations to be provided.]',
  },
];

export const aboutCoreValues: ValueItem[] = [
  {
    icon: Flag,
    title: 'Patriotism',
    description: 'Trusting in Divine guidance and maintaining strong Catholic traditions in all endeavours.',
  },
  {
    icon: Handshake,
    title: 'Respect',
    description: 'Trusting in Divine guidance and maintaining strong Catholic traditions in all endeavours.',
  },
  {
    icon: Cross,
    title: 'Faith',
    description: 'Trusting in Divine guidance and maintaining strong Catholic traditions in all endeavours.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Trusting in Divine guidance and maintaining strong Catholic traditions in all endeavours.',
  },
];

export const aboutIdentityValues: ValueItem[] = [
  { icon: Sun, title: 'Morning Prayer' },
  { icon: BookOpen, title: 'Moral Lessons' },
  { icon: ShieldCheck, title: 'Discipline' },
  { icon: Heart, title: 'Respect' },
  { icon: HandHeart, title: 'Service' },
  { icon: Users, title: 'Community' },
];

export const missionVision = {
  mission: {
    icon: Church,
    title: 'Our Mission',
    statement: '[Official Mission Statement — to be provided by the school.]',
  },
  vision: {
    icon: MessageCircleHeart,
    title: 'Our Vision',
    statement: '[Official Vision Statement — to be provided by the school.]',
  },
};

export const leadershipTeam: LeadershipItem[] = [
  {
    name: '[Principal Name]',
    title: '[Official Title]',
    bio: '[Official leadership biography to be provided.]',
  },
  {
    name: '[Director of Studies Name]',
    title: '[Official Title]',
    bio: '[Official leadership biography to be provided.]',
  },
  {
    name: '[Dean of Discipline Name]',
    title: '[Official Title]',
    bio: '[Official leadership biography to be provided.]',
  },
];

export const aboutFacilities: FacilityItem[] = [
  { label: 'Official facility photo placeholder' },
  { label: 'Official facility photo placeholder' },
  { label: 'Official facility photo placeholder' },
  { label: 'Official facility photo placeholder' },
  { label: 'Official facility photo placeholder' },
  { label: 'Official facility photo placeholder' },
];

export const aboutHighlight = {
  value: '[Official figure]',
  label: '[Official highlight label]',
};

export const aboutIdentityDetails = [
  { icon: Moon, title: 'Prayer' },
  { icon: Library, title: 'Formation' },
  { icon: Scale, title: 'Character' },
];

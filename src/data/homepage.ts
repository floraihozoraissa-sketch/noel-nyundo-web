import {
  Badge,
  Cross,
  Flag,
  Globe,
  GraduationCap,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'

// Homepage content data.
//
// All statistics, announcements, and official information are marked as
// UNVERIFIED placeholders until confirmed by the school. Replace the
// `placeholder` values below with verified data before publishing.

export const hero = {
  eyebrow: 'C.S. Noël Nyundo School',
  title: 'Nurturing Faith.\nInspiring Excellence.\nBuilding Patriots.',
  description:
    'Providing a holistic Catholic education that empowers students to lead with integrity, achieve academic mastery, and serve their nation with pride.',
  primaryCta: { label: 'Apply for admission', to: '/admissions/apply' },
  secondaryCta: { label: 'Discover Our School', to: '/about' },
  // Hero background image. Replace with a real school photograph.
  bgImage: '/images/home/hero_image.jpg',
}

// Statistics shown on the dark navy strip below the hero.
// All figures are UNVERIFIED placeholders.
export const statistics = [
  {
    icon: Users,
    value: '800+',
    label: 'Students',
    unit: 'Years of Excellence',
    placeholder: true,
  },
  {
    icon: GraduationCap,
    value: '100%',
    label: 'PLE Pass Rate',
    unit: 'Alumni Worldwide',
    placeholder: true,
  },
  {
    icon: Globe,
    value: '500+',
    label: 'Alumni Worldwide',
    unit: '500+',
    placeholder: true,
  },
  {
    icon: Badge,
    value: '50+',
    label: 'Years of Excellence',
    placeholder: true,
  },
]

// Principal / school message.
// The principal's name is a placeholder and must be confirmed.
export const principalMessage = {
  name: '[Principal Name TBD]',
  title: 'Head of School',
  signatureLabel: 'OFFICIAL SIGNATURE',
  body: [
    'Welcome to C.S. Noël Nyundo. Our institution stands as a beacon of rigor and spiritual growth. We believe that education is not merely the acquisition of knowledge, but the formation of character.',
    'Inspired by our motto: Faith, Excellence, Patriotism, we strive to create an environment where every student feels valued and prepared to contribute meaningfully to our nation.',
    'I invite you to explore our campus and discover the transformative journey that awaits your child here at Nyundo.',
  ],
  cta: { label: 'Read Full Message', to: '/about' },
  // School photograph placeholder.
  image: '/images/home/hero_image.jpg',
}

// Core pillars.
export const pillars = [
  {
    icon: Cross,
    title: 'Faith',
    description: 'Deepening spiritual roots through Catholic traditions and daily prayer.',
  },
  {
    icon: Trophy,
    title: 'Excellence',
    description: 'Striving for the highest score in academics, sports and arts.',
  },
  {
    icon: Flag,
    title: 'Patriotism',
    description: 'Cultivating a sense of duty and love for our country.',
  },
]

// Why Families Choose Us cards.
export const whyChooseCards = [
  {
    title: 'Catholic Education',
    description: 'Nurturing spiritual growth through strong Catholic values and traditions.',
    image: '/images/gallery/faith-prayer.jpg',
  },
  {
    title: 'Qualified Teachers',
    description: 'Our staff are highly trained professionals dedicated to every child\u2019s success.',
    image: '/images/gallery/academics-classroom.jpg',
  },
  {
    title: 'Strong Discipline',
    description: 'Cultivating character and responsibility through clear guidelines and mentorship.',
    image: '/images/gallery/community-assembly.jpg',
  },
  {
    title: 'Excellent Academic Performance',
    description: 'Consistently achieving top marks in national examinations and PLE.',
    image: '/images/gallery/academics-classroom.jpg',
  },
]

// Latest announcements. All dates and content are UNVERIFIED placeholders.
export const announcements = [
  {
    id: '1',
    tag: 'OFFICIAL NOTICE',
    tagColor: 'bg-school-navy',
    date: 'May 19, 2026',
    title: 'End of Term 2\nExamination Timetable',
    body: 'The examination timetable has been published. Please check and prepare accordingly.',
    cta: { label: 'Read More', to: '/notices/1' },
    placeholder: true,
  },
  {
    id: '2',
    tag: 'ALUMNI',
    tagColor: 'bg-[#2E7D32]',
    date: '[Date TBD]',
    title: '[Announcement Title TBD]',
    body: 'Official alumni information will be added here once confirmed.',
    cta: { label: 'Read More', to: '/notices/2' },
    placeholder: true,
  },
  {
    id: '3',
    tag: 'UPCOMING EVENT',
    tagColor: 'bg-[#4580D9]',
    date: '[Date TBD]',
    title: '[Event Title TBD]',
    body: 'Official event information will be added here once confirmed.',
    cta: { label: 'Read More', to: '/notices/3' },
    placeholder: true,
  },
  {
    id: '4',
    tag: 'ADMISSIONS',
    tagColor: 'bg-school-gold',
    date: '[Date TBD]',
    title: '[Admissions Title TBD]',
    body: 'Official admissions information will be added here once confirmed.',
    cta: { label: 'Read More', to: '/admissions' },
    placeholder: true,
  },
]

// School Life gallery images.
export const galleryImages = [
  { src: '/images/gallery/campus_1.jpg', alt: 'School life photograph 1' },
  { src: '/images/gallery/campus_2.jpg', alt: 'School life photograph 2' },
  { src: '/images/gallery/campus_3.jpg', alt: 'School life photograph 3' },
]

// Final CTA banner.
export const finalCta = {
  title: 'Ready to Shape Your Future?',
  description: 'Join a community where faith, knowledge and character come together.',
  primaryCta: { label: 'Apply for admission', to: '/admissions/apply' },
  secondaryCta: { label: 'Schedule a Visit', to: '/contact' },
}

// Map section.
export const mapSection = {
  title: 'Locate Us on Google Maps!',
  image: '/images/gallery/campus_1.jpg',
}

export type { LucideIcon }
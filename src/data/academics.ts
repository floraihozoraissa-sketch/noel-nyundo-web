// Academics page content data.
//
// All examination results, performance statistics, subject lists, and
// curriculum details are marked as UNVERIFIED placeholders until confirmed
// by the school. Replace the `placeholder` values below with verified data.

export const academicsHero = {
  badge: 'ACADEMIC EXCELLENCE',
  title: 'Nurturing Minds,\nShaping Futures.',
  description:
    'At C.S Noël Nyundo, we combine rigorous national curriculum standards with holistic personal development, ensuring every student reaches their full potential.',
  primaryCta: { label: 'View Curriculum', to: '/academics' },
  secondaryCta: { label: 'Download Prospectus', to: '#downloads' },
  bgImage: '/images/academics/hero-bg.jpg',
}

export const academicPhilosophy = {
  title: 'Our Academic Philosophy',
  description:
    'We believe in a balanced approach to education that prioritizes critical thinking, ethical grounding, and practical application.',
  pillars: [
    {
      icon: 'brain',
      title: 'Critical Inquiry',
      description:
        'Encouraging students to question, analyze and synthesize rather than mere rote memorization',
    },
    {
      icon: 'users',
      title: 'Holistic Development',
      description:
        'Integrating physical, emotional, and spiritual growth with academic rigor for a complete human experience.',
    },
    {
      icon: 'handshake',
      title: 'Collaborative Learning',
      description:
        'Fostering teamwork and communication skills through peer-to-peer engagement and community projects.',
    },
  ],
}

// Standardized Excellence block.
export const standardizedExcellence = {
  title: 'Standardized Excellence',
  description:
    'Our curriculum follows the Rwanda National Curriculum Framework, enhanced by internal enrichment programs that prepare students for global challenges.',
  image: '/images/academics/curriculum-highlights.jpg',
  imageCaption: 'Curriculum Highlights',
}

// Grade levels.
// Grade level names and structure are design placeholders.
export const gradeLevels = [
  {
    level: 'PRE-PRIMARY / NURSERY (N1-N3)',
    title: 'Foundational Literacy & Numeracy',
    description:
      'Emphasis on mother tongue (Kinyarwanda) and English literacy, basic mathematics, and discovery through play and observation.',
    placeholder: true,
  },
  {
    level: 'LOWER PRIMARY (P1-P3)',
    title: 'Foundational Literacy & Numeracy',
    description:
      'Emphasis on mother tongue (Kinyarwanda) and English literacy, basic mathematics, and discovery through play and observation.',
    placeholder: true,
  },
  {
    level: 'UPPER PRIMARY (P4-P6)',
    title: 'Conceptual Depth & Specialization',
    description:
      'Deeper subject exploration, continuous assessment, and preparation for national examinations.',
    placeholder: true,
  },
]

// Curriculum highlights list.
export const curriculumHighlights = [
  'Bilingual Instruction (English & Kinyarwanda)',
  'National Exam Preparation Workshops',
  'Daily Moral & Values Education',
  'Digital Literacy Integration',
  'Integrated STEM Projects',
]

// Continuous assessment note.
export const continuousAssessment =
  'Continuous Assessment Model tracking student progress weekly.'

// Subjects offered.
// Subject list is taken from the approved design copy.
export const subjects = [
  'MATHEMATICS',
  'ENGLISH LANGUAGE',
  'SCIENCE & TECH',
  'SOCIAL STUDIES',
  'KINYARWANDA',
  'RELIGIOUS EDUCATION',
  'CREATIVE ARTS',
  'PHYSICAL EDUCATION',
]

// NESA Examination Results.
// All figures are UNVERIFIED placeholders.
export const nesaResults = {
  title: 'NESA Examination Results',
  description:
    'C.S Noël Nyundo consistently achieves exceptional results in National Primary Leaving Examination, reflecting our commitment to academic rigor.',
  stats: [
    { value: '100%', label: 'PLE Pass Rate', placeholder: true },
    { value: '50%', label: 'Grade A', placeholder: true },
  ],
  trendTitle: '5-Year Performance Trend',
  trendPlaceholder: true,
}

// Alumni testimonial.
// Name and achievements are placeholders and must be confirmed.
export const alumniTestimonial = {
  name: '[Alumni Name TBD]',
  class: 'Class of [Year TBD]',
  achievement: '[Achievement TBD]',
  quote:
    '“The teachers at C.S Noel Nyundo didn’t just teach me subjects; they taught me how to learn. The environment of discipline and spiritual guidance gave me the foundation I needed to excel in my national exams and pursue my dreams.”',
  heading: 'Excellence as a Tradition',
  cta: { label: 'Read More Alumni Stories', to: '#alumni' },
  placeholder: true,
}

// Learning facilities.
export const learningFacilities = {
  title: 'Our Learning Facilities',
  description:
    'We invest in modern infrastructure to provide an environment that stimulates learning and creativity.',
  facilities: [
    {
      name: 'Science Laboratory',
      description:
        'Equipped for practical experiments and hands-on discovery in biology, chemistry, and physics.',
      image: '/images/academics/facilities-science.jpg',
    },
    {
      name: 'Modern Library',
      description:
        'A quiet space housing over 5,000 volumes, including resources and research databases.',
      image: '/images/academics/facilities-library.jpg',
    },
    {
      name: 'ICT Innovation Center',
      description:
        'State-of-the-art computer lab with high-speed internet and coding resources for all levels.',
      image: '/images/academics/facilities-ict.jpg',
    },
  ],
}

// Beyond the Classroom.
export const beyondClassroom = {
  title: 'Beyond the Classroom',
  description:
    'Education at Nyundo extends to the field, the stage, and the podium, fostering leadership and talent.',
  activities: [
    {
      eyebrow: 'PHYSICAL FITNESS',
      title: 'Athletics & Sports',
      image: '/images/academics/beyond-sports.jpg',
    },
    {
      eyebrow: 'CREATIVE EXPRESSION',
      title: 'Arts & Music',
      image: '/images/academics/beyond-arts.jpg',
    },
    {
      eyebrow: 'COMMUNICATION',
      title: 'Debate & Leadership',
      image: '/images/academics/beyond-debate.jpg',
    },
  ],
}

// Academic Resources downloads.
// Document titles and sizes are placeholders.
export const academicResources = {
  title: 'Academic Resources',
  description: 'Download important documents and educational resources.',
  documents: [
    {
      title: '2026 PDF Admission Prospectus',
      size: '2.4 MB',
      placeholder: true,
    },
    {
      title: '[Document Title TBD]',
      size: '[Size TBD]',
      placeholder: true,
    },
    {
      title: '[Document Title TBD]',
      size: '[Size TBD]',
      placeholder: true,
    },
  ],
  ctaLabel: 'View all Downloads',
  ctaTo: '#downloads',
}

// Final CTA.
export const academicsFinalCta = {
  title: 'Empower Your Child Today',
  description:
    'Admissions for the upcoming academic session are now open. Join a community where faith and excellence meet to create tomorrow’s leaders.',
  primaryCta: { label: 'Apply for admission', to: '/admissions/apply' },
  secondaryCta: { label: 'Schedule a Visit', to: '/contact' },
}
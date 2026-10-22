// Student Life page content data.
//
// Content is drawn only from programmes and values already documented in the
// project (core pillars, Catholic identity, "Beyond the Classroom" activities,
// subjects, and facilities). No clubs, schedules, dates, or achievements are
// invented here. Photograph paths are expected upload locations; the
// SchoolImage component renders a graceful placeholder until approved school
// photographs are supplied.

export const studentLifeHero = {
  eyebrow: 'STUDENT LIFE',
  title: 'Life at C.S Noël Nyundo',
  subtitle:
    'A welcoming community where students grow in faith, friendship, and character through learning, sport, creativity, and service.',
  bgImage: '/images/student-life/hero_image.jpg',
}

export const studentLifeIntro = {
  title: 'A Community Built on Faith and Friendship',
  paragraphs: [
    'At C.S Noël Nyundo, education extends beyond the classroom. Students belong to a caring community guided by our core values of Faith, Excellence, Patriotism, and Respect.',
    'From morning prayer and moral lessons to sports, creative arts, and community service, every part of school life is designed to help each student grow into a confident and responsible young person.',
  ],
  highlights: [
    'Faith-centred daily life',
    'A supportive, disciplined community',
    'Opportunities in sport and the arts',
    'Learning in modern facilities',
  ],
}

// Activity areas documented elsewhere in the project:
// Catholic identity practices, "Beyond the Classroom" activities, and subjects.
export const activityAreas = [
  {
    icon: 'church',
    title: 'Faith & Spiritual Life',
    description:
      'Morning prayer, moral lessons, and Catholic values guide students in building strong character and a life of faith.',
    image: '/images/student-life/faith.jpg',
  },
  {
    icon: 'dumbbell',
    title: 'Sports & Athletics',
    description:
      'Physical education and athletics help students stay active while developing teamwork, discipline, and sportsmanship.',
    image: '/images/student-life/sports.jpg',
  },
  {
    icon: 'music',
    title: 'Music & Performing Arts',
    description:
      'Students express themselves through music and performance, growing in confidence and creativity.',
    image: '/images/student-life/music.jpg',
  },
  {
    icon: 'palette',
    title: 'Creative Arts',
    description:
      'Creative Arts lessons give students the space to imagine, design, and bring their ideas to life.',
    image: '/images/student-life/creative-arts.jpg',
  },
  {
    icon: 'mic',
    title: 'Debate & Leadership',
    description:
      'Debate and leadership activities strengthen communication skills and prepare students to speak and lead with purpose.',
    image: '/images/gallery/community-debate.jpg',
  },
  {
    icon: 'handshake',
    title: 'Community & Service',
    description:
      'Service and community experiences teach students to care for others and contribute to the world around them.',
    image: '/images/gallery/community-assembly.jpg',
  },
]

// Documented elements of the student experience.
export const studentExperience = {
  title: 'What Every Student Experiences',
  description:
    'The values and programmes that shape daily life at C.S Noël Nyundo.',
  items: [
    {
      icon: 'book',
      title: 'Prayer & Values',
      description: 'Morning prayer and moral education grounded in our Catholic identity.',
    },
    {
      icon: 'flag',
      title: 'Patriotism',
      description: 'A sense of duty and love for our country, nurtured every day.',
    },
    {
      icon: 'trophy',
      title: 'Excellence',
      description: 'Encouragement to strive for the highest standards in every activity.',
    },
    {
      icon: 'heart',
      title: 'Respect',
      description: 'Dignity, empathy, and mutual respect within our school community.',
    },
  ],
}

// Facilities documented on the Academics page.
export const studentLifeFacilities = {
  title: 'Spaces for Learning and Growth',
  description:
    'Students learn and explore in modern facilities that support academic and personal development.',
  items: [
    {
      name: 'Science Laboratory',
      description:
        'Equipped for practical experiments and hands-on discovery in biology, chemistry, and physics.',
      image: '/images/school/science_lab.jpg',
    },
    {
      name: 'Modern Library',
      description:
        'A quiet space for reading, research, and study resources for all levels.',
      image: '/images/school/library.jpg',
    },
    {
      name: 'ICT Innovation Center',
      description:
        'A computer lab supporting digital literacy and hands-on technology learning.',
      image: '/images/school/ict_center.jpg',
    },
  ],
  ctaLabel: 'View the Gallery',
  ctaTo: '/gallery',
}

export const studentLifeFinalCta = {
  title: 'Become Part of Our Community',
  description:
    'Discover a school where faith, friendship, and learning come together. We are now accepting admissions for the next academic year.',
  primaryCta: { label: 'Apply for admission', to: '/admissions/apply' },
  secondaryCta: { label: 'Explore the Gallery', to: '/gallery' },
}

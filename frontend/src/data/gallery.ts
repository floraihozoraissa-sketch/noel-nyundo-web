// Gallery page content data.
//
// No approved school photographs are stored in the project yet. The entries
// below are expected upload locations grouped into categories that are
// supported by information already documented in the project (facilities,
// academics, Catholic identity, and "Beyond the Classroom" activities).
// The SchoolImage component renders a graceful placeholder for any missing
// photograph, and the lightbox still works once real images are added.
//
// Alternative text stays descriptive and generic. No captions, dates, events,
// or identities are invented here.

export type GalleryCategory = {
  id: string
  label: string
}

export type GalleryPhoto = {
  id: string
  src: string
  alt: string
  category: string
}

export const galleryCategories: GalleryCategory[] = [
  { id: 'campus', label: 'Campus & Facilities' },
  { id: 'academics', label: 'Academic Life' },
  { id: 'faith', label: 'Faith & Spiritual Life' },
  { id: 'sports', label: 'Sports & Athletics' },
  { id: 'arts', label: 'Arts & Music' },
  { id: 'community', label: 'School Community' },
]

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'campus-campus-1',
    src: '/images/gallery/campus_1.jpg',
    alt: 'School campus grounds at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'campus-campus-2',
    src: '/images/gallery/campus_2.jpg',
    alt: 'School campus building exterior',
    category: 'campus',
  },
  {
    id: 'campus-campus-3',
    src: '/images/gallery/campus_3.jpg',
    alt: 'School campus entrance and grounds',
    category: 'campus',
  },
  {
    id: 'campus-interior-1',
    src: '/images/gallery/interior_1.jpg',
    alt: 'School interior hallway at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'campus-interior-2',
    src: '/images/gallery/interior_2.jpg',
    alt: 'School interior classroom area at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'campus-interior-3',
    src: '/images/gallery/interior_3.jpg',
    alt: 'School interior common area at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'campus-interior-4',
    src: '/images/gallery/interior_4.jpg',
    alt: 'School interior corridor at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'campus-interior-5',
    src: '/images/gallery/interior_5.jpg',
    alt: 'School interior study space at C.S Noël Nyundo',
    category: 'campus',
  },
  {
    id: 'academics-classroom',
    src: '/images/gallery/academics-classroom.jpg',
    alt: 'Students learning in a classroom',
    category: 'academics',
  },
  {
    id: 'faith-prayer',
    src: '/images/gallery/faith-prayer.jpg',
    alt: 'Morning prayer at C.S Noël Nyundo School',
    category: 'faith',
  },
  {
    id: 'sports-athletics',
    src: '/images/gallery/sports-athletics.jpg',
    alt: 'Athletics and physical education on the school field',
    category: 'sports',
  },
  {
    id: 'arts-music',
    src: '/images/gallery/arts-music.jpg',
    alt: 'Music and performing arts at school',
    category: 'arts',
  },
  {
    id: 'community-assembly',
    src: '/images/gallery/community-assembly.jpg',
    alt: 'School community gathered together',
    category: 'community',
  },
  {
    id: 'community-debate',
    src: '/images/gallery/community-debate.jpg',
    alt: 'Debate and leadership activity',
    category: 'community',
  },
]

export const galleryPage = {
  eyebrow: 'GALLERY',
  title: 'Moments from School Life',
  description:
    'A look at the facilities, learning, faith, and activities that make up life at C.S Noël Nyundo.',
  imagesPendingNotice:
    'Approved school photographs are being prepared. Placeholders shown below will be replaced as official images are added.',
  emptyStateTitle: 'No photos in this category yet',
  emptyStateDescription:
    'Approved photographs for this category will be added once available.',
}

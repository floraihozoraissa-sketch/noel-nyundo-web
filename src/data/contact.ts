// Contact page content data.
// All contact details, office hours, and official information are marked as
// UNVERIFIED placeholders until confirmed by the school. Replace the
// `placeholder` values below with verified data before publishing.

export type ContactOffice = {
  label: string
  phone?: string
  email?: string
  address?: string
  placeholder?: boolean
}

export type ContactFormSubject = {
  value: string
  label: string
}

export type ContactFAQ = {
  question: string
  answer: string
  placeholder?: boolean
}

export type LocationData = {
  address?: string
  city?: string
  province?: string
  country?: string
  coordinates?: { lat: number; lng: number }
  mapsUrl?: string
  placeholder?: boolean
}

export const contactPage = {
  hero: {
    eyebrow: 'WE\'RE HERE TO HELP',
    title: 'Get in Touch with C.S. Noël Nyundo',
    description: 'Have a question about admissions, academics, or school life? We\'d be happy to help you find the information you need.',
    ctaLabel: 'Contact the School',
    ctaHref: '#contact-form',
    bgImage: '/images/contact/hero-bg.jpg',
  },

  contactInfo: {
    title: 'Contact Information',
    description: 'Reach out to us through any of the channels below. Our team is ready to assist you.',
    offices: [
      {
        label: 'MAIN OFFICE',
        phone: '+250 788 123 456',
        placeholder: true,
      },
      {
        label: 'ADMISSIONS OFFICE',
        email: 'admissions@gmail.com',
        placeholder: true,
      },
      {
        label: 'VISIT US',
        address: 'Rwanda, Western Province, Rubavu, Rugerero',
        placeholder: true,
      },
    ],
    hours: [
      { days: 'Monday-Friday', hours: '08:00 AM - 17:00 PM' },
      { days: 'Saturday', hours: '09:00 AM - 12:00 PM' },
      { days: 'Sunday & Public Holidays', hours: 'Closed' },
    ],
    actions: [
      { label: 'Schedule a Campus Visit', to: '/contact#contact-form' },
      { label: 'View all Downloads', to: '/admissions#downloads' },
    ],
  } as {
    title: string
    description: string
    offices: ContactOffice[]
    hours: { days: string; hours: string }[]
    actions: { label: string; to: string }[]
  },

  form: {
    title: 'Send Us a Message',
    description: 'Fill out the form below and we\'ll get back to you as soon as possible. Fields marked with * are required.',
    subjects: [
      { value: 'admissions', label: 'Admissions' },
      { value: 'academics', label: 'Academics' },
      { value: 'general', label: 'General Inquiry' },
      { value: 'other', label: 'Other' },
    ] as ContactFormSubject[],
    submitLabel: 'Send Message',
    submittingLabel: 'Sending...',
    successTitle: 'Message Received',
    successDescription: 'Thank you for contacting us. We have received your message and will respond within 1-2 business days.',
    errorTitle: 'Unable to Send Message',
    errorDescription: 'We couldn\'t send your message at this time. Please try again later or contact us directly by phone or email.',
    backendAvailable: false,
    placeholder: true,
  },

  location: {
    title: 'Find Our School',
    description: 'C.S. Noël Nyundo is located in the Rubavu district of Rwanda\'s Western Province, near Lake Kivu.',
    address: 'Rwanda, Western Province, Rubavu, Rugerero',
    coordinates: { lat: -1.6741, lng: 29.3771 },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=C.S.+No%C3%ABl+Nyundo+School+Rubavu+Rwanda',
    placeholder: true,
  },

  faqs: {
    title: 'Frequently Asked Questions',
    description: 'Quick answers to common questions about contacting our school.',
    items: [
      {
        question: 'How can I ask about admissions?',
        answer: 'You can visit our <a href="/admissions" className="text-school-gold underline">Admissions page</a> for detailed information, or use the contact form above and select "Admissions" as the subject.',
        placeholder: true,
      },
      {
        question: 'How can I request information about academic programs?',
        answer: 'Visit our <a href="/academics" className="text-school-gold underline">Academics page</a> for program details, or use the contact form and select "Academics" as the subject to send us a specific inquiry.',
        placeholder: true,
      },
      {
        question: 'How can I arrange a school visit?',
        answer: 'Use the contact form and mention "Campus Visit" in your message. Our team will help schedule a convenient time for your visit.',
        placeholder: true,
      },
      {
        question: 'How can alumni get in touch?',
        answer: 'Alumni are welcome to contact us through the form above (select "General Inquiry"). We love hearing from our graduates and staying connected.',
        placeholder: true,
      },
    ] as ContactFAQ[],
  },

  finalCta: {
    title: 'We Look Forward to Hearing From You',
    description: 'Whether you\'re a prospective parent, current student, alumnus, or visitor, our doors are always open. Reach out today and let us know how we can help.',
    primaryCta: { label: 'Send a Message', to: '#contact-form' },
    secondaryCta: { label: 'View Contact Details', to: '#contact-info' },
  },
}
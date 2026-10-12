// Notices and announcements data.
// All dates, content, and official information are marked as UNVERIFIED placeholders
// until confirmed by the school. Replace placeholder values with verified data before publishing.

export type Notice = {
  id: string
  category: 'OFFICIAL' | 'ACADEMIC' | 'EVENT' | 'ADMISSIONS' | 'ALUMNI' | 'SPORTS'
  categoryLabel: string
  categoryColor: string
  date: string
  title: string
  summary: string
  content: string
  placeholder: boolean
}

export const noticeCategories = [
  { value: 'OFFICIAL', label: 'Official Notice', color: 'bg-school-navy' },
  { value: 'ACADEMIC', label: 'Academic', color: 'bg-[#4580D9]' },
  { value: 'EVENT', label: 'Event', color: 'bg-[#2E7D32]' },
  { value: 'ADMISSIONS', label: 'Admissions', color: 'bg-school-gold' },
  { value: 'ALUMNI', label: 'Alumni', color: 'bg-[#7B1FA2]' },
  { value: 'SPORTS', label: 'Sports', color: 'bg-[#C62828]' },
] as const

export const notices: Notice[] = [
  {
    id: '1',
    category: 'ACADEMIC',
    categoryLabel: 'Academic',
    categoryColor: 'bg-[#4580D9]',
    date: 'May 19, 2026',
    title: 'End of Term 2 Examination Timetable',
    summary: 'The examination timetable for Term 2 has been published. All students should check the schedule and prepare accordingly.',
    content: `
      <p>The Term 2 examination timetable has been officially published and is now available for all students and parents.</p>
      <h3>Key Dates</h3>
      <ul>
        <li>Examination Period: June 10 - June 20, 2026</li>
        <li>Study Leave: June 5 - June 9, 2026</li>
        <li>Results Publication: July 5, 2026</li>
      </ul>
      <h3>Important Notes</h3>
      <ul>
        <li>Students must bring their student ID cards to all examinations.</li>
        <li>No electronic devices are permitted in examination halls.</li>
        <li>Students should arrive at least 15 minutes before the scheduled start time.</li>
        <li>Any student who is unwell should notify the school office immediately.</li>
      </ul>
      <p>The detailed timetable with subject-specific dates and times has been distributed to all classes and is also available for download from the school portal.</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Examination dates and timetable details should be confirmed with the school administration.</p>
    `,
    placeholder: true,
  },
  {
    id: '2',
    category: 'EVENT',
    categoryLabel: 'Event',
    categoryColor: 'bg-[#2E7D32]',
    date: '[Date TBD]',
    title: 'Annual Science & Innovation Fair',
    summary: 'Our annual Science & Innovation Fair showcases student projects and scientific discoveries. All families are welcome to attend.',
    content: `
      <p>The Annual Science & Innovation Fair is one of the highlights of our academic calendar, where students from all year groups present their scientific investigations and innovative projects.</p>
      <h3>Event Details</h3>
      <ul>
        <li>Date: To be confirmed</li>
        <li>Time: 9:00 AM - 3:00 PM</li>
        <li>Venue: School Main Hall & Science Laboratories</li>
        <li>Open to: All students, parents, and guests</li>
      </ul>
      <h3>Categories</h3>
      <ul>
        <li>Environmental Science</li>
        <li>Physics & Engineering</li>
        <li>Biology & Life Sciences</li>
        <li>Computer Science & Technology</li>
        <li>Chemistry & Materials</li>
      </ul>
      <p>Students interested in participating should speak with their science teachers. Registration details will be announced closer to the event date.</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Event date, categories, and registration details should be confirmed with the school.</p>
    `,
    placeholder: true,
  },
  {
    id: '3',
    category: 'OFFICIAL',
    categoryLabel: 'Official Notice',
    categoryColor: 'bg-school-navy',
    date: '[Date TBD]',
    title: 'School Fee Payment Reminder - Term 3',
    summary: 'Reminder for Term 3 fee payments. Please ensure payments are completed before the deadline to avoid disruption to your child\'s education.',
    content: `
      <p>This is a reminder that Term 3 school fees are due for payment. Timely payment ensures uninterrupted access to all school facilities and programs.</p>
      <h3>Payment Information</h3>
      <ul>
        <li>Due Date: To be confirmed</li>
        <li>Amount: As per the fee structure for your child's year group</li>
        <li>Payment Methods: Bank transfer, Mobile Money, Airtel Money (details available from the accounts office)</li>
      </ul>
      <h3>Financial Assistance</h3>
      <p>Families experiencing financial difficulties are encouraged to contact the school bursar's office to discuss payment plans or available support options. All discussions are treated with strict confidentiality.</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Fee amounts, due dates, and payment methods should be confirmed with the school accounts office.</p>
    `,
    placeholder: true,
  },
  {
    id: '4',
    category: 'ADMISSIONS',
    categoryLabel: 'Admissions',
    categoryColor: 'bg-school-gold',
    date: '[Date TBD]',
    title: 'Admissions Open for 2026 Academic Year',
    summary: 'Applications are now open for the 2026 academic year. Limited places available from Nursery to Primary 6.',
    content: `
      <p>C.S. Noël Nyundo School is now accepting applications for the 2026 academic year. We welcome applications for all year groups from Nursery 1 through Primary 6.</p>
      <h3>Available Places</h3>
      <ul>
        <li>Nursery 1 (N1): Limited spaces</li>
        <li>Nursery 2 (N2): Limited spaces</li>
        <li>Nursery 3 (N3): Limited spaces</li>
        <li>Primary 1 (P1): Limited spaces</li>
        <li>Primary 2-6 (P2-P6): Subject to availability</li>
      </ul>
      <h3>Application Process</h3>
      <ol>
        <li>Complete the online application form at <a href="/admissions/apply" class="text-school-gold underline">/admissions/apply</a></li>
        <li>Submit required documents (birth certificate, previous school reports, immunization records)</li>
        <li>Attend the assessment session</li>
        <li>Parent/guardian interview with school leadership</li>
      </ol>
      <p>For more information, visit our <a href="/admissions" class="text-school-gold underline">Admissions page</a> or contact the admissions office directly.</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Admission dates, available places, and requirements should be confirmed with the school admissions office.</p>
    `,
    placeholder: true,
  },
  {
    id: '5',
    category: 'ALUMNI',
    categoryLabel: 'Alumni',
    categoryColor: 'bg-[#7B1FA2]',
    date: '[Date TBD]',
    title: 'Alumni Reunion - Class of 2016',
    summary: 'The Class of 2016 is invited to a 10-year reunion celebration. Reconnect with former classmates and teachers.',
    content: `
      <p>The Class of 2016 is celebrating their 10-year reunion! This is a wonderful opportunity to reconnect with old friends, share memories, and see how the school has grown.</p>
      <h3>Event Details</h3>
      <ul>
        <li>Date: To be confirmed</li>
        <li>Time: 2:00 PM - 6:00 PM</li>
        <li>Venue: School Main Hall</li>
        <li>Dress Code: Smart Casual</li>
      </ul>
      <h3>Program</h3>
      <ul>
        <li>Welcome address by the Head of School</li>
        <li>School tour highlighting recent developments</li>
        <li>Class memories and photo sharing</li>
        <li>Refreshments and networking</li>
      </ul>
      <p>Please RSVP to the alumni office by [Date TBD] to confirm your attendance. We look forward to seeing you!</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Reunion date, venue, and program details should be confirmed with the alumni office.</p>
    `,
    placeholder: true,
  },
  {
    id: '6',
    category: 'SPORTS',
    categoryLabel: 'Sports',
    categoryColor: 'bg-[#C62828]',
    date: '[Date TBD]',
    title: 'Inter-House Sports Competition 2026',
    summary: 'Annual inter-house sports competition featuring athletics, football, netball, and more. All students participate.',
    content: `
      <p>The annual Inter-House Sports Competition brings together all four school houses for a day of friendly competition, teamwork, and school spirit.</p>
      <h3>Competition Details</h3>
      <ul>
        <li>Date: To be confirmed</li>
        <li>Time: 8:00 AM - 4:00 PM</li>
        <li>Venue: School Sports Field & Courts</li>
        <li>Participants: All students (Nursery through Primary 6)</li>
      </ul>
      <h3>Events</h3>
      <ul>
        <li>Track: 100m, 200m, 400m, 800m, 4x100m relay</li>
        <li>Field: Long jump, high jump, shot put</li>
        <li>Team Sports: Football, netball, volleyball</li>
        <li>Fun Events: Sack race, three-legged race, tug of war</li>
      </ul>
      <h3>House Colors</h3>
      <ul>
        <li>St. Francis (Blue)</li>
        <li>St. Clare (Red)</li>
        <li>St. Joseph (Green)</li>
        <li>St. Mary (Yellow)</li>
      </ul>
      <p>Parents are welcome to attend and cheer for their children's houses. Refreshments will be available for purchase.</p>
      <p class="text-amber-600 text-sm"><strong>Unverified placeholder:</strong> Competition date, events, and house details should be confirmed with the sports department.</p>
    `,
    placeholder: true,
  },
]

export const noticesPage = {
  title: 'Notice Board',
  description: 'Stay informed with the latest announcements, events, and important updates from C.S. Noël Nyundo School.',
  placeholder: true,
}

export const noticeDetailPage = {
  notFoundTitle: 'Notice Not Found',
  notFoundDescription: 'The notice you are looking for does not exist or has been removed.',
  backToNotices: 'Back to Notice Board',
  placeholder: true,
}
import { Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'
import { AnnouncementCard, type Announcement } from '../components/AnnouncementCard'

type AnnouncementsSectionProps = {
  title: string
  announcements: Announcement[]
  viewAllLabel: string
  viewAllTo: string
}

export function AnnouncementsSection({
  title,
  announcements,
  viewAllLabel,
  viewAllTo,
}: AnnouncementsSectionProps) {
  return (
    <section
      aria-label="Latest announcements"
      className="bg-white py-16 sm:py-20"
    >
      <PageContainer>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-bold leading-tight text-school-navy sm:text-5xl">
            {title}
          </h2>
          <Link
            className="hidden items-center gap-1 text-lg text-school-navy sm:inline-flex"
            to={viewAllTo}
          >
            {viewAllLabel}
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} {...announcement} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            className="inline-flex items-center gap-1 text-lg text-school-navy"
            to={viewAllTo}
          >
            {viewAllLabel}
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
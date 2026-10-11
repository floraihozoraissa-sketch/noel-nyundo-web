import { PageContainer } from '../../components/ui/PageContainer'

type CalendarEvent = {
  month: string
  date: string
  title: string
  description: string
  placeholder?: boolean
}

type AcademicCalendarProps = {
  title: string
  description: string
  events: CalendarEvent[]
}

export function AcademicCalendarSection({
  title,
  description,
  events,
}: AcademicCalendarProps) {
  return (
    <section
      aria-label="Academic calendar"
      className="bg-white py-16 sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <article
              key={event.title}
              className="flex flex-col items-center text-center rounded-lg bg-white p-6 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col items-center rounded-lg bg-school-navy text-white">
                <span className="px-4 py-1 text-sm font-semibold uppercase tracking-wide">
                  {event.month}
                </span>
                <span className="px-4 py-2 text-3xl font-bold">
                  {event.date}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-school-navy">
                {event.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {event.description}
              </p>
              <a
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-school-gold transition-colors hover:text-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                ADD TO MY CALENDAR
                <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              {event.placeholder && (
                <span className="mt-2 text-[10px] uppercase tracking-wide text-amber-600">
                  Unverified placeholder
                </span>
              )}
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
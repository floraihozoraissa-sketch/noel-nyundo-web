import { PageContainer } from '../../components/ui/PageContainer'
import type { ReactNode } from 'react'

type Requirement = {
  title: string
  description: string
  icon: string
  placeholder?: boolean
}

type GeneralRequirementsProps = {
  title: string
  description: string
  requirements: Requirement[]
}

export function GeneralRequirementsSection({
  title,
  description,
  requirements,
}: GeneralRequirementsProps) {
  const iconMap: Record<string, ReactNode> = {
    book: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    calendar: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'check-circle': (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'map-pin': (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    monitor: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shirt: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 6.78a2 2 0 0 0 1.09 1.81L6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2.06-3.72a2 2 0 0 0 1.09-1.81l.58-6.78a2 2 0 0 0-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }

  return (
    <section
      aria-label="General requirements"
      className="bg-school-bg/60 py-16 sm:py-20"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requirements.map((req) => (
            <article
              key={req.title}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-school-navy/5">
                <span className="flex size-14 items-center justify-center rounded-full bg-school-gold/20 text-school-gold">
                  {iconMap[req.icon] ?? iconMap.book}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold leading-snug text-school-navy">
                  {req.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {req.description}
                </p>
                {req.placeholder && (
                  <span className="mt-4 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                    Unverified placeholder
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
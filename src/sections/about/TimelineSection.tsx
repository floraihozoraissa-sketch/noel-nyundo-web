import { PageContainer } from '../../components/ui/PageContainer'

type TimelineEntry = {
  heading: string
  body: string
  placeholder?: boolean
}

type TimelineSectionProps = {
  entries: TimelineEntry[]
}

export function TimelineSection({ entries }: TimelineSectionProps) {
  return (
    <section
      aria-label="Our history timeline"
      className="bg-white py-8 sm:py-10"
    >
      <PageContainer>
        <div className="flex flex-col gap-10">
          {entries.map((entry, index) => (
            <div key={entry.heading}>
              {index > 0 && (
                <hr
                  aria-hidden="true"
                  className="mb-10 h-[3px] w-11 border-0 bg-school-gold"
                />
              )}
              <h3 className="text-xl font-semibold text-school-navy sm:text-2xl">
                {entry.heading}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                {entry.body}
              </p>
              {entry.placeholder && (
                <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                  Unverified placeholder
                </span>
              )}
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
import { PageContainer } from '../../components/ui/PageContainer'

type HeritageProps = {
  badge: string
  foundingYearLabel: string
  yearsOfHistory: string
  yearsOfHistoryLabel: string
  title: string
  placeholder?: boolean
}

export function HeritageSection({
  badge,
  foundingYearLabel,
  yearsOfHistory,
  yearsOfHistoryLabel,
  title,
  placeholder,
}: HeritageProps) {
  return (
    <section
      aria-label="Our heritage"
      className="bg-school-navy py-12 text-white sm:py-16"
    >
      <PageContainer>
        <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:gap-10">
          <span className="inline-flex shrink-0 items-center gap-3 rounded-md bg-school-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-school-navy">
            {badge}
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white">
              {foundingYearLabel}
            </span>
            <span className="text-sm text-white/70">•</span>
            <span className="text-3xl font-bold text-school-gold sm:text-4xl">
              {yearsOfHistory}
            </span>
            <span className="text-sm font-medium uppercase tracking-wide text-white/80">
              {yearsOfHistoryLabel}
            </span>
          </div>
        </div>
        <h2 className="mt-6 text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight">
          {title}
        </h2>
        {placeholder && (
          <span className="mt-3 inline-block text-xs uppercase tracking-wide text-white/40">
            Unverified placeholder
          </span>
        )}
      </PageContainer>
    </section>
  )
}
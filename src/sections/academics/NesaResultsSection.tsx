import { PageContainer } from '../../components/ui/PageContainer'

type NesaStat = {
  value: string
  label: string
  placeholder?: boolean
}

type NesaResultsProps = {
  title: string
  description: string
  stats: NesaStat[]
  trendTitle: string
  trendPlaceholder?: boolean
}

export function NesaResultsSection({
  title,
  description,
  stats,
  trendTitle,
  trendPlaceholder,
}: NesaResultsProps) {
  return (
    <section
      aria-label="NESA examination results"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-2">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <span className="text-5xl font-bold text-school-gold">
                {stat.value}
              </span>
              <span className="mt-2 text-base font-medium text-slate-600">
                {stat.label}
              </span>
              {stat.placeholder && (
                <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                  Unverified placeholder
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-school-navy p-8 text-white">
          <h3 className="text-center text-xl font-semibold uppercase tracking-wide text-school-gold">
            {trendTitle}
          </h3>
          <div className="mt-6 flex items-center justify-center">
            <div
              className="w-full max-w-xl rounded-lg border-2 border-dashed border-school-gold/40 bg-white/5 p-8 text-center"
              role="img"
              aria-label="5-year performance trend chart placeholder"
            >
              <svg
                aria-hidden="true"
                className="mx-auto size-16 text-school-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 17l4-4 4 3 5-6 4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-3 text-sm text-white/70">
                {trendPlaceholder
                  ? 'Official 5-year performance data will be added here once confirmed.'
                  : trendTitle}
              </p>
            </div>
          </div>
          {trendPlaceholder && (
            <p className="mt-4 text-center text-[10px] uppercase tracking-wide text-white/40">
              Unverified placeholder
            </p>
          )}
        </div>
      </PageContainer>
    </section>
  )
}
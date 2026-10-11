import { PageContainer } from '../../components/ui/PageContainer'

type UniformProps = {
  title: string
  description: string
  kits: string[]
  downloadGuideLabel: string
  downloadGuideTo: string
  storeLabel: string
  storeDescription: string
  placeholder?: boolean
}

export function UniformSection({
  title,
  description,
  kits,
  downloadGuideLabel,
  downloadGuideTo,
  storeLabel,
  storeDescription,
  placeholder,
}: UniformProps) {
  return (
    <section
      aria-label="School uniform"
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
          {kits.map((kit) => (
            <article
              key={kit}
              className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-school-gold/15 text-school-gold flex-shrink-0">
                <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 6.78a2 2 0 0 0 1.09 1.81L6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2.06-3.72a2 2 0 0 0 1.09-1.81l.58-6.78a2 2 0 0 0-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-medium text-school-navy">
                {kit}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            className="inline-flex min-h-[56px] items-center justify-center rounded-md bg-school-gold px-6 py-2.5 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
            href={downloadGuideTo}
          >
            {downloadGuideLabel}
          </a>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="font-medium text-school-navy">{storeLabel}</span>
            <span>{storeDescription}</span>
          </div>
        </div>

        {placeholder && (
          <p className="mt-4 text-center text-[10px] uppercase tracking-wide text-amber-600">
            Unverified placeholder
          </p>
        )}
      </PageContainer>
    </section>
  )
}
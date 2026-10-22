import { PageContainer } from '../../components/ui/PageContainer'

type AcademicsHeroProps = {
  badge: string
  title: string
  description: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
  bgImage: string
}

export function AcademicsHero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  bgImage,
}: AcademicsHeroProps) {
  return (
    <section
      aria-label="Academics hero"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(225deg, rgba(51, 61, 78, 0.05) 0%, rgba(7, 36, 84, 1) 44%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-school-navy/60" aria-hidden="true" />
      <div className="relative">
        <PageContainer className="flex min-h-[340px] flex-col justify-center gap-8 py-20 sm:min-h-[400px] sm:py-24 lg:min-h-[603px] lg:py-28">
          <span className="inline-flex w-fit items-center rounded-md bg-school-gold px-5 py-2 text-sm font-semibold uppercase tracking-wide text-school-navy">
            {badge}
          </span>
          <h1 className="whitespace-pre-line text-[clamp(1.75rem,5vw,4rem)] font-bold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex min-h-[68px] items-center justify-center rounded-md bg-school-gold px-8 py-3.5 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
              href={primaryCta.to}
            >
              {primaryCta.label}
            </a>
            <a
              className="inline-flex min-h-[68px] items-center justify-center rounded-md border-2 border-white/85 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={secondaryCta.to}
            >
              {secondaryCta.label}
            </a>
          </div>
        </PageContainer>
      </div>
    </section>
  )
}
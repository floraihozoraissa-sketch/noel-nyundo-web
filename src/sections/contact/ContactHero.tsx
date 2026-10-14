import { PageContainer } from '../../components/ui/PageContainer'

type ContactHeroProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  bgImage: string
}

export function ContactHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  bgImage,
}: ContactHeroProps) {
  return (
    <section
      aria-label="Contact hero"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(225deg, rgba(51, 61, 78, 0.05) 0%, rgba(7, 36, 84, 1) 44%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-school-navy/60" aria-hidden="true" />
      <div className="relative">
        <PageContainer className="flex min-h-[300px] flex-col justify-center gap-4 py-16 sm:min-h-[360px] sm:py-20 lg:min-h-[420px] lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-school-gold">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(1.75rem,5vw,4rem)] font-bold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {description}
          </p>
          <a
            href={ctaHref}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-school-gold px-8 py-3.5 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
          >
            {ctaLabel}
          </a>
        </PageContainer>
      </div>
    </section>
  )
}
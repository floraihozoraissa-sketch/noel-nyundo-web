import { PageContainer } from '../components/ui/PageContainer'

type HeroSectionProps = {
  eyebrow: string
  title: string
  description: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
  bgImage: string
}

export function HeroSection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  bgImage,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(240deg, rgba(51, 61, 78, 0.05) 0%, rgba(7, 36, 84, 1) 48%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-school-navy/55" aria-hidden="true" />
      <div className="relative">
        <PageContainer className="flex min-h-[480px] flex-col justify-center gap-8 py-16 sm:min-h-[560px] sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-school-gold">
              {eyebrow}
            </p>
            <h1 className="mt-4 whitespace-pre-line text-4xl font-bold leading-[1.12] sm:text-6xl sm:leading-[1.08] lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-school-gold px-6 py-3 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold sm:min-h-[68px] sm:w-auto sm:px-8 sm:py-3.5"
              href={primaryCta.to}
            >
              {primaryCta.label}
            </a>
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-white/85 bg-transparent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-[68px] sm:w-auto sm:px-8 sm:py-3.5"
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
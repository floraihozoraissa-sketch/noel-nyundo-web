import { PageContainer } from '../../components/ui/PageContainer'

type AboutHeroProps = {
  title: string
  subtitle: string
  bgImage: string
}

export function AboutHero({ title, subtitle, bgImage }: AboutHeroProps) {
  return (
    <section
      aria-label="About hero"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(225deg, rgba(51, 61, 78, 0.05) 0%, rgba(7, 36, 84, 1) 44%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-school-navy/60" aria-hidden="true" />
      <div className="relative">
        <PageContainer className="flex min-h-[300px] flex-col justify-center gap-6 py-16 sm:min-h-[360px] sm:py-20 lg:min-h-[420px] lg:py-24">
          <h1 className="text-[clamp(1.75rem,5vw,4rem)] font-bold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {subtitle}
          </p>
        </PageContainer>
      </div>
    </section>
  )
}
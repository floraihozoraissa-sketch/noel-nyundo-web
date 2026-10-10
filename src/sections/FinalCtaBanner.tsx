import { PageContainer } from '../components/ui/PageContainer'

type FinalCtaProps = {
  title: string
  description: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
}

export function FinalCtaBanner({
  title,
  description,
  primaryCta,
  secondaryCta,
}: FinalCtaProps) {
  return (
    <section
      aria-label="Call to action"
      className="bg-school-navy py-16 text-white sm:py-20"
    >
      <PageContainer>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white/85">{description}</p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
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
        </div>
      </PageContainer>
    </section>
  )
}
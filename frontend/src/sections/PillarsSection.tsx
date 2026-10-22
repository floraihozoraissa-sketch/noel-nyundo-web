import { Cross, Flag, Trophy, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'

type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

type PillarsSectionProps = {
  title: string
  description: string
  pillars: Pillar[]
}

export function PillarsSection({
  title,
  description,
  pillars,
}: PillarsSectionProps) {
  return (
    <section
      aria-label="Our core pillars"
      className="bg-school-navy py-16 text-white sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/85">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <article
                key={pillar.title}
                className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
              >
                <span
                  className="flex size-16 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                  aria-hidden="true"
                >
                  <Icon aria-hidden="true" size={32} />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-school-navy">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}

export { Cross, Flag, Trophy }
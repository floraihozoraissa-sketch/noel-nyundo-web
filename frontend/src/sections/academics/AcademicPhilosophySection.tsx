import { Brain, Users, Handshake, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type Pillar = {
  icon: string
  title: string
  description: string
}

type AcademicPhilosophyProps = {
  title: string
  description: string
  pillars: Pillar[]
}

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  users: Users,
  handshake: Handshake,
}

export function AcademicPhilosophySection({
  title,
  description,
  pillars,
}: AcademicPhilosophyProps) {
  return (
    <section
      aria-label="Our academic philosophy"
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] ?? Brain
            return (
              <article
                key={pillar.title}
                className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-[0_5.29px_15.86px_0px_rgba(0,0,0,0.08)]"
              >
                <span
                  className="flex size-14 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                  aria-hidden="true"
                >
                  <Icon aria-hidden="true" size={28} />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-school-navy">
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
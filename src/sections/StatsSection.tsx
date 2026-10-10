import { Badge, Cross, Flag, Globe, GraduationCap, Trophy, Users, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'

type Stat = {
  icon: LucideIcon
  value: string
  label: string
  unit?: string
  placeholder?: boolean
}

type StatsSectionProps = {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section
      aria-label="School statistics"
      className="bg-school-navy py-12 text-white sm:py-16"
    >
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="relative flex flex-col items-center rounded-lg bg-white/5 p-6 text-center shadow-[0_5.29px_15.86px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/10"
              >
                <span
                  className="flex size-14 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                  aria-hidden="true"
                >
                  <Icon aria-hidden="true" size={28} />
                </span>
                <span className="mt-4 text-4xl font-bold text-school-gold sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-base font-medium text-white sm:text-lg">
                  {stat.label}
                </span>
                {stat.unit && (
                  <span className="mt-1 text-sm text-white/70">{stat.unit}</span>
                )}
                {stat.placeholder && (
                  <span className="mt-2 text-[10px] uppercase tracking-wide text-white/40">
                    Unverified
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}

export { Badge, Cross, Flag, Globe, GraduationCap, Trophy, Users }
import { Target, Eye, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type Statement = {
  icon: string
  label: string
  text: string
  placeholder?: boolean
}

type MissionVisionProps = {
  mission: Statement
  vision: Statement
}

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  eye: Eye,
}

export function MissionVisionSection({ mission, vision }: MissionVisionProps) {
  const MissionIcon = iconMap[mission.icon] ?? Target
  const VisionIcon = iconMap[vision.icon] ?? Eye

  return (
    <section
      aria-label="Mission and vision"
      className="bg-school-navy py-12 text-white sm:py-16"
    >
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <article className="rounded-lg bg-white/5 p-6 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)] sm:p-8">
            <span
              className="flex size-12 items-center justify-center rounded-full bg-school-gold/20 text-school-gold sm:size-14"
              aria-hidden="true"
            >
              <MissionIcon aria-hidden="true" size={24} />
            </span>
            <h3 className="mt-4 text-lg font-semibold uppercase tracking-wide text-school-gold sm:mt-5 sm:text-xl">
              {mission.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-base">
              {mission.text}
            </p>
            {mission.placeholder && (
              <span className="mt-3 inline-block text-[10px] uppercase tracking-wide text-white/40">
                Unverified placeholder
              </span>
            )}
          </article>

          <article className="rounded-lg bg-white/5 p-6 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)] sm:p-8">
            <span
              className="flex size-12 items-center justify-center rounded-full bg-school-gold/20 text-school-gold sm:size-14"
              aria-hidden="true"
            >
              <VisionIcon aria-hidden="true" size={24} />
            </span>
            <h3 className="mt-4 text-lg font-semibold uppercase tracking-wide text-school-gold sm:mt-5 sm:text-xl">
              {vision.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-base">
              {vision.text}
            </p>
            {vision.placeholder && (
              <span className="mt-3 inline-block text-[10px] uppercase tracking-wide text-white/40">
                Unverified placeholder
              </span>
            )}
          </article>
        </div>
      </PageContainer>
    </section>
  )
}
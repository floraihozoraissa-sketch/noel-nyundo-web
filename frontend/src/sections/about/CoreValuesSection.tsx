import { Cross, Trophy, Flag, Heart, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type CoreValue = {
  icon: string
  title: string
  description: string
}

type CoreValuesProps = {
  title: string
  description: string
  values: CoreValue[]
}

const iconMap: Record<string, LucideIcon> = {
  cross: Cross,
  trophy: Trophy,
  flag: Flag,
  heart: Heart,
}

export function CoreValuesSection({
  title,
  description,
  values,
}: CoreValuesProps) {
  return (
    <section
      aria-label="Our core values"
      className="bg-school-bg/60 py-12 sm:py-16"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = iconMap[value.icon] ?? Cross
            return (
              <article
                key={value.title}
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
              >
                <span
                  className="flex size-12 items-center justify-center rounded-full bg-school-gold/20 text-school-gold sm:size-16"
                  aria-hidden="true"
                >
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-school-navy sm:mt-6 sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:mt-3">
                  {value.description}
                </p>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
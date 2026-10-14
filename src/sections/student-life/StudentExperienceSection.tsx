import { BookOpen, Flag, Heart, Trophy, type LucideIcon } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type ExperienceItem = {
  icon: string
  title: string
  description: string
}

type StudentExperienceSectionProps = {
  title: string
  description: string
  items: ExperienceItem[]
}

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  flag: Flag,
  trophy: Trophy,
  heart: Heart,
}

export function StudentExperienceSection({
  title,
  description,
  items,
}: StudentExperienceSectionProps) {
  return (
    <section
      aria-label="What every student experiences"
      className="bg-white py-16 sm:py-20"
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
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? Heart
            return (
              <article
                key={item.title}
                className="flex flex-col items-center rounded-lg border border-slate-200 bg-school-bg/40 p-6 text-center"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-school-gold/15 text-school-gold"
                >
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-school-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}

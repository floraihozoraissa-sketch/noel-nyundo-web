import {
  Church,
  BookOpen,
  Scale,
  Heart,
  Handshake,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type IdentityValue = {
  icon: string
  label: string
}

type CatholicIdentityProps = {
  title: string
  description: string
  values: IdentityValue[]
}

const iconMap: Record<string, LucideIcon> = {
  church: Church,
  bible: BookOpen,
  scales: Scale,
  heart: Heart,
  hands: Handshake,
  users: Users,
}

export function CatholicIdentitySection({
  title,
  description,
  values,
}: CatholicIdentityProps) {
  return (
    <section
      aria-label="Our Catholic identity"
      className="bg-white py-12 sm:py-16"
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

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {values.map((value) => {
            const Icon = iconMap[value.icon] ?? Church
            return (
              <article
                key={value.label}
                className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-[0_5.33px_15.98px_0px_rgba(0,0,0,0.08)] sm:p-6"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-full bg-school-gold/15 text-school-gold sm:size-12"
                  aria-hidden="true"
                >
                  <Icon aria-hidden="true" size={20} />
                </span>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-school-navy sm:mt-3 sm:text-xs">
                  {value.label}
                </span>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
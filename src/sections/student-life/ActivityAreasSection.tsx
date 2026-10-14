import {
  Church,
  Dumbbell,
  Handshake,
  Mic,
  Music,
  Palette,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type ActivityArea = {
  icon: string
  title: string
  description: string
  image: string
}

type ActivityAreasSectionProps = {
  title: string
  description: string
  areas: ActivityArea[]
}

const iconMap: Record<string, LucideIcon> = {
  church: Church,
  dumbbell: Dumbbell,
  music: Music,
  palette: Palette,
  mic: Mic,
  handshake: Handshake,
}

export function ActivityAreasSection({
  title,
  description,
  areas,
}: ActivityAreasSectionProps) {
  return (
    <section
      aria-label="Student activities and programmes"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = iconMap[area.icon] ?? Church
            return (
              <article
                key={area.title}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
              >
                <SchoolImage
                  alt={area.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={area.image}
                  wrapperClassName="aspect-[4/3]"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-school-gold/15 text-school-gold"
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-school-navy">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}

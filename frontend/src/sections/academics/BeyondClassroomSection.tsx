import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type Activity = {
  eyebrow: string
  title: string
  image: string
}

type BeyondClassroomProps = {
  title: string
  description: string
  activities: Activity[]
}

export function BeyondClassroomSection({
  title,
  description,
  activities,
}: BeyondClassroomProps) {
  return (
    <section
      aria-label="Beyond the classroom"
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
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="group relative overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <SchoolImage
                alt={activity.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={activity.image}
                wrapperClassName="aspect-[4/3]"
              />
              <div className="bg-school-navy px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-school-gold">
                  {activity.eyebrow}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {activity.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
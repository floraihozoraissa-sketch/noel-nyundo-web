import { Link } from 'react-router'
import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type FacilityItem = {
  name: string
  description: string
  image: string
}

type StudentLifeFacilitiesSectionProps = {
  title: string
  description: string
  items: FacilityItem[]
  ctaLabel: string
  ctaTo: string
}

export function StudentLifeFacilitiesSection({
  title,
  description,
  items,
  ctaLabel,
  ctaTo,
}: StudentLifeFacilitiesSectionProps) {
  return (
    <section
      aria-label="School facilities"
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
          {items.map((item) => (
            <figure
              key={item.name}
              className="group relative overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <SchoolImage
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={item.image}
                wrapperClassName="aspect-[4/3]"
              />
              <figcaption className="p-5">
                <h3 className="text-lg font-semibold text-school-navy">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-school-gold px-8 py-3 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
            to={ctaTo}
          >
            {ctaLabel}
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}

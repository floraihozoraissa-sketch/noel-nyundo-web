import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type Facility = {
  name: string
  description: string
  image: string
}

type FacilitiesProps = {
  title: string
  description: string
  facilities: Facility[]
}

export function LearningFacilitiesSection({
  title,
  description,
  facilities,
}: FacilitiesProps) {
  return (
    <section
      aria-label="Our learning facilities"
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {facilities.map((facility) => (
            <article
              key={facility.name}
              className="overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <SchoolImage
                alt={facility.name}
                className="h-full w-full object-cover"
                src={facility.image}
                wrapperClassName="aspect-[4/3]"
              />
              <div className="bg-school-navy p-5">
                <h3 className="text-lg font-semibold text-white">
                  {facility.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {facility.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
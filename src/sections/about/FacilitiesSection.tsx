import { Link } from 'react-router'
import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type FacilityImage = {
  src: string
  alt: string
}

type FacilitiesProps = {
  title: string
  description: string
  images: FacilityImage[]
  ctaLabel: string
  ctaTo: string
}

export function FacilitiesSection({
  title,
  description,
  images,
  ctaLabel,
  ctaTo,
}: FacilitiesProps) {
  return (
    <section
      aria-label="Our facilities"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <figure
              key={image.src}
              className="group relative overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <SchoolImage
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={image.src}
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-school-navy/70 via-transparent to-transparent p-4">
                <span className="text-sm font-medium text-white">
                  {image.alt}
                </span>
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
import { Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'

type GalleryImage = {
  src: string
  alt: string
}

type SchoolLifeGalleryProps = {
  title: string
  description: string
  images: GalleryImage[]
  ctaLabel: string
  ctaTo: string
}

export function SchoolLifeGallery({
  title,
  description,
  images,
  ctaLabel,
  ctaTo,
}: SchoolLifeGalleryProps) {
  return (
    <section
      aria-label="School life gallery"
      className="bg-school-bg/60 py-16 sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-school-navy sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure key={image.src} className="group relative overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <img
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={image.src}
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-school-navy/70 via-transparent to-transparent p-4">
                <span className="text-sm font-medium text-white">
                  School Life {index + 1}
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

export type { GalleryImage }
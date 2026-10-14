import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'

type AlumniTestimonialProps = {
  name: string
  class: string
  achievement: string
  quote: string
  heading: string
  cta: { label: string; to: string }
  placeholder?: boolean
}

export function AlumniTestimonialSection({
  name,
  class: alumniClass,
  achievement,
  quote,
  heading,
  cta,
  placeholder,
}: AlumniTestimonialProps) {
  return (
    <section
      aria-label="Alumni testimonial"
      className="bg-school-navy py-16 text-white sm:py-20"
    >
      <PageContainer>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <SchoolImage
                alt="Alumni photograph"
                className="aspect-[4/5] w-full object-cover"
                src="/images/academics/alumni.jpg"
              />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-md bg-school-gold px-5 py-3 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <span className="block text-sm font-semibold text-school-navy">
                {cta.label}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="flex size-12 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
              aria-hidden="true"
            >
              <svg
                aria-hidden="true"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h12v12H6V6zm1 1v10h10V7H7zm2 2h6v6H9V9zm3-3h2v2h-2V6z" />
              </svg>
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              {quote}
            </p>
            <div className="mt-6 space-y-1">
              <p className="text-base font-semibold text-school-gold">{name}</p>
              <p className="text-sm text-white/70">{alumniClass}</p>
              <p className="text-sm font-medium text-white/85">{achievement}</p>
            </div>
            {placeholder && (
              <span className="mt-4 inline-block text-[10px] uppercase tracking-wide text-white/40">
                Unverified placeholder
              </span>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
import { PageContainer } from '../components/ui/PageContainer'

type MapSectionProps = {
  title: string
  image: string
}

export function MapSection({ title, image }: MapSectionProps) {
  return (
    <section
      aria-label="School location"
      className="bg-white py-16 sm:py-20"
    >
      <PageContainer>
        <h2 className="text-3xl font-bold leading-tight text-school-navy sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mt-8 overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
          <img
            alt="School location map"
            className="aspect-[16/9] w-full object-cover"
            src={image}
          />
        </div>
      </PageContainer>
    </section>
  )
}
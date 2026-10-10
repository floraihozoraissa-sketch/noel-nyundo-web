import { PageContainer } from '../../components/ui/PageContainer'

type StandardizedExcellenceProps = {
  title: string
  description: string
  image: string
  imageCaption: string
}

export function StandardizedExcellenceSection({
  title,
  description,
  image,
  imageCaption,
}: StandardizedExcellenceProps) {
  return (
    <section
      aria-label="Standardized excellence"
      className="bg-white py-16 sm:py-20"
    >
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
            <img
              alt={imageCaption}
              className="aspect-[4/3] w-full object-cover"
              src={image}
            />
            <p className="bg-school-navy px-4 py-2 text-center text-sm font-medium text-white">
              {imageCaption}
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
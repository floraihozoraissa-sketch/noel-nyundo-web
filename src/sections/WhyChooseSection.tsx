import { PageContainer } from '../components/ui/PageContainer'

type WhyChooseCard = {
  title: string
  description: string
  image: string
}

type WhyChooseSectionProps = {
  title: string
  description: string
  cards: WhyChooseCard[]
}

export function WhyChooseSection({
  title,
  description,
  cards,
}: WhyChooseSectionProps) {
  return (
    <section
      aria-label="Why families choose us"
      className="bg-school-bg/60 py-16 sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-school-navy sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={card.image}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-school-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
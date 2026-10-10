import { PageContainer } from '../../components/ui/PageContainer'

type Leader = {
  name: string
  title: string
  phone: string
  email: string
  image: string
  placeholder?: boolean
}

type LeadershipProps = {
  title: string
  description: string
  leaders: Leader[]
}

export function LeadershipSection({
  title,
  description,
  leaders,
}: LeadershipProps) {
  return (
    <section
      aria-label="Our leadership team"
      className="bg-white py-12 sm:py-16"
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
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="overflow-hidden rounded-lg bg-white shadow-[0_5.88px_17.65px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-school-navy/5 sm:aspect-[3/4]">
                <img
                  alt={leader.name}
                  className="h-full w-full object-cover"
                  src={leader.image}
                />
              </div>
              <div className="p-5 text-center sm:p-6">
                <h3 className="text-lg font-semibold text-school-navy sm:text-xl">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {leader.title}
                </p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="inline-flex items-center justify-center gap-2">
                    <svg
                      aria-hidden="true"
                      className="size-4 text-school-gold"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v14h12V5M5 7h10M5 10h6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {leader.phone}
                  </p>
                  <p className="inline-flex items-center justify-center gap-2">
                    <svg
                      aria-hidden="true"
                      className="size-4 text-school-gold"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4 4h16v16H4V4zm2 2v12h12V6M6 8h8M6 12h6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {leader.email}
                  </p>
                </div>
                {leader.placeholder && (
                  <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                    Unverified placeholder
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}

export type { Leader }
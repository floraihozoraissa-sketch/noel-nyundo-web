import { PageContainer } from '../../components/ui/PageContainer'

type Subject = string

type SubjectsSectionProps = {
  title: string
  description: string
  subjects: Subject[]
}

export function SubjectsOfferedSection({
  title,
  description,
  subjects,
}: SubjectsSectionProps) {
  return (
    <section
      aria-label="Subjects offered"
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <article
              key={subject}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)] ring-1 ring-slate-100"
            >
              <span
                className="flex size-12 items-center justify-center rounded-full bg-school-gold/15 text-school-gold"
                aria-hidden="true"
              >
                <svg
                  aria-hidden="true"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="mt-3 text-sm font-semibold uppercase tracking-wide text-school-navy">
                {subject}
              </span>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
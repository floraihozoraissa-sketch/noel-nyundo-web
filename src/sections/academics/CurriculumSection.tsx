import { PageContainer } from '../../components/ui/PageContainer'

type GradeLevel = {
  level: string
  title: string
  description: string
  placeholder?: boolean
}

type CurriculumSectionProps = {
  title: string
  highlights: string[]
  gradeLevels: GradeLevel[]
  continuousAssessment: string
}

export function CurriculumSection({
  title,
  highlights,
  gradeLevels,
  continuousAssessment,
}: CurriculumSectionProps) {
  return (
    <section
      aria-label="Curriculum"
      className="bg-school-bg/60 py-16 sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
            {title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {gradeLevels.map((grade) => (
            <article
              key={grade.level}
              className="overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="bg-school-gold px-5 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wide text-school-navy">
                  {grade.level}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-school-navy">
                  {grade.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {grade.description}
                </p>
                {grade.placeholder && (
                  <span className="mt-3 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                    Unverified placeholder
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-school-navy p-8 text-white">
          <h3 className="text-xl font-semibold uppercase tracking-wide text-school-gold">
            Curriculum Highlights
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span
                  className="mt-2 size-2 shrink-0 rounded-full bg-school-gold"
                  aria-hidden="true"
                />
                <span className="text-base text-white/90">{highlight}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-base text-white/85">
            {continuousAssessment}
          </p>
        </div>
      </PageContainer>
    </section>
  )
}
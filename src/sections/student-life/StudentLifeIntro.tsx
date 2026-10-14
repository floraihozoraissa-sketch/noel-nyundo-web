import { CircleCheck } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'

type StudentLifeIntroProps = {
  title: string
  paragraphs: string[]
  highlights: string[]
}

export function StudentLifeIntro({
  title,
  paragraphs,
  highlights,
}: StudentLifeIntroProps) {
  return (
    <section aria-label="Welcome to student life" className="bg-white py-16 sm:py-20">
      <PageContainer>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
              {title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2" role="list">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-school-bg/50 p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                >
                  <CircleCheck size={16} />
                </span>
                <span className="text-sm font-medium leading-snug text-school-navy">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  )
}

import { PageContainer } from '../../components/ui/PageContainer'
import type { ReactNode } from 'react'

type Step = {
  number: number
  title: string
  description: string
  icon: string
}

type AdmissionProcessProps = {
  title: string
  description: string
  steps: Step[]
}

export function AdmissionProcessSection({
  title,
  description,
  steps,
}: AdmissionProcessProps) {
  const iconMap: Record<string, ReactNode> = {
    search: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'file-text': (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'check-circle': (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'message-square': (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    mail: (
      <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }

  return (
    <section
      aria-label="Admission process"
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

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="size-16 flex items-center justify-center rounded-full bg-school-gold/10 text-school-gold">
                  {iconMap[step.icon] ?? iconMap.search}
                </div>
                <span className="absolute -top-2 -right-2 size-8 flex items-center justify-center rounded-full bg-school-gold text-white text-sm font-bold">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-school-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
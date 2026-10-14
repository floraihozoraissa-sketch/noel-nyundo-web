import { } from 'react'

type Step = {
  number: number
  label: string
  href?: string
}

type ProgressStepsProps = {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className = '' }: ProgressStepsProps) {
  return (
    <nav aria-label="Application progress" className={`${className}`.trim()}>
      <ol className="flex items-center" role="list">
        {steps.map((step, index) => (
          <li key={step.number} className="flex items-center">
            <div className="flex items-center">
{index > 0 && (
                <div
                  className={`hidden h-0.5 w-12 sm:w-16 ${
                    index <= currentStep ? 'bg-school-gold' : 'bg-slate-200'
                  }`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                disabled={index > currentStep}
                className={`relative flex flex-col items-center ${
                  index < currentStep
                    ? 'text-school-gold'
                    : index === currentStep
                    ? 'text-school-navy'
                    : 'text-slate-400'
                }`}
                aria-current={index === currentStep ? 'step' : undefined}
                aria-label={`${step.label} - Step ${step.number}`}
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    index < currentStep
                      ? 'bg-school-gold border-school-gold text-school-navy'
                      : index === currentStep
                      ? 'bg-white border-school-gold text-school-navy'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                  aria-hidden="true"
                >
                  {index < currentStep ? (
                    <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </span>
                <span className="mt-1.5 text-xs font-medium text-center max-w-[80px] hidden sm:block">
                  {step.label}
                </span>
                <span className="sr-only">
                  {step.label}
                </span>
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="sr-only" aria-live="polite">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.label}
      </div>
    </nav>
  )
}
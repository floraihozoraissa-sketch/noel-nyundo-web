import { useState } from 'react'
import { PageContainer } from '../../components/ui/PageContainer'

type FAQItem = {
  question: string
  answer: string
  placeholder?: boolean
}

type FAQProps = {
  title: string
  description: string
  items: FAQItem[]
}

export function FAQSection({
  title,
  description,
  items,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      aria-label="Frequently asked questions"
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

        <div className="mt-10 max-w-3xl mx-auto">
          <dl className="space-y-4">
            {items.map((item, index) => (
              <div key={item.question} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                >
                  <span className="text-base font-medium text-school-navy pr-8">
                    {item.question}
                  </span>
                  <svg
                    aria-hidden="true"
                    className={`size-5 text-slate-500 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-label={item.question}
                  className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-5 pb-5 text-sm text-slate-600">
                    <p>{item.answer}</p>
                    {item.placeholder && (
                      <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                        Unverified placeholder
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </PageContainer>
    </section>
  )
}
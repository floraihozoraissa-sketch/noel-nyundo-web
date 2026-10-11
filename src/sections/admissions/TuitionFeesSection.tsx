import { PageContainer } from '../../components/ui/PageContainer'

type Tier = {
  label: string
  registration: string
  tuitionPerTerm: string
  learningResources: string
  activityFee: string
  totalPerTerm: string
  placeholder?: boolean
}

type TuitionFeesProps = {
  title: string
  description: string
  tiers: Tier[]
  inclusions: string[]
  ctaLabel: string
  ctaTo: string
}

export function TuitionFeesSection({
  title,
  description,
  tiers,
  inclusions,
  ctaLabel,
  ctaTo,
}: TuitionFeesProps) {
  const rows = [
    { key: 'registration', label: 'Registration (One-time)', bold: false },
    { key: 'tuitionPerTerm', label: 'Tuition per Term', bold: false },
    { key: 'learningResources', label: 'Learning Resources', bold: false },
    { key: 'activityFee', label: 'Activity Fee', bold: false },
    { key: 'totalPerTerm', label: 'Total per Term', bold: true },
  ] as const

  return (
    <section
      aria-label="Tuition and fees"
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

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 font-semibold text-school-navy">
                  Fee Category
                </th>
                {tiers.map((tier) => (
                  <th key={tier.label} className="text-center py-4 px-4 font-semibold text-school-navy">
                    {tier.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-slate-100">
                  <td className="py-4 px-4 text-sm font-medium text-slate-700">
                    {row.label}
                  </td>
                  {tiers.map((tier) => (
                    <td
                      key={tier.label}
                      className={`py-4 px-4 text-center text-sm ${row.bold ? 'font-bold text-school-navy' : 'text-slate-600'}`}
                    >
                      {tier[row.key as keyof Tier] as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-school-navy">Financial Inclusions</h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <svg aria-hidden="true" className="size-5 text-school-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center gap-2 text-base font-medium text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
            href={ctaTo}
          >
            {ctaLabel}
            <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </PageContainer>
    </section>
  )
}
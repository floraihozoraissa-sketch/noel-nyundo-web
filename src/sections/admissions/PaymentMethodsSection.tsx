import { PageContainer } from '../../components/ui/PageContainer'

type PaymentMethod = {
  name: string
  accountNumber?: string
  merchantCode?: string
  accountHolder: string
  placeholder?: boolean
}

type PaymentMethodsProps = {
  title: string
  description: string
  methods: PaymentMethod[]
}

export function PaymentMethodsSection({
  title,
  description,
  methods,
}: PaymentMethodsProps) {
  return (
    <section
      aria-label="Payment methods"
      className="bg-school-bg/60 py-16 sm:py-20"
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {methods.map((method) => (
            <article
              key={method.name}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-school-navy/5">
                <span className="flex size-14 items-center justify-center rounded-full bg-school-gold/20 text-school-gold">
                  <svg aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 10h20M2 14h20" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-school-navy">
                  {method.name}
                </h3>
                {method.accountNumber && (
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p><span className="font-medium">Account Number:</span> {method.accountNumber}</p>
                    <p><span className="font-medium">Account Holder:</span> {method.accountHolder}</p>
                  </div>
                )}
                {method.merchantCode && (
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p><span className="font-medium">Merchant Code:</span> {method.merchantCode}</p>
                    <p><span className="font-medium">Account Holder:</span> {method.accountHolder}</p>
                  </div>
                )}
                {method.placeholder && (
                  <span className="mt-4 inline-block text-[10px] uppercase tracking-wide text-amber-600">
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
import { PageContainer } from '../../components/ui/PageContainer'
import { Button } from '../../components/ui/Button'

type Office = {
  label: string
  phone?: string
  email?: string
  address?: string
  placeholder?: boolean
}

type Action = {
  label: string
  to: string
}

type ContactProps = {
  title: string
  description: string
  offices: Office[]
  hours: { days: string; hours: string }[]
  actions: Action[]
}

export function ContactSection({
  title,
  description,
  offices,
  hours,
  actions,
}: ContactProps) {
  return (
    <section
      aria-label="Contact administration"
      className="bg-school-bg/60 py-16 sm:py-20"
      id="contact-info"
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {offices.map((office) => (
              <article
                key={office.label}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]"
              >
                <div className="flex aspect-[4/1] items-center justify-center bg-school-navy/5 px-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-school-navy">
                    {office.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {office.phone && (
                    <div className="flex items-center gap-3">
                      <svg aria-hidden="true" className="size-5 text-school-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {office.placeholder ? (
                        <span className="text-slate-600">{office.phone} <span className="text-[10px] uppercase tracking-wide text-amber-600 ml-1">(Unverified)</span></span>
                      ) : (
                        <a className="text-slate-600 hover:text-school-navy transition-colors" href={`tel:${office.phone}`}>
                          {office.phone}
                        </a>
                      )}
                    </div>
                  )}
                  {office.email && (
                    <div className="mt-3 flex items-center gap-3">
                      <svg aria-hidden="true" className="size-5 text-school-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {office.placeholder ? (
                        <span className="text-slate-600">{office.email} <span className="text-[10px] uppercase tracking-wide text-amber-600 ml-1">(Unverified)</span></span>
                      ) : (
                        <a className="text-slate-600 hover:text-school-navy transition-colors" href={`mailto:${office.email}`}>
                          {office.email}
                        </a>
                      )}
                    </div>
                  )}
                  {office.address && (
                    <div className="mt-3 flex items-start gap-3">
                      <svg aria-hidden="true" className="size-5 text-school-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <address className="not-italic text-slate-600">
                        {office.address}
                      </address>
                    </div>
                  )}
                  {office.placeholder && (
                    <span className="mt-4 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                      Unverified placeholder
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <div className="flex aspect-[4/1] items-center justify-center bg-school-navy/5 px-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-school-navy">
                  Office Hours
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <dl className="space-y-3">
                  {hours.map((hour) => (
                    <div key={hour.days} className="flex justify-between">
                      <dt className="text-sm font-medium text-slate-700">{hour.days}</dt>
                      <dd className="text-sm text-slate-600">{hour.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>

            <div className="flex flex-col gap-3">
              {actions.map((action) => (
                <Button key={action.label} to={action.to} className="w-full justify-start">
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
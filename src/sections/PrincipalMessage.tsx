import { PageContainer } from '../components/ui/PageContainer'

type PrincipalMessageProps = {
  name: string
  title: string
  signatureLabel: string
  body: string[]
  cta: { label: string; to: string }
  image: string
}

export function PrincipalMessage({
  name,
  title,
  signatureLabel,
  body,
  cta,
  image,
}: PrincipalMessageProps) {
  return (
    <section
      aria-label="Principal message"
      className="bg-white py-16 sm:py-20"
    >
      <PageContainer>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <img
                alt="School photograph"
                className="aspect-[4/5] w-full object-cover"
                src={image}
              />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-md bg-school-gold px-5 py-3 shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)]">
              <span className="block text-sm font-semibold text-school-navy">
                {cta.label}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight text-school-navy sm:text-5xl">
              Leading with Purpose and Prayer
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-700">
              {body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span
                className="flex size-12 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                aria-hidden="true"
              >
                <svg
                  aria-hidden="true"
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17l-5-5 1.41-1.41L11 15.17l7.59-7.59L20 9l-9 9z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-school-navy">{name}</p>
                <p className="text-sm text-slate-500">{title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              {signatureLabel}
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
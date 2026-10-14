import { PageContainer } from '../../components/ui/PageContainer'

type Document = {
  title: string
  size: string
  placeholder?: boolean
  url?: string
}

type AcademicResourcesProps = {
  title: string
  description: string
  documents: Document[]
  ctaLabel: string
  ctaTo: string
}

export function AcademicResourcesSection({
  title,
  description,
  documents,
  ctaLabel,
  ctaTo,
}: AcademicResourcesProps) {
  return (
    <section
      aria-label="Academic resources"
      className="bg-white py-16 sm:py-20"
      id="downloads"
    >
      <PageContainer>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
          <a
            className="hidden text-base font-medium text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold sm:inline-flex"
            href={ctaTo}
          >
            {ctaLabel}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <article
              key={doc.title}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_4.49px_13.47px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-school-navy/5">
                <span
                  className="flex size-14 items-center justify-center rounded-full bg-school-gold/20 text-school-gold"
                  aria-hidden="true"
                >
                  <svg
                    aria-hidden="true"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 17h10M7 12h7M9 7h6v6l-3 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-sm text-slate-500">PDF Document</span>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-school-navy">
                  {doc.title}
                </h3>
                <span className="mt-2 text-sm text-slate-500">{doc.size}</span>
                {doc.url ? (
                  <a
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-school-gold transition-colors hover:text-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                    href={doc.url}
                    download
                  >
                    Download
                    <svg
                      aria-hidden="true"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-400 cursor-not-allowed">
                    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Not available
                  </span>
                )}
                {doc.placeholder && (
                  <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
                    Unverified placeholder
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a
            className="inline-flex items-center gap-1 text-base font-medium text-school-navy"
            href={ctaTo}
          >
            {ctaLabel}
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </PageContainer>
    </section>
  )
}
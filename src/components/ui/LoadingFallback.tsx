import { PageContainer } from './PageContainer'

export function LoadingFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <PageContainer>
        <div className="max-w-sm mx-auto text-center">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full bg-school-gold/10 text-school-gold animate-pulse">
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-slate-600">
            Loading page&hellip;
          </p>
        </div>
      </PageContainer>
    </div>
  )
}
import { useParams } from 'react-router'
import { useMemo, useState } from 'react'
import { PageContainer } from '../components/ui/PageContainer'
import { Link } from 'react-router'
import { notices, noticeDetailPage } from '../data/notices'

export function NoticeDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared' | 'error'>('idle')

  const notice = useMemo(() => notices.find((n: typeof notices[number]) => n.id === id), [id])

  const handleShare = async () => {
    if (!notice) return
    const url = window.location.href
    const text = `${notice.title} - C.S. Noël Nyundo School Notice`

    if (navigator.share) {
      try {
        await navigator.share({ title: notice.title, text, url })
        setShareStatus('shared')
        setTimeout(() => setShareStatus('idle'), 2000)
        return
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          // Fall through to clipboard copy
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setShareStatus('copied')
      setTimeout(() => setShareStatus('idle'), 2000)
    } catch {
      setShareStatus('error')
      setTimeout(() => setShareStatus('idle'), 2000)
    }
  }

  if (!notice) {
    return (
      <div>
        <section aria-label="Notice not found" className="py-16 sm:py-20">
          <PageContainer>
            <div className="max-w-2xl mx-auto text-center">
              <svg
                className="mx-auto size-16 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="mt-4 text-2xl font-bold text-school-navy sm:text-3xl">
                {noticeDetailPage.notFoundTitle}
              </h1>
              <p className="mt-3 text-base text-slate-600">
                {noticeDetailPage.notFoundDescription}
              </p>
              <Link
                to="/notices"
                className="mt-6 inline-flex items-center gap-1 text-base font-medium text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {noticeDetailPage.backToNotices}
              </Link>
            </div>
          </PageContainer>
        </section>
      </div>
    )
  }

  return (
    <div>
      <section aria-label="Notice breadcrumb" className="bg-school-bg/60 py-6">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-school-navy transition-colors">
              Home
            </Link>
            <svg className="size-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link to="/notices" className="text-slate-500 hover:text-school-navy transition-colors">
              Notice Board
            </Link>
            <svg className="size-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-slate-900 truncate max-w-[300px]" aria-current="page">
              {notice.title}
            </span>
          </nav>
        </PageContainer>
      </section>

      <article aria-label={`Notice: ${notice.title}`} className="py-12 sm:py-16">
        <PageContainer>
          <div className="max-w-3xl mx-auto">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${notice.categoryColor} text-white`}>
                  {notice.categoryLabel}
                </span>
                <time className="text-sm text-slate-500" dateTime={notice.date}>
                  {notice.date}
                </time>
              </div>
              <h1 className="text-3xl font-bold leading-tight text-school-navy sm:text-4xl">
                {notice.title}
              </h1>
            </header>

            <div className="prose prose-slate max-w-none">
              <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: notice.content }} />
            </div>

            {notice.placeholder && (
              <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <strong>Unverified placeholder:</strong> This notice content has not been confirmed by the school administration.
                  Please verify all details with the school office before acting on this information.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <Link
                to="/notices"
                className="inline-flex items-center gap-1 text-base font-medium text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Notice Board
              </Link>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                  aria-label="Share this notice"
                >
                  <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="18" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="18" cy="19" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.59 13.51a5 5 0 0 1 7.41 0M8.59 17.49a9 9 0 0 1 7.41 0" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {shareStatus === 'copied' && <span className="text-xs text-green-600">Copied!</span>}
                  {shareStatus === 'shared' && <span className="text-xs text-green-600">Shared!</span>}
                  {shareStatus === 'error' && <span className="text-xs text-red-600">Failed</span>}
                  {shareStatus === 'idle' && <span>Share</span>}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                  aria-label="Print this notice"
                  onClick={() => window.print()}
                >
                  <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9V2h12v7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="6" y="14" width="12" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Print
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </article>
    </div>
  )
}

export default NoticeDetailsPage
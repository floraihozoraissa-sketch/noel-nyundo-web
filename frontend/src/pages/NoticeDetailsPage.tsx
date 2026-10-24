
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'
import {
  getNoticeBySlug,
} from '../services/noticesApi'
import { adaptNotice } from '../utils/noticeAdapter'
import type { Notice } from '../data/notices'
import { noticeDetailPage } from '../data/notices'

export function NoticeDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const [notice, setNotice] = useState<Notice | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shareMessage, setShareMessage] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadNotice() {
      if (!id) {
        setError('The notice link is missing its identifier.')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        setNotice(null)

        const apiNotice = await getNoticeBySlug(id)

        if (isActive) {
          setNotice(adaptNotice(apiNotice))
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load this notice.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadNotice()

    return () => {
      isActive = false
    }
  }, [id])

  async function handleShare() {
    const shareData = {
      title: notice?.title ?? 'School Notice',
      text: notice?.summary ?? '',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareMessage('Notice shared successfully.')
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url)
        setShareMessage('Notice link copied to clipboard.')
      } else {
        setShareMessage(
          'Sharing is not supported in this browser.',
        )
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setShareMessage('')
      } else {
        setShareMessage('Unable to share this notice.')
      }
    }
  }

  if (isLoading) {
    return (
      <PageContainer>
        <p
          className="py-16 text-center text-slate-600"
          role="status"
        >
          Loading notice...
        </p>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <div className="py-16 text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            Unable to Load Notice
          </h1>

          <p className="mt-3 text-slate-600">
            {error}
          </p>

          <Link
            to="/notices"
            className="mt-6 inline-block text-school-navy underline"
          >
            Back to Notices
          </Link>
        </div>
      </PageContainer>
    )
  }

  if (!notice) {
    return (
      <PageContainer>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            {noticeDetailPage.notFoundTitle ??
              'Notice Not Found'}
          </h1>

          <p className="mt-3 text-slate-600">
            {noticeDetailPage.notFoundDescription ??
              'The notice you are looking for may have been removed or is no longer available.'}
          </p>

          <Link
            to="/notices"
            className="mt-6 inline-block text-school-navy underline"
          >
            Back to Notices
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <article className="mx-auto max-w-4xl py-8">
        <Link
          to="/notices"
          className="inline-flex items-center text-sm font-medium text-school-navy hover:underline"
        >
          ← Back to Notices
        </Link>

        <header className="mt-6 border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium text-white ${notice.categoryColor}`}
            >
              {notice.categoryLabel}
            </span>

            <time className="text-sm text-slate-500">
              {notice.date}
            </time>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900">
            {notice.title}
          </h1>

          {notice.summary && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {notice.summary}
            </p>
          )}
        </header>

        <div className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap">
          {notice.content}
        </div>

        {notice.placeholder && (
          <p className="mt-8 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            This is placeholder content and has not been verified
            by the school.
          </p>
        )}

        <footer className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Share Notice
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Print Notice
          </button>

          {shareMessage && (
            <p
              className="w-full text-sm text-slate-600"
              role="status"
            >
              {shareMessage}
            </p>
          )}
        </footer>
      </article>
    </PageContainer>
  )
}

export default NoticeDetailsPage

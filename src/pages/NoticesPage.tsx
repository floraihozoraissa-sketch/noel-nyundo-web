import { useState, useMemo } from 'react'
import { PageContainer } from '../components/ui/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router'
import { notices, noticeCategories, noticesPage } from '../data/notices'

type Notice = typeof notices[number]

export function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredNotices = useMemo(() => {
    return notices.filter((notice: Notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || notice.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all'

  return (
    <div>
      <section aria-label="Notices page header" className="bg-school-bg/60 py-12 sm:py-16">
        <PageContainer>
          <SectionHeading title={noticesPage.title} description={noticesPage.description} />
        </PageContainer>
      </section>

      <section aria-label="Notices listing" className="py-12 sm:py-16">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  placeholder="Search notices by title, summary, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-2 focus:outline-school-gold"
                  aria-label="Search notices"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {noticeCategories.map((cat: { value: string; label: string; color: string }) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? `${cat.color} text-white`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    aria-pressed={selectedCategory === cat.value}
                  >
                    {cat.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                        ? 'bg-school-navy text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  aria-pressed={selectedCategory === 'all'}
                >
                  All
                </button>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {filteredNotices.length} of {notices.length} notice{notices.length !== 1 ? 's' : ''}
                </p>
                <Button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {filteredNotices.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Notices">
                {filteredNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <EmptyState
                hasSearch={!!searchQuery}
                hasCategory={selectedCategory !== 'all'}
                onClear={clearFilters}
              />
            )}
          </div>
        </PageContainer>
      </section>
    </div>
  )
}

function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" role="listitem">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${notice.categoryColor} text-white`}>
          {notice.categoryLabel}
        </span>
        <time className="text-xs text-slate-500" dateTime={notice.date}>
          {notice.date}
        </time>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-school-navy line-clamp-2">
          {notice.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {notice.summary}
        </p>
        <Link
          to={`/notices/${notice.id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-school-gold transition-colors hover:text-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
        >
          Read More
          <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        {notice.placeholder && (
          <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-amber-600">
            Unverified placeholder
          </span>
        )}
      </div>
    </article>
  )
}

function EmptyState({
  hasSearch,
  hasCategory,
  onClear,
}: { hasSearch: boolean; hasCategory: boolean; onClear: () => void }) {
  return (
    <div className="text-center py-16">
      <svg
        className="mx-auto size-16 text-slate-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {hasSearch || hasCategory ? 'No matching notices' : 'No notices available'}
      </h3>
      <p className="mt-2 text-slate-600">
        {hasSearch || hasCategory
          ? 'Try adjusting your search or filter criteria.'
          : 'Check back later for school announcements and updates.'}
      </p>
      {(hasSearch || hasCategory) && (
        <Button type="button" onClick={onClear} className="mt-4">
          Clear Filters
        </Button>
      )}
    </div>
  )
}
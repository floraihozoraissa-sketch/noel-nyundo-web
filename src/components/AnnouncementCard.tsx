import { Link } from 'react-router'

export type Announcement = {
  id: string
  tag: string
  tagColor: string
  date: string
  title: string
  body: string
  cta: { label: string; to: string }
  placeholder?: boolean
}

export function AnnouncementCard({
  tag,
  tagColor,
  date,
  title,
  body,
  cta,
  placeholder,
}: Announcement) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_3.53px_10.6px_0px_rgba(0,0,0,0.08)]">
      <div className="flex h-48 items-center justify-center bg-school-navy/5">
        <span
          className={`rounded px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${tagColor}`}
        >
          {tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-sm text-slate-500">{date}</span>
        <h3 className="mt-2 whitespace-pre-line text-xl font-semibold leading-snug text-school-navy">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {body}
        </p>
        <Link
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-school-gold transition-colors hover:text-school-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
          to={cta.to}
        >
          {cta.label}
          <svg
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        {placeholder && (
          <span className="mt-2 text-[10px] uppercase tracking-wide text-amber-600">
            Unverified placeholder
          </span>
        )}
      </div>
    </article>
  )
}
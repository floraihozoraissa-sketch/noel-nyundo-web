import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

type AnnouncementCardProps = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  to: string;
};

const categoryClasses: Record<string, string> = {
  'Official Notice': 'bg-primary-900 text-white',
  Academic: 'bg-secondary-600 text-white',
  Admissions: 'bg-accent-400 text-neutral-900',
};

export function AnnouncementCard({
  date,
  category,
  title,
  excerpt,
  to,
}: AnnouncementCardProps) {
  const categoryClass = categoryClasses[category] ?? 'bg-primary-900 text-white';

  return (
    <Link
      to={to}
      className="group block bg-white rounded-lg border border-neutral-200 p-4 sm:p-5 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[0.65rem] font-semibold uppercase tracking-wide ${categoryClass}`}>
          {category}
        </span>
        <span className="flex items-center gap-1.5 text-caption text-neutral-400">
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </span>
      </div>
      <h3 className="text-h4 text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-small text-neutral-500 leading-relaxed mb-5">
        {excerpt}
      </p>
      <span className="inline-flex items-center gap-1.5 text-small font-semibold text-primary-700 group-hover:text-primary-800 transition-colors">
        Read More
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

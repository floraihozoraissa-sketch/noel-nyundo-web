import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

type AnnouncementCardProps = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  to: string;
};

export function AnnouncementCard({
  date,
  category,
  title,
  excerpt,
  to,
}: AnnouncementCardProps) {
  return (
    <Link
      to={to}
      className="group block bg-white rounded-xl border border-neutral-200 p-6 transition-shadow duration-200 ease-smooth hover:shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-caption font-semibold uppercase tracking-wide">
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
      <p className="text-small text-neutral-500 leading-relaxed mb-4">
        {excerpt}
      </p>
      <span className="inline-flex items-center gap-1.5 text-small font-semibold text-primary-700 group-hover:text-primary-800 transition-colors">
        Read more
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

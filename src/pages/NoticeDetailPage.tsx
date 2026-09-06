import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PagePlaceholder
      eyebrow="Notice"
      title={`Notice #${id ?? 'Unknown'}`}
      description="[Placeholder for an individual notice or announcement. Content to be replaced with real school information.]"
    >
      <div className="space-y-4">
        <p className="text-body text-neutral-500">
          This page will display the full content of a single notice identified
          by its ID.
        </p>
        <Link
          to="/notices"
          className="inline-flex items-center gap-2 text-small font-semibold text-primary-700 hover:text-primary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all notices
        </Link>
      </div>
    </PagePlaceholder>
  );
}

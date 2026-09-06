import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function NoticesPage() {
  return (
    <PagePlaceholder
      eyebrow="News & Updates"
      title="Notices"
      description="[Placeholder for school notices, announcements, and news. Content to be replaced with real school information.]"
    >
      <p className="text-body text-neutral-500">
        This page will display a list of school notices and announcements,
        each linking to a detail page.
      </p>
    </PagePlaceholder>
  );
}

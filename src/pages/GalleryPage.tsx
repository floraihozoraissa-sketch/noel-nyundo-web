import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function GalleryPage() {
  return (
    <PagePlaceholder
      eyebrow="Campus Life"
      title="Gallery"
      description="[Placeholder for the school photo and video gallery. Content to be replaced with real school media.]"
    >
      <p className="text-body text-neutral-500">
        This page will display a grid of school photos and videos showcasing
        campus life, events, and facilities.
      </p>
    </PagePlaceholder>
  );
}

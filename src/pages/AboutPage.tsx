import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="Our Story"
      title="About Us"
      description="[Placeholder for the school's history, mission, vision, and values. Content to be replaced with real school information.]"
    >
      <p className="text-body text-neutral-500">
        This page will feature the school's history, leadership team, and
        guiding philosophy.
      </p>
    </PagePlaceholder>
  );
}

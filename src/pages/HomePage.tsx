import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function HomePage() {
  return (
    <PagePlaceholder
      eyebrow="Welcome"
      title="Home"
      description="[Placeholder for the school's homepage hero section, welcome message, and key highlights. Content to be replaced with real school information.]"
    >
      <p className="text-body text-neutral-500">
        This is the homepage route. The full landing page design will be
        implemented in a subsequent step.
      </p>
    </PagePlaceholder>
  );
}

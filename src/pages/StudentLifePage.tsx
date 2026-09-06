import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function StudentLifePage() {
  return (
    <PagePlaceholder
      eyebrow="Beyond the Classroom"
      title="Student Life"
      description="[Placeholder for extracurricular activities, clubs, and student support. Content to be replaced with real school information.]"
    >
      <p className="text-body text-neutral-500">
        This page will highlight clubs, sports, arts, and other extracurricular
        activities available to students.
      </p>
    </PagePlaceholder>
  );
}

import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function AdmissionsPage() {
  return (
    <PagePlaceholder
      eyebrow="Join Us"
      title="Admissions"
      description="[Placeholder for admissions process, requirements, and deadlines. Content to be replaced with real school information.]"
      showApplyCta
    >
      <p className="text-body text-neutral-500">
        This page will detail the admissions process, requirements, timeline,
        and a link to the online application form.
      </p>
    </PagePlaceholder>
  );
}

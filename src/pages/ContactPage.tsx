import { PagePlaceholder } from '@/components/pages/PagePlaceholder';

export function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Get in Touch"
      title="Contact Us"
      description="[Placeholder for contact information, location map, and inquiry form. Content to be replaced with real school information.]"
    >
      <p className="text-body text-neutral-500">
        This page will feature the school's contact details, a location map,
        and a contact form for inquiries.
      </p>
    </PagePlaceholder>
  );
}

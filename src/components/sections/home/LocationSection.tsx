import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';

const details = [
  {
    icon: MapPin,
    label: 'Address',
    value: '[Placeholder for school address]',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '[Placeholder for phone number]',
  },
  {
    icon: Mail,
    label: 'Email',
    value: '[Placeholder for email address]',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: '[Placeholder for office hours]',
  },
];

export function LocationSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Locate Us on Google Maps!"
          description="Find our campus and plan your visit. We welcome prospective parents and students throughout the year."
          align="center"
          className="mb-12"
        />
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-100 flex items-center justify-center min-h-[320px]">
            <div className="text-center text-neutral-400">
              <MapPin className="w-10 h-10 mx-auto mb-3" />
              <p className="text-small font-medium">[Google Maps embed placeholder]</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="bg-white rounded-xl border border-neutral-200 p-6 shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <detail.icon className="w-6 h-6 text-primary-700" />
                </div>
                <p className="text-caption font-semibold uppercase tracking-wide text-neutral-400 mb-1.5">
                  {detail.label}
                </p>
                <p className="text-body text-neutral-700">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

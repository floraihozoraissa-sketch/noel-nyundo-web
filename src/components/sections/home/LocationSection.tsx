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
    <section className="py-14 md:py-20 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Locate Us on Google Maps!"
          description="Find our campus and plan your visit. We welcome prospective parents and students throughout the year."
          align="center"
          className="mb-10"
        />
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 flex items-center justify-center min-h-[280px]">
            <div className="text-center text-neutral-400">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-small font-medium">[Google Maps embed placeholder]</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="bg-white rounded-lg border border-neutral-200 p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                  <detail.icon className="w-5 h-5 text-primary-700" />
                </div>
                <p className="text-caption font-semibold uppercase tracking-wide text-neutral-400 mb-1">
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

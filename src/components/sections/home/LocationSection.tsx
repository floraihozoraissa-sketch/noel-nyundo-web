import { MapPin } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';

export function LocationSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Locate Us on Google Maps!"
          description="Find our campus and plan your visit."
          align="left"
          className="mb-7"
        />
        <div className="rounded-xl border border-neutral-200 bg-neutral-100 flex items-center justify-center min-h-[280px] overflow-hidden">
          <div className="text-center text-neutral-400">
            <MapPin className="w-10 h-10 mx-auto mb-3" />
            <p className="text-small font-medium">[Google Maps embed placeholder]</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

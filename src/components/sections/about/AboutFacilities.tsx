import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { aboutFacilities } from '@/data/about';

export function AboutFacilities() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Our Facilities"
          title="Explore Our Campus"
          description="[Placeholder — official information about the school's facilities to be provided.]"
          align="center"
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {aboutFacilities.map((facility, i) => (
            <ImageFrame
              key={i}
              label={facility.label}
              aspect="wide"
              className="rounded-xl shadow-soft"
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-small font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            Explore Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

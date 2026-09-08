import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { aboutFacilities } from '@/data/about';

export function AboutFacilities() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Our Strengths"
          title="What Makes Us Distinctive"
          description="[Placeholder — official information about the school's facilities and programs to be provided.]"
          align="center"
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {aboutFacilities.map((facility) => (
            <div
              key={facility.title}
              className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 transition-shadow duration-200 ease-smooth hover:shadow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <facility.icon className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-h4 text-neutral-900 mb-2">{facility.title}</h3>
              <p className="text-small text-neutral-500 leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

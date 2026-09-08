import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { PillarCard } from '@/components/cards/PillarCard';
import { schoolPillars } from '@/data/homepage';

export function PillarsSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Our Core Pillars"
          title="Our Core Pillars"
          description="Three guiding principles shape every lesson, every activity, and every student at C.S. Noël Nyundo."
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {schoolPillars.map((pillar, i) => (
            <PillarCard
              key={pillar.title}
              {...pillar}
              accent={i === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { PillarCard } from '@/components/cards/PillarCard';
import { schoolPillars } from '@/data/homepage';

export function PillarsSection() {
  return (
    <section className="py-14 md:py-20 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Our Core Pillars"
          title="The Foundation of Our School"
          description="Three guiding principles shape every lesson, every activity, and every student at C.S. Noël Nyundo."
          align="center"
          className="mb-10"
        />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
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

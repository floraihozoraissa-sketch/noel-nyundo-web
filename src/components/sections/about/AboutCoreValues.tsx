import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { PillarCard } from '@/components/cards/PillarCard';
import { aboutCoreValues } from '@/data/about';

export function AboutCoreValues() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="What We Stand For"
          title="Our Core Values"
          description="Three foundational principles guide our school community — in the classroom, in worship, and in daily life."
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {aboutCoreValues.map((value, i) => (
            <PillarCard
              key={value.title}
              {...value}
              accent={i === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Cross, Award, Flag } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { PillarCard } from '@/components/cards/PillarCard';

const pillars = [
  {
    icon: Cross,
    title: 'Faith',
    description:
      '[Placeholder for a short statement about the school\'s Catholic identity and spiritual foundation.]',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      '[Placeholder for a short statement about academic and personal excellence.]',
    accent: true,
  },
  {
    icon: Flag,
    title: 'Patriotism',
    description:
      '[Placeholder for a short statement about civic responsibility and love of country.]',
  },
];

export function PillarsSection() {
  return (
    <section className="py-16 md:py-22 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Our Pillars"
          title="[Placeholder for section heading about school values]"
          description="[Placeholder for a short paragraph describing the three pillars that guide the school community.]"
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              accent={pillar.accent}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

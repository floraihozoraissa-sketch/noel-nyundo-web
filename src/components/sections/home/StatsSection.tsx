import { Container } from '@/components/layout/Container';
import { StatCard } from '@/components/cards/StatCard';
import { schoolStats } from '@/data/homepage';

export function StatsSection() {
  return (
    <section className="relative z-10 -mt-10 md:-mt-14 pb-12 md:pb-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {schoolStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

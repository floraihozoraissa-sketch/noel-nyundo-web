import { Container } from '@/components/layout/Container';
import { StatCard } from '@/components/cards/StatCard';
import { schoolStats } from '@/data/homepage';

export function StatsSection() {
  return (
    <section className="relative z-10 -mt-8 pb-10 md:-mt-10 md:pb-14">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {schoolStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

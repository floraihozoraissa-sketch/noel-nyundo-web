import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { FeatureCard } from '@/components/cards/FeatureCard';

const features = [
  {
    icon: BookOpen,
    title: '[Academic Program]',
    description:
      '[Placeholder for a short description of the academic program. Replace with real content.]',
  },
  {
    icon: Heart,
    title: '[Faith Formation]',
    description:
      '[Placeholder for a short description of faith formation and spiritual life.]',
  },
  {
    icon: Users,
    title: '[Student Life]',
    description:
      '[Placeholder for a short description of clubs, activities, and community.]',
  },
  {
    icon: GraduationCap,
    title: '[Admissions]',
    description:
      '[Placeholder for a short description of the admissions process.]',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-22 bg-white">
      <Container>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

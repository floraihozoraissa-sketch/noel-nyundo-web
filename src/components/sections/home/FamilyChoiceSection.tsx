import { Shield, BookOpen, Heart, Award } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';

const reasons = [
  {
    icon: Shield,
    title: '[Safe Environment]',
    description: '[Placeholder for a short description of the school\'s safe and caring environment.]',
  },
  {
    icon: BookOpen,
    title: '[Quality Education]',
    description: '[Placeholder for a short description of the academic curriculum and teaching.]',
  },
  {
    icon: Heart,
    title: '[Caring Community]',
    description: '[Placeholder for a short description of the school\'s supportive community.]',
  },
  {
    icon: Award,
    title: '[Character Formation]',
    description: '[Placeholder for a short description of character and values education.]',
  },
];

export function FamilyChoiceSection() {
  return (
    <section className="py-16 md:py-22 bg-primary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-30 pointer-events-none" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="[Placeholder for heading about why families choose the school]"
          description="[Placeholder for a short paragraph about what makes the school a trusted choice for families.]"
          align="center"
          className="mb-12 [&_h2]:text-white [&_p]:text-neutral-300 [&_.eyebrow]:text-accent-400"
        />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="space-y-5">
            {reasons.slice(0, 2).map((reason) => (
              <div
                key={reason.title}
                className="flex gap-4 items-start"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-800 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-h4 text-white mb-1">{reason.title}</h3>
                  <p className="text-small text-neutral-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <ImageFrame
              label="[Placeholder for central illustration]"
              aspect="square"
              className="max-w-xs mx-auto shadow-elevated"
            />
          </div>

          <div className="space-y-5">
            {reasons.slice(2).map((reason) => (
              <div
                key={reason.title}
                className="flex gap-4 items-start"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-800 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-h4 text-white mb-1">{reason.title}</h3>
                  <p className="text-small text-neutral-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

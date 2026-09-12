import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { aboutIdentityValues } from '@/data/about';

export function AboutIdentity() {
  return (
    <section className="py-16 md:py-24 bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-20 pointer-events-none" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Our Catholic Identity"
          title="Who We Are"
          description="As a Catholic school, we form the whole person — mind, heart, and spirit."
          align="center"
          className="mb-10 [&_h2]:text-white [&_p]:text-neutral-300 [&_.eyebrow]:text-accent-400"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {aboutIdentityValues.map((value) => (
            <div
              key={value.title}
              className="bg-primary-800 rounded-xl border border-primary-700 p-4 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center mx-auto mb-3">
                <value.icon className="w-5 h-5 text-accent-400" />
              </div>
              <p className="text-small font-semibold text-white">{value.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

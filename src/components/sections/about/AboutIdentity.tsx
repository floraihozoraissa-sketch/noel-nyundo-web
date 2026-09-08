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
          className="mb-12 [&_h2]:text-white [&_p]:text-neutral-300 [&_.eyebrow]:text-accent-400"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {aboutIdentityValues.map((value) => (
            <div
              key={value.title}
              className="bg-primary-800 rounded-2xl border border-primary-700 p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-h4 text-white mb-2">{value.title}</h3>
              <p className="text-small text-neutral-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { missionVision } from '@/data/about';

export function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Our Direction"
          title="Mission & Vision"
          description="The guiding purpose and aspiration that shape everything we do at C.S. Noël Nyundo."
          align="center"
          className="mb-12"
        />
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[missionVision.mission, missionVision.vision].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-soft"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary-700" />
              </div>
              <h3 className="text-h3 text-neutral-900 mb-4">{item.title}</h3>
              <p className="text-body text-neutral-500 leading-relaxed">
                {item.statement}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from '@/components/layout/Container';
import { missionVision } from '@/data/about';

export function MissionVision() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[missionVision.mission, missionVision.vision].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-neutral-200 p-7 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-700" />
                </div>
                <h3 className="text-h4 text-neutral-900">{item.title}</h3>
              </div>
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

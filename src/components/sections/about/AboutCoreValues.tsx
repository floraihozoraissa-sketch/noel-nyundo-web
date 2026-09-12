import { Container } from '@/components/layout/Container';
import { aboutCoreValues } from '@/data/about';

export function AboutCoreValues() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutCoreValues.map((value, i) => {
              const positions = [
                'lg:rounded-tl-[6rem]',
                'lg:rounded-tr-[6rem]',
                'lg:rounded-bl-[6rem]',
                'lg:rounded-br-[6rem]',
              ];
              return (
                <div
                  key={value.title}
                  className={`bg-primary-900 text-white p-6 lg:p-8 rounded-2xl ${positions[i]} min-h-[200px] flex flex-col justify-between`}
                >
                  <value.icon className="w-10 h-10 text-white mb-4" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-h4 text-white mb-2">{value.title}</h3>
                    {value.description && (
                      <p className="text-small text-neutral-300 leading-relaxed">
                        {value.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="eyebrow text-accent-600">Our Core Values</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

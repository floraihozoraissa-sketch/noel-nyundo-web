import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { familyReasons } from '@/data/homepage';

export function FamilyChoiceSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Families Choose C.S. Noël Nyundo"
          description="A nurturing community built on faith, excellence, and opportunity."
          align="center"
          className="mb-10"
        />
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">
          <div className="space-y-4">
            {familyReasons.slice(0, 2).map((reason) => (
              <div
                key={reason.title}
                className="bg-neutral-50 rounded-lg border border-neutral-200 p-5 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-h4 text-neutral-900 mb-1">{reason.title}</h3>
                  <p className="text-small text-neutral-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <ImageFrame
              label="Graduation / academic visual placeholder"
              aspect="square"
              className="max-w-[220px] lg:max-w-[260px] mx-auto shadow-card"
            />
          </div>

          <div className="space-y-4">
            {familyReasons.slice(2).map((reason) => (
              <div
                key={reason.title}
                className="bg-neutral-50 rounded-lg border border-neutral-200 p-5 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-h4 text-neutral-900 mb-1">{reason.title}</h3>
                  <p className="text-small text-neutral-500 leading-relaxed">
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

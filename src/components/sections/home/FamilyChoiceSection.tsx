import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { familyReasons } from '@/data/homepage';

export function FamilyChoiceSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Families Choose C.S. Noël Nyundo"
          description="A nurturing community built on faith, excellence, and opportunity."
          align="center"
          className="mb-12"
        />
        <div className="grid lg:grid-cols-[1fr_280px_1fr] gap-5 lg:gap-8 items-center max-w-6xl mx-auto">
          <div className="space-y-5">
            {[familyReasons[0], familyReasons[2]].map((reason) => (
              <div
                key={reason.title}
                className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 flex gap-4 items-start transition-shadow duration-200 ease-smooth hover:shadow-card"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-h4 text-neutral-900 mb-1.5">{reason.title}</h3>
                  <p className="text-small text-neutral-500 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-2">
            <ImageFrame
              label="Graduation / academic visual placeholder"
              aspect="tall"
              className="w-full max-w-[280px] mx-auto rounded-2xl shadow-elevated"
            />
          </div>

          <div className="space-y-5">
            {[familyReasons[1], familyReasons[3]].map((reason) => (
              <div
                key={reason.title}
                className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 flex gap-4 items-start transition-shadow duration-200 ease-smooth hover:shadow-card"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <reason.icon className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-h4 text-neutral-900 mb-1.5">{reason.title}</h3>
                  <p className="text-small text-neutral-500 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

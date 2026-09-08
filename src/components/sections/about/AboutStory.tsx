import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { aboutHighlights } from '@/data/about';

export function AboutStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <ImageFrame
              label="School campus photo placeholder"
              aspect="wide"
              className="rounded-2xl shadow-card"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="A Legacy of Faith and Learning"
              description="[Official school history/content to be provided. This section will describe the founding, journey, and milestones of C.S. Noël Nyundo. Replace this placeholder with the approved school narrative.]"
              align="left"
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {aboutHighlights.map((stat) => (
                <div key={stat.label} className="bg-neutral-50 rounded-xl border border-neutral-200 px-4 py-5 text-center">
                  <p className="text-h3 text-primary-900 leading-none mb-1">{stat.value}</p>
                  <p className="text-caption text-neutral-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

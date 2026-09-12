import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { aboutStoryMilestones } from '@/data/about';

export function AboutStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Our Heritage"
          title="A School Rooted in Faith and Community"
          description="[Official school history/content to be provided. This section will describe the founding, journey, and milestones of C.S. Noël Nyundo. Replace this placeholder with the approved school narrative.]"
          align="center"
          className="mb-12"
        />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          <ImageFrame
            label="School campus photo placeholder"
            aspect="wide"
            className="rounded-2xl shadow-card"
          />
          <div className="space-y-6">
            {aboutStoryMilestones.map((milestone, i) => (
              <div key={milestone.title} className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center">
                  <span className="text-white text-[0.65rem] font-bold">{i + 1}</span>
                </div>
                {i < aboutStoryMilestones.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-[-1.5rem] w-px bg-neutral-200" />
                )}
                <h3 className="text-h4 text-neutral-900 mb-1.5">{milestone.title}</h3>
                <p className="text-small text-neutral-500 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

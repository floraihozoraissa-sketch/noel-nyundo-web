import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ImageFrame } from '@/components/cards/ImageFrame';
import { leadershipTeam } from '@/data/about';

export function AboutLeadership() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="Our Leadership"
          title="Meet Our Leadership Team"
          description="[Placeholder — official leadership information to be provided by the school.]"
          align="center"
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {leadershipTeam.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-soft"
            >
              <ImageFrame
                label="Photo placeholder"
                aspect="tall"
                className="rounded-xl mb-5"
              />
              <h3 className="text-h4 text-neutral-900 mb-1">{member.name}</h3>
              <p className="text-small font-semibold text-primary-700 mb-3">{member.title}</p>
              <p className="text-small text-neutral-500 leading-relaxed mb-4">
                {member.bio}
              </p>
              <div className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-4 h-4" />
                <Phone className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

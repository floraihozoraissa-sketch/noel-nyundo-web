import { ArrowRight, PenLine } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function PrincipalMessage() {
  return (
    <section className="bg-primary-900 text-white py-16 md:py-24">
      <Container>
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-14 items-center max-w-5xl mx-auto">
          <div>
            <ImageFrame
              label="Principal photo placeholder"
              aspect="tall"
              className="rounded-xl bg-primary-800 border-primary-700"
            />
            <div className="mt-4 text-center">
              <p className="text-body font-semibold text-white">[Principal Name]</p>
              <p className="text-small text-neutral-400">[Official Title]</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent-400 mb-4">A Message from the Principal</p>
            <h2 className="text-h2 text-white mb-6">Leading with Purpose and Prayer</h2>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-5">
              [Placeholder for the principal's welcome message. This message will introduce the school's educational vision, community, and commitment to each learner.]
            </p>
            <p className="text-body text-neutral-400 leading-relaxed mb-8">
              [Placeholder for a second message paragraph that will be replaced with the approved school leadership statement.]
            </p>
            <Button as="link" to="/about" variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
              Read Full Message
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="mt-8 flex items-end gap-3 text-neutral-400">
              <PenLine className="w-8 h-8 text-accent-400" />
              <div>
                <p className="text-body font-semibold text-white">[Signature placeholder]</p>
                <p className="text-caption uppercase tracking-widest">Official signature</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

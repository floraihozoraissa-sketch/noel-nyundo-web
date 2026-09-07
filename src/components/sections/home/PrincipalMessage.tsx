import { ArrowRight, PenLine } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function PrincipalMessage() {
  return (
    <section className="bg-primary-900 text-white py-16 md:py-20">
      <Container>
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          <div>
            <ImageFrame
              label="Principal photo placeholder"
              aspect="tall"
              className="bg-primary-800 border-primary-700"
            />
            <div className="mt-3 text-center">
              <p className="text-small font-semibold text-white">[Principal Name]</p>
              <p className="text-caption text-neutral-400">Principal</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent-400 mb-3">A Message from the Principal</p>
            <h2 className="text-h2 text-white mb-5">Leading with Purpose and Prayer</h2>
            <p className="text-body text-neutral-300 leading-relaxed mb-4">
              [Placeholder for the principal\'s welcome message. This message will introduce the school\'s educational vision, community, and commitment to each learner.]
            </p>
            <p className="text-body text-neutral-300 leading-relaxed mb-7">
              [Placeholder for a second message paragraph that will be replaced with the approved school leadership statement.]
            </p>
            <Button as="link" to="/about" variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              Read Full Message
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="mt-7 flex items-end gap-3 text-neutral-400">
              <PenLine className="w-7 h-7 text-accent-400" />
              <div>
                <p className="text-small font-semibold text-white">[Signature placeholder]</p>
                <p className="text-caption uppercase tracking-widest">Official signature</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

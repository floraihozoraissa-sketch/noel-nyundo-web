import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function AboutHero() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-20 pointer-events-none" />
      <div className="container-content relative py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow text-accent-400 mb-4">About Our School</p>
            <h1 className="text-h1 md:text-display text-white mb-6 leading-[1.05]">
              Building Tomorrow's Leaders Today
            </h1>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              [Placeholder for a short introduction about C.S. Noël Nyundo — its identity, purpose, and the community it serves. To be replaced with official school content.]
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button as="link" to="/admissions/apply" size="lg">
                Apply for admission
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button as="link" to="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="relative">
            <ImageFrame
              label="School-approved photo placeholder"
              aspect="wide"
              className="rounded-2xl bg-primary-800 border-primary-700 shadow-elevated"
            />
            <div className="absolute inset-0 rounded-2xl hero-image-overlay pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

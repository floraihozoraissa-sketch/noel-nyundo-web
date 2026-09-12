import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';

export function FinalCta() {
  return (
    <section className="py-10 md:py-14 bg-neutral-50">
      <Container>
        <div className="relative overflow-hidden rounded-xl bg-primary-900 px-6 py-10 sm:px-10 md:px-14 md:py-14 text-white shadow-card">
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-28 imigongo-side pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl pr-10 sm:pr-16 lg:pr-20">
            <p className="eyebrow text-accent-400 mb-4">Admissions Open</p>
            <h2 className="text-h2 text-white mb-5">Ready to Shape Your Future?</h2>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              Join a community where faith, knowledge, and character come together. Begin your journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="link" to="/admissions/apply" size="md">
                Apply for admission
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button as="link" to="/contact" variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

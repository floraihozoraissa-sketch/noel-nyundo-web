import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';

export function FinalCta() {
  return (
    <section className="relative py-14 md:py-18 bg-primary-900 text-white overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-pattern-dots bg-pattern-sm opacity-60 pointer-events-none" />
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent-400 mb-3">Admissions</p>
          <h2 className="text-h2 text-white mb-3">Ready to Shape Your Future?</h2>
          <p className="text-body text-neutral-300 max-w-xl mb-7">
            Join a community where faith, knowledge, and character come together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button as="link" to="/admissions/apply" size="md">
              Apply for admission
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button as="link" to="/contact" variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';

export function FinalCta() {
  return (
    <section className="relative py-16 md:py-24 bg-primary-900 text-white overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-pattern-dots bg-pattern-sm opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-accent-400 opacity-80 pointer-events-none" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent-400 mb-4">Admissions Open</p>
          <h2 className="text-h2 text-white mb-5">Ready to Shape Your Future?</h2>
          <p className="text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
            Join a community where faith, knowledge, and character come together. Begin your journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button as="link" to="/admissions/apply" size="lg">
              Apply for admission
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button as="link" to="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

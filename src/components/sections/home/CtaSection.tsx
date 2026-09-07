import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/buttons/Button';

export function CtaSection() {
  return (
    <section className="relative py-16 md:py-22 bg-primary-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots bg-pattern-sm opacity-20 pointer-events-none" />
      <Container className="relative">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow text-accent-400 mb-4">Admissions Open</p>
          <h2 className="text-h2 text-white mb-5">
            [Placeholder for a call-to-action heading about applying]
          </h2>
          <p className="text-body-lg text-neutral-300 leading-relaxed mb-8">
            [Placeholder for a short paragraph encouraging prospective parents
            and students to begin the application process.]
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as="link" to="/admissions/apply" size="lg">
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button as="link" to="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

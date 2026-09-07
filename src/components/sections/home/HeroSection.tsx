import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function HeroSection() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-30 pointer-events-none" />
      <div className="container-content relative py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow text-accent-400 mb-4">Welcome to C.S. Noël Nyundo</p>
            <h1 className="text-h1 md:text-display text-white mb-5 leading-[1.04]">
              Nurturing Faith.<br />
              Inspiring Excellence.<br />
              Building Patriots.
            </h1>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-7 max-w-xl">
              Providing a holistic Catholic education that empowers students to read, write, and grow with integrity, knowledge, and service.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button as="link" to="/admissions/apply" size="md">
                Apply for admission
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button as="link" to="/about" variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10">
                Discover Our School
              </Button>
            </div>
          </div>
          <div className="relative">
            <ImageFrame
              label="Approved school hero photo placeholder"
              aspect="wide"
              className="rounded-lg bg-primary-800 border-primary-700 shadow-elevated"
            />
            <div className="absolute inset-0 rounded-lg bg-primary-900/20 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block text-neutral-400">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

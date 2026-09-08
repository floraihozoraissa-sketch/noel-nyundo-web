import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function HeroSection() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-20 pointer-events-none" />
      <div className="container-content relative py-14 md:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow text-accent-400 mb-4">Welcome to C.S. Noël Nyundo</p>
            <h1 className="text-h1 md:text-display text-white mb-6 leading-[1.04]">
              Nurturing Faith.<br />
              Inspiring Excellence.<br />
              Building Patriots.
            </h1>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              Providing a holistic Catholic education that empowers students to grow with integrity, knowledge, and service.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button as="link" to="/admissions/apply" size="lg">
                Apply for admission
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button as="link" to="/about" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Discover Our School
              </Button>
            </div>
          </div>
          <div className="relative">
            <ImageFrame
              label="School-approved hero photo placeholder"
              aspect="wide"
              className="rounded-2xl bg-primary-800 border-primary-700 shadow-elevated"
            />
            <div className="absolute inset-0 rounded-2xl hero-image-overlay pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 hidden md:block">
              <div className="bg-accent-400 text-neutral-900 rounded-xl px-5 py-4 shadow-elevated">
                <p className="font-sans font-extrabold text-h3 leading-none">50+</p>
                <p className="text-caption font-medium mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

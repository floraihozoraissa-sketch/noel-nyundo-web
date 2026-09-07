import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/buttons/Button';
import { ImageFrame } from '@/components/cards/ImageFrame';

export function HeroSection() {
  return (
    <section className="relative bg-primary-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid bg-pattern opacity-40 pointer-events-none" />

      <div className="container-content relative py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow text-accent-400 mb-5">
              [Placeholder for school motto or tagline]
            </p>
            <h1 className="text-h1 md:text-display text-white mb-6 leading-[1.05]">
              [Placeholder for homepage headline]
            </h1>
            <p className="text-body-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              [Placeholder for a short welcome paragraph introducing the school,
              its mission, and its community. This will be replaced with real
              school content.]
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button as="link" to="/admissions/apply" size="lg">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-body-lg font-semibold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
              >
                Visit Us
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-small text-neutral-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-400" />
                [Placeholder for next open day]
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-400" />
                [Placeholder for campus location]
              </span>
            </div>
          </div>

          <div className="relative">
            <ImageFrame
              label="[Placeholder for school hero photo]"
              aspect="wide"
              className="shadow-elevated"
            />
            <div className="absolute -bottom-4 -left-4 hidden md:block">
              <div className="bg-accent-400 text-neutral-900 rounded-xl px-5 py-4 shadow-elevated">
                <p className="font-sans font-extrabold text-h3 leading-none">
                  [Stat]
                </p>
                <p className="text-caption font-medium mt-1">
                  [Placeholder for label]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

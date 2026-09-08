import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type PillarCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
};

export function PillarCard({
  icon: Icon,
  title,
  description,
  accent = false,
}: PillarCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 text-center transition-transform duration-200 ease-smooth hover:-translate-y-1 ${
        accent
          ? 'bg-accent-400 text-neutral-900 shadow-elevated'
          : 'bg-white text-neutral-900 border border-neutral-200 shadow-soft'
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center ${
          accent ? 'bg-neutral-900/10' : 'bg-primary-50'
        }`}
      >
        <Icon className={`w-8 h-8 ${accent ? 'text-neutral-900' : 'text-primary-700'}`} />
      </div>
      <h3 className={`text-h3 mb-3 ${accent ? 'text-neutral-900' : 'text-neutral-900'}`}>
        {title}
      </h3>
      <p
        className={`text-body leading-relaxed mb-6 ${
          accent ? 'text-neutral-800' : 'text-neutral-500'
        }`}
      >
        {description}
      </p>
      <span
        className={`inline-flex items-center gap-1.5 text-small font-semibold transition-colors ${
          accent ? 'text-neutral-900 hover:text-neutral-700' : 'text-primary-700 hover:text-primary-800'
        }`}
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  );
}

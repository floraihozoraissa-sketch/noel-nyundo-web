import type { LucideIcon } from 'lucide-react';

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
      className={`relative rounded-xl p-8 text-center transition-transform duration-200 ease-smooth hover:-translate-y-1 ${
        accent
          ? 'bg-accent-400 text-neutral-900'
          : 'bg-primary-900 text-white'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center ${
          accent ? 'bg-neutral-900/10' : 'bg-primary-800'
        }`}
      >
        <Icon className={`w-7 h-7 ${accent ? 'text-neutral-900' : 'text-accent-400'}`} />
      </div>
      <h3 className={`text-h3 mb-3 ${accent ? 'text-neutral-900' : 'text-white'}`}>
        {title}
      </h3>
      <p
        className={`text-small leading-relaxed ${
          accent ? 'text-neutral-800' : 'text-neutral-300'
        }`}
      >
        {description}
      </p>
    </div>
  );
}

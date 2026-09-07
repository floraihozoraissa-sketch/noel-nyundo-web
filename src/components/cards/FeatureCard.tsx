import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = '',
  children,
}: FeatureCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-neutral-200 p-6 transition-shadow duration-200 ease-smooth hover:shadow-card ${className}`}
    >
      <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary-700" />
      </div>
      <h3 className="text-h4 text-neutral-900 mb-2">{title}</h3>
      <p className="text-small text-neutral-500 leading-relaxed">{description}</p>
      {children}
    </div>
  );
}

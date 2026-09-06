import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'dark';
  id?: string;
};

const backgroundClasses = {
  default: 'bg-neutral-50',
  muted: 'bg-neutral-100',
  dark: 'bg-primary-900 text-neutral-100',
};

export function Section({
  children,
  className = '',
  background = 'default',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-22 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}

import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  children,
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`${isCentered ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <p className="text-small font-semibold uppercase tracking-widest text-accent-600 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2 text-neutral-900 mb-4">{title}</h2>
      {description && (
        <p className="text-body-lg text-neutral-600 leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

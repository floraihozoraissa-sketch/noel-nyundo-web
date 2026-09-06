import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export function Card({ children, className = '', padded = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-card border border-neutral-200/60 transition-shadow duration-200 ease-smooth hover:shadow-elevated ${
        padded ? 'p-6' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

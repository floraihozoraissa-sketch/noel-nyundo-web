import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  width?: 'content' | 'narrow' | 'wide';
  className?: string;
};

const widthClasses = {
  content: 'max-w-content',
  narrow: 'max-w-narrow',
  wide: 'max-w-wide',
};

export function Container({
  children,
  width = 'content',
  className = '',
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${widthClasses[width]} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

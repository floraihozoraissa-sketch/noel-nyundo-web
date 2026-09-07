import type { ReactNode } from 'react';
import { Image } from 'lucide-react';

type ImageFrameProps = {
  label?: string;
  className?: string;
  children?: ReactNode;
  aspect?: 'video' | 'square' | 'wide' | 'tall' | 'auto';
};

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[4/3]',
  tall: 'aspect-[3/4]',
  auto: '',
};

export function ImageFrame({
  label = 'Photo placeholder',
  className = '',
  children,
  aspect = 'wide',
}: ImageFrameProps) {
  return (
    <div
      className={`relative ${aspectClasses[aspect]} w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-400">
        <Image className="w-7 h-7" />
        <span className="text-caption font-medium">{label}</span>
      </div>
      {children}
    </div>
  );
}

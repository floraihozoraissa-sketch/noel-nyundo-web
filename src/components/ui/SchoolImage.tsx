import { ImageOff } from 'lucide-react'
import { useState } from 'react'

type SchoolImageProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
}

export function SchoolImage({
  src,
  alt,
  className = 'h-full w-full object-cover',
  wrapperClassName = '',
  loading = 'lazy',
  sizes,
}: SchoolImageProps) {
  const [hasFailed, setHasFailed] = useState(false)
  const showFallback = !src || hasFailed

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${wrapperClassName}`.trim()}
    >
      {showFallback ? (
        <div
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-school-navy to-school-navy-dark p-4 text-center"
          role="img"
        >
          <ImageOff aria-hidden="true" className="size-7 text-school-gold/80" />
          <span className="text-xs font-medium leading-snug text-white/85">
            {alt}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-school-gold/80">
            Photo coming soon
          </span>
        </div>
      ) : (
        <img
          alt={alt}
          className={className}
          loading={loading}
          onError={() => setHasFailed(true)}
          sizes={sizes}
          src={src}
        />
      )}
    </div>
  )
}

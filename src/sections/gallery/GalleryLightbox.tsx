import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SchoolImage } from '../../components/ui/SchoolImage'
import type { GalleryPhoto } from '../../data/gallery'

type GalleryLightboxProps = {
  photos: GalleryPhoto[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const total = photos.length
  const current = photos[activeIndex]

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      previouslyFocused.current?.focus?.()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((activeIndex + 1) % total)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((activeIndex - 1 + total) % total)
        return
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, total, onClose, onNavigate])

  if (!current) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        aria-label={`Image viewer: ${current.alt}`}
        aria-modal="true"
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        ref={dialogRef}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
          <p className="text-sm font-medium text-school-navy">
            {activeIndex + 1} of {total}
          </p>
          <button
            aria-label="Close image viewer"
            className="grid size-10 place-items-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-school-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="relative bg-school-navy-dark">
          <SchoolImage
            alt={current.alt}
            className="max-h-[60vh] w-full object-contain"
            loading="eager"
            src={current.src}
            wrapperClassName="flex max-h-[60vh] min-h-[240px] items-center justify-center"
          />

          {total > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-school-navy shadow transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy"
                onClick={() => onNavigate((activeIndex - 1 + total) % total)}
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={24} />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-school-navy shadow transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy"
                onClick={() => onNavigate((activeIndex + 1) % total)}
                type="button"
              >
                <ChevronRight aria-hidden="true" size={24} />
              </button>
            </>
          )}
        </div>

        <div className="px-5 py-4">
          <p className="text-sm text-slate-700">{current.alt}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}

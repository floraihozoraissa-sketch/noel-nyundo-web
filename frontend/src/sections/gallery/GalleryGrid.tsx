import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { PageContainer } from '../../components/ui/PageContainer'
import { SchoolImage } from '../../components/ui/SchoolImage'
import { GalleryLightbox } from './GalleryLightbox'
import type { GalleryCategory, GalleryPhoto } from '../../data/gallery'

type GalleryGridProps = {
  categories: GalleryCategory[]
  photos: GalleryPhoto[]
  notice: string
  emptyStateTitle: string
  emptyStateDescription: string
}

export function GalleryGrid({
  categories,
  photos,
  notice,
  emptyStateTitle,
  emptyStateDescription,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos
    return photos.filter((photo) => photo.category === activeCategory)
  }, [photos, activeCategory])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setActiveIndex(null)
  }

  return (
    <section aria-label="Photo gallery" className="py-12 sm:py-16">
      <PageContainer>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            aria-pressed={activeCategory === 'all'}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold ${
              activeCategory === 'all'
                ? 'bg-school-navy text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => handleCategoryChange('all')}
            type="button"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              aria-pressed={activeCategory === category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold ${
                activeCategory === category.id
                  ? 'bg-school-navy text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <p className="mx-auto mb-8 flex max-w-2xl items-start justify-center gap-2 rounded-md bg-school-bg px-4 py-3 text-center text-sm text-slate-600">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-school-navy" />
          <span>{notice}</span>
        </p>

        {filteredPhotos.length > 0 ? (
          <div
            aria-label="Gallery images"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
            role="list"
          >
            {filteredPhotos.map((photo, index) => (
              <button
                aria-label={`Open image: ${photo.alt}`}
                className="group relative overflow-hidden rounded-lg shadow-[0_4px_12px_0px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                key={photo.id}
                onClick={() => setActiveIndex(index)}
                role="listitem"
                type="button"
              >
                <SchoolImage
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={photo.src}
                  wrapperClassName="aspect-[4/3]"
                />
                <span className="sr-only">{photo.alt}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              {emptyStateTitle}
            </h3>
            <p className="mt-2 text-slate-600">{emptyStateDescription}</p>
          </div>
        )}
      </PageContainer>

      {activeIndex !== null && (
        <GalleryLightbox
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
          photos={filteredPhotos}
        />
      )}
    </section>
  )
}

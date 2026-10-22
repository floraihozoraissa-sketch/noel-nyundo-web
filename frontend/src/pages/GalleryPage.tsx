import { PageContainer } from '../components/ui/PageContainer'
import { GalleryGrid } from '../sections/gallery/GalleryGrid'
import {
  galleryCategories,
  galleryPhotos,
  galleryPage,
} from '../data/gallery'

export function GalleryPage() {
  return (
    <div>
      <section aria-label="Gallery page header" className="bg-school-bg/60 py-12 sm:py-16">
        <PageContainer>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-school-gold">
            {galleryPage.eyebrow}
          </p>
          <h1 className="mt-2 text-[clamp(1.75rem,5vw,4rem)] font-bold leading-tight tracking-tight text-school-navy">
            {galleryPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {galleryPage.description}
          </p>
        </PageContainer>
      </section>

      <GalleryGrid
        categories={galleryCategories}
        photos={galleryPhotos}
        notice={galleryPage.imagesPendingNotice}
        emptyStateTitle={galleryPage.emptyStateTitle}
        emptyStateDescription={galleryPage.emptyStateDescription}
      />
    </div>
  )
}

export default GalleryPage
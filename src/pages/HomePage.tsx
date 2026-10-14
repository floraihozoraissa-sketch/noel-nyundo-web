import { HeroSection } from '../sections/HeroSection'
import { StatsSection } from '../sections/StatsSection'
import { PrincipalMessage } from '../sections/PrincipalMessage'
import { PillarsSection } from '../sections/PillarsSection'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { AnnouncementsSection } from '../sections/AnnouncementsSection'
import { SchoolLifeGallery } from '../sections/SchoolLifeGallery'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import { MapSection } from '../sections/MapSection'
import {
  announcements,
  finalCta,
  galleryImages,
  hero,
  mapSection,
  pillars,
  principalMessage,
  statistics,
  whyChooseCards,
} from '../data/homepage'

export function HomePage() {
  return (
    <div>
      <HeroSection {...hero} />
      <StatsSection stats={statistics} />
      <PrincipalMessage {...principalMessage} />
      <PillarsSection
        title="Our Core Pillars"
        description="The foundation of a Nyundo education rests upon three essential values that guide every lesson and activity"
        pillars={pillars}
      />
      <WhyChooseSection
        title="Why Families Choose C.S Noël Nyundo"
        description="Discover the unique advantages that make our school the preferred choice for parents in the region."
        cards={whyChooseCards}
      />
      <AnnouncementsSection
        title="Latest Announcements"
        announcements={announcements}
        viewAllLabel="View all"
        viewAllTo="/notices"
      />
      <SchoolLifeGallery
        title="School Life"
        description="A glimpse into the daily activities, vibrant community, and modern facilities that define our school."
        images={galleryImages}
        ctaLabel="Explore Full Gallery"
        ctaTo="/gallery"
      />
      <FinalCtaBanner {...finalCta} />
      <MapSection {...mapSection} />
    </div>
  )
}

export default HomePage
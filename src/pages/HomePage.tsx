import { HeroSection } from '@/components/sections/home/HeroSection';
import { FeaturesSection } from '@/components/sections/home/FeaturesSection';
import { PillarsSection } from '@/components/sections/home/PillarsSection';
import { PurposeSection } from '@/components/sections/home/PurposeSection';
import { FamilyChoiceSection } from '@/components/sections/home/FamilyChoiceSection';
import { AnnouncementsSection } from '@/components/sections/home/AnnouncementsSection';
import { SchoolLifeSection } from '@/components/sections/home/SchoolLifeSection';
import { LocationSection } from '@/components/sections/home/LocationSection';
import { CtaSection } from '@/components/sections/home/CtaSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PillarsSection />
      <PurposeSection />
      <FamilyChoiceSection />
      <AnnouncementsSection />
      <SchoolLifeSection />
      <LocationSection />
      <CtaSection />
    </>
  );
}

import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { PrincipalMessage } from '@/components/sections/home/PrincipalMessage';
import { PillarsSection } from '@/components/sections/home/PillarsSection';
import { FamilyChoiceSection } from '@/components/sections/home/FamilyChoiceSection';
import { AnnouncementsSection } from '@/components/sections/home/AnnouncementsSection';
import { SchoolLifeSection } from '@/components/sections/home/SchoolLifeSection';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { LocationSection } from '@/components/sections/home/LocationSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PrincipalMessage />
      <PillarsSection />
      <FamilyChoiceSection />
      <AnnouncementsSection />
      <SchoolLifeSection />
      <FinalCta />
      <LocationSection />
    </>
  );
}

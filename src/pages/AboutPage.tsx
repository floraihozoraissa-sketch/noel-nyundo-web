import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutStory } from '@/components/sections/about/AboutStory';
import { MissionVision } from '@/components/sections/about/MissionVision';
import { AboutCoreValues } from '@/components/sections/about/AboutCoreValues';
import { AboutIdentity } from '@/components/sections/about/AboutIdentity';
import { AboutLeadership } from '@/components/sections/about/AboutLeadership';
import { AboutFacilities } from '@/components/sections/about/AboutFacilities';
import { AboutCta } from '@/components/sections/about/AboutCta';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <MissionVision />
      <AboutCoreValues />
      <AboutIdentity />
      <AboutLeadership />
      <AboutFacilities />
      <AboutCta />
    </>
  );
}

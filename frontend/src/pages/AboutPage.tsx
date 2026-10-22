import { AboutHero } from '../sections/about/AboutHero'
import { HeritageSection } from '../sections/about/HeritageSection'
import { TimelineSection } from '../sections/about/TimelineSection'
import { MissionVisionSection } from '../sections/about/MissionVisionSection'
import { CatholicIdentitySection } from '../sections/about/CatholicIdentitySection'
import { CoreValuesSection } from '../sections/about/CoreValuesSection'
import { LeadershipSection } from '../sections/about/LeadershipSection'
import { FacilitiesSection } from '../sections/about/FacilitiesSection'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import {
  aboutFinalCta,
  aboutHero,
  catholicIdentity,
  coreValues,
  facilities,
  heritage,
  leadership,
  missionVision,
  timeline,
} from '../data/about'

export function AboutPage() {
  return (
    <div>
      <AboutHero {...aboutHero} />
      <HeritageSection
        badge={heritage.badge}
        foundingYearLabel={heritage.foundingYearLabel}
        yearsOfHistory={heritage.yearsOfHistory}
        yearsOfHistoryLabel={heritage.yearsOfHistoryLabel}
        title={heritage.title}
        placeholder={heritage.placeholder}
      />
      <TimelineSection entries={timeline} />
      <MissionVisionSection
        mission={missionVision.mission}
        vision={missionVision.vision}
      />
      <CatholicIdentitySection
        title={catholicIdentity.title}
        description={catholicIdentity.description}
        values={catholicIdentity.values}
      />
      <CoreValuesSection
        title={coreValues.title}
        description={coreValues.description}
        values={coreValues.values}
      />
      <LeadershipSection
        title="Our Leadership Team"
        description="Guided by wisdom and experience, our leaders are dedicated to maintaining the school's high standards of education and character."
        leaders={leadership}
      />
      <FacilitiesSection
        title={facilities.title}
        description={facilities.description}
        images={facilities.images}
        ctaLabel={facilities.ctaLabel}
        ctaTo={facilities.ctaTo}
      />
      <FinalCtaBanner {...aboutFinalCta} />
    </div>
  )
}

export default AboutPage
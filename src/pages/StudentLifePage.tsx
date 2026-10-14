import { StudentLifeHero } from '../sections/student-life/StudentLifeHero'
import { StudentLifeIntro } from '../sections/student-life/StudentLifeIntro'
import { StudentExperienceSection } from '../sections/student-life/StudentExperienceSection'
import { ActivityAreasSection } from '../sections/student-life/ActivityAreasSection'
import { StudentLifeFacilitiesSection } from '../sections/student-life/StudentLifeFacilitiesSection'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import {
  studentLifeHero,
  studentLifeIntro,
  studentExperience,
  activityAreas,
  studentLifeFacilities,
  studentLifeFinalCta,
} from '../data/studentLife'

export function StudentLifePage() {
  return (
    <div>
      <StudentLifeHero {...studentLifeHero} />
      <StudentLifeIntro {...studentLifeIntro} />
      <StudentExperienceSection {...studentExperience} />
      <ActivityAreasSection
        title="Student Activities and Programmes"
        description="A variety of activities help students develop their talents, build character, and live out our school values."
        areas={activityAreas}
      />
      <StudentLifeFacilitiesSection {...studentLifeFacilities} />
      <FinalCtaBanner {...studentLifeFinalCta} />
    </div>
  )
}
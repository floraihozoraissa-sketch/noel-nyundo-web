import { AcademicsHero } from '../sections/academics/AcademicsHero'
import { AcademicPhilosophySection } from '../sections/academics/AcademicPhilosophySection'
import { StandardizedExcellenceSection } from '../sections/academics/StandardizedExcellenceSection'
import { CurriculumSection } from '../sections/academics/CurriculumSection'
import { SubjectsOfferedSection } from '../sections/academics/SubjectsOfferedSection'
import { NesaResultsSection } from '../sections/academics/NesaResultsSection'
import { AlumniTestimonialSection } from '../sections/academics/AlumniTestimonial'
import { LearningFacilitiesSection } from '../sections/academics/LearningFacilitiesSection'
import { BeyondClassroomSection } from '../sections/academics/BeyondClassroomSection'
import { AcademicResourcesSection } from '../sections/academics/AcademicResourcesSection'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import {
  academicResources,
  academicsFinalCta,
  academicsHero,
  academicPhilosophy,
  alumniTestimonial,
  beyondClassroom,
  curriculumHighlights,
  continuousAssessment,
  gradeLevels,
  learningFacilities,
  nesaResults,
  subjects,
  standardizedExcellence,
} from '../data/academics'

export function AcademicsPage() {
  return (
    <div>
      <AcademicsHero {...academicsHero} />
      <AcademicPhilosophySection {...academicPhilosophy} />
      <StandardizedExcellenceSection {...standardizedExcellence} />
      <CurriculumSection
        title="Curriculum"
        highlights={curriculumHighlights}
        gradeLevels={gradeLevels}
        continuousAssessment={continuousAssessment}
      />
      <SubjectsOfferedSection
        title="Subjects Offered"
        description="A comprehensive range of core and elective subjects designed for a well-rounded education."
        subjects={subjects}
      />
      <NesaResultsSection {...nesaResults} />
      <AlumniTestimonialSection {...alumniTestimonial} />
      <LearningFacilitiesSection {...learningFacilities} />
      <BeyondClassroomSection {...beyondClassroom} />
      <AcademicResourcesSection
        title={academicResources.title}
        description={academicResources.description}
        documents={academicResources.documents}
        ctaLabel={academicResources.ctaLabel}
        ctaTo={academicResources.ctaTo}
      />
      <FinalCtaBanner {...academicsFinalCta} />
    </div>
  )
}

export default AcademicsPage
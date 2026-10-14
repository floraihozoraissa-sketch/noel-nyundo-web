import { AdmissionsHero } from '../sections/admissions/AdmissionsHero'
import { AdmissionProcessSection } from '../sections/admissions/AdmissionProcessSection'
import { GeneralRequirementsSection } from '../sections/admissions/GeneralRequirementsSection'
import { TuitionFeesSection } from '../sections/admissions/TuitionFeesSection'
import { UniformSection } from '../sections/admissions/UniformSection'
import { AcademicCalendarSection } from '../sections/admissions/AcademicCalendarSection'
import { PaymentMethodsSection } from '../sections/admissions/PaymentMethodsSection'
import { FAQSection } from '../sections/admissions/FAQSection'
import { ContactSection } from '../sections/admissions/ContactSection'
import { DownloadsSection } from '../sections/admissions/DownloadsSection'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import {
  admissionsHero,
  admissionProcess,
  generalRequirements,
  tuitionFees,
  uniform,
  academicCalendar,
  paymentMethods,
  faqs,
  contactAdmissions,
  downloads,
  admissionsFinalCta,
} from '../data/admissions'

export function AdmissionsPage() {
  return (
    <div>
      <AdmissionsHero {...admissionsHero} />
      <AdmissionProcessSection {...admissionProcess} />
      <GeneralRequirementsSection {...generalRequirements} />
      <TuitionFeesSection {...tuitionFees} />
      <UniformSection {...uniform} />
      <AcademicCalendarSection {...academicCalendar} />
      <PaymentMethodsSection {...paymentMethods} />
      <FAQSection {...faqs} />
      <ContactSection {...contactAdmissions} />
      <DownloadsSection {...downloads} />
      <FinalCtaBanner {...admissionsFinalCta} />
    </div>
  )
}

export default AdmissionsPage
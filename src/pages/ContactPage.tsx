import { ContactHero } from '../sections/contact/ContactHero'
import { ContactSection } from '../sections/admissions/ContactSection'
import { ContactFormSection } from '../sections/contact/ContactFormSection'
import { LocationSection } from '../sections/contact/LocationSection'
import { FAQSection } from '../sections/contact/FAQSection'
import { FinalCtaBanner } from '../sections/FinalCtaBanner'
import {
  contactPage,
} from '../data/contact'

export function ContactPage() {
  return (
    <div>
      <ContactHero {...contactPage.hero} />
      <ContactSection {...contactPage.contactInfo} />
      <ContactFormSection {...contactPage.form} />
      <LocationSection {...contactPage.location} />
      <FAQSection {...contactPage.faqs} />
      <FinalCtaBanner {...contactPage.finalCta} />
    </div>
  )
}

export default ContactPage
import { Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'

export function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <section aria-label="Privacy policy header" className="bg-school-bg/60 py-12 sm:py-16">
        <PageContainer>
          <SectionHeading
            title="Privacy Policy"
            description="This policy explains how C.S. Noël Nyundo School handles information collected through this website, including our admissions and contact forms. Please read it carefully."
          />
        </PageContainer>
      </section>

      <article aria-label="Privacy policy content" className="py-12 sm:py-16">
        <PageContainer>
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-sm text-amber-800">
                The admissions and contact forms on this website are <strong>frontend demos</strong>.
                No information entered is transmitted, stored, or processed by any backend system.
                The school has not yet enabled real data collection. This policy describes current
                demo behaviour and what the school should implement before enabling real submissions.
              </p>
            </div>

            <section aria-labelledby="info-collected">
              <h2 id="info-collected" className="text-2xl font-bold text-school-navy">
                Information the Forms Request
              </h2>
              <p className="mt-2 text-slate-600">
                The admissions application and contact forms ask for the following categories of
                information. These fields exist in the demo; the school should confirm which are
                required before enabling real submissions.
              </p>
              <ul className="mt-4 space-y-3 list-disc list-inside text-slate-700">
                <li>
                  <strong>Admissions application (multi-step):</strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    <li>
                      Student details: full name, date of birth, gender, nationality, religion,
                      current school and class, class applying for, residential address
                    </li>
                    <li>
                      Parent/guardian details (up to two): full names, phone numbers, email
                      addresses, occupations, employers, addresses
                    </li>
                    <li>
                      Emergency contact: name, relationship, phone number, address
                    </li>
                    <li>
                      Supporting documents (file uploads): birth certificate, previous school
                      report, immunization record, passport photos, parent/guardian ID, baptism
                      certificate (optional), transfer certificate (for Primary 2+)
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Contact form:</strong>
                  <ul className="mt-1 ml-4 list-disc space-y-1">
                    <li>Full name, email address, phone number (optional)</li>
                    <li>Subject category (Admissions, Academics, General Inquiry, Other)</li>
                    <li>Message text</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-4 text-sm text-amber-600">
                <strong>To be verified:</strong> The school administration should confirm which
                fields are mandatory and whether any additional information is required.
              </p>
            </section>

            <section aria-labelledby="demo-behaviour">
              <h2 id="demo-behaviour" className="text-2xl font-bold text-school-navy">
                Current Demo Behaviour
              </h2>
              <p className="mt-2 text-slate-600">
                All forms on this website currently operate in <strong>demo mode</strong>.
                Here is what happens when you submit a form:
              </p>
              <ul className="mt-4 space-y-3 list-disc list-inside text-slate-700">
                <li>
                  <strong>Validation runs in the browser only.</strong> Required fields,
                  email format, file types, and sizes are checked client-side.
                </li>
                <li>
                  <strong>No data is sent anywhere.</strong> There is no API endpoint,
                  database, email service, or third-party integration connected to these forms.
                </li>
                <li>
                  <strong>No data is stored.</strong> Form values exist only in your browser's
                  memory during the session. Refreshing the page clears all entered data.
                </li>
                <li>
                  <strong>No confirmation emails are sent.</strong> The "success" message
                  confirms only that browser-side validation passed.
                </li>
                <li>
                  <strong>No reference numbers are generated.</strong> The school receives no
                  notification of your submission.
                </li>
              </ul>
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <strong>Do not use these forms for real applications or urgent inquiries.</strong>
                  Contact the school directly using verified contact details from the
                  <Link to="/contact" className="text-school-gold underline">Contact page</Link>.
                </p>
              </div>
            </section>

            <section aria-labelledby="future-collection">
              <h2 id="future-collection" className="text-2xl font-bold text-school-navy">
                If Real Form Submission Is Enabled
              </h2>
              <p className="mt-2 text-slate-600">
                If the school connects these forms to a real backend, the following practices
                should be implemented before collecting personal information:
              </p>
              <ul className="mt-4 space-y-3 list-disc list-inside text-slate-700">
                <li>
                  <strong>Secure transmission:</strong> All form submissions must use HTTPS
                  with a valid TLS certificate. Form endpoints must enforce HTTPS.
                </li>
                <li>
                  <strong>Access control:</strong> Only authorised school staff should access
                  submissions. Role-based access and audit logging are recommended.
                </li>
                <li>
                  <strong>Data minimisation:</strong> Collect only the fields the school
                  genuinely needs. Remove unused optional fields.
                </li>
                <li>
                  <strong>Retention schedule:</strong> Define how long applications and contact
                  messages are kept. Delete or anonymise data after the retention period
                  expires.
                </li>
                <li>
                  <strong>Access and deletion rights:</strong> Provide a way for applicants or
                  their parents/guardians to request access to, correction of, or deletion of
                  their data, in line with applicable data protection laws.
                </li>
                <li>
                  <strong>Children's data:</strong> The admissions form collects children's
                  personal information. Obtain verifiable parental/guardian consent before
                  processing. Limit access to staff with a legitimate educational interest.
                </li>
                <li>
                  <strong>File uploads:</strong> Scan uploaded documents for malware. Restrict
                  accepted file types. Store files outside the web root with randomised names.
                </li>
                <li>
                  <strong>Incident response:</strong> Have a plan for data breaches, including
                  notification timelines and responsible staff.
                </li>
              </ul>
              <p className="mt-4 text-sm text-amber-600">
                <strong>To be verified:</strong> The school should consult its legal counsel or
                data protection officer to confirm applicable requirements (e.g., Rwanda's
                Law No. 058/2021 on Personal Data Protection and Privacy) before enabling
                real submissions.
              </p>
            </section>

            <section aria-labelledby="children-data">
              <h2 id="children-data" className="text-2xl font-bold text-school-navy">
                Children's Information and Parental Involvement
              </h2>
              <p className="mt-2 text-slate-600">
                The admissions form collects personal data about minors (students under 18).
                The following safeguards apply:
              </p>
              <ul className="mt-4 space-y-3 list-disc list-inside text-slate-700">
                <li>
                  The form is designed to be completed by a parent or legal guardian.
                </li>
                <li>
                  In the current demo, no child data leaves the browser. If real collection
                  is enabled, the school must obtain verifiable parental/guardian consent
                  before processing the child's data.
                </li>
                <li>
                  Parents/guardians should be able to review, correct, or request deletion of
                  their child's information. The school must provide a clear process for this.
                </li>
                <li>
                  Student data should only be accessible to staff with a legitimate educational
                  interest (e.g., admissions officers, class teachers, designated administrators).
                </li>
              </ul>
            </section>

            <section aria-labelledby="external-links">
              <h2 id="external-links" className="text-2xl font-bold text-school-navy">
                External Links
              </h2>
              <p className="mt-2 text-slate-600">
                This website may contain links to external resources (e.g., Google Maps for
                directions, email clients via <code>mailto:</code> links, phone diallers via
                <code>tel:</code> links). This privacy policy does not apply to third-party
                websites or services. Visitors should review the privacy policies of those
                services before providing information.
              </p>
            </section>

            <section aria-labelledby="contact-questions">
              <h2 id="contact-questions" className="text-2xl font-bold text-school-navy">
                Contact Us About Privacy
              </h2>
              <p className="mt-2 text-slate-600">
                If you have questions about this policy or the school's data practices, you can:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-slate-700">
                <li>
                  Visit the <Link to="/contact" className="text-school-gold underline">Contact page</Link>
                  (demo form; see demo notice above).
                </li>
                <li>
                  Contact the school office directly using verified contact details once
                  published. <strong>Current contact details on this website are unverified
                  placeholders and may be incorrect.</strong>
                </li>
              </ul>
            </section>

            <section aria-labelledby="policy-meta">
              <h2 id="policy-meta" className="text-2xl font-bold text-school-navy">
                Policy Information
              </h2>
              <dl className="mt-4 space-y-2 text-slate-700">
                <div>
                  <dt className="font-medium">Effective date / Last updated:</dt>
                  <dd>{lastUpdated}</dd>
                </div>
                <div>
                  <dt className="font-medium">Version:</dt>
                  <dd>1.0 (Draft — pending administrative review)</dd>
                </div>
                <div>
                  <dt className="font-medium">Status:</dt>
                  <dd>
                    This policy is a draft. The school administration must review, customise,
                    and approve it before the website collects real personal data.
                  </dd>
                </div>
              </dl>
            </section>

            <div className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Administrative Checklist</h3>
              <p className="text-sm text-slate-600 mb-3">
                Before enabling real data collection, the school administration should confirm:
              </p>
              <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
                <li>All contact details (phone, email, address) are verified and correct.</li>
                <li>Applicable data protection laws are identified and complied with.</li>
                <li>A data protection officer or responsible staff member is designated.</li>
                <li>Retention schedules for each data category are defined and documented.</li>
                <li>Incident response and breach notification procedures are in place.</li>
                <li>Parental consent mechanisms for children's data are implemented.</li>
                <li>Third-party processors (if any) have data processing agreements in place.</li>
                <li>Staff are trained on data handling procedures.</li>
              </ul>
            </div>
          </div>
        </PageContainer>
      </article>
    </div>
  )
}

export default PrivacyPage
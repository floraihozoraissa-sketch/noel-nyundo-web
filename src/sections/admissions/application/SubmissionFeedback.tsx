import { PageContainer } from '../../../components/ui/PageContainer'
import { Button } from '../../../components/ui/Button'
import { Link } from 'react-router'

type SubmissionFeedbackProps = {
  onNewApplication: () => void
}

export function SubmissionFeedback({ onNewApplication }: SubmissionFeedbackProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-12">
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-school-gold/10 text-school-gold">
            <svg className="size-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-school-navy sm:text-4xl">
            Application Submitted Successfully
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Thank you for completing the admission application for C.S. Noël Nyundo School.
          </p>

          <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-6 text-left">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <svg className="size-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Important Notice: Frontend Prototype
            </h3>
            <ul className="text-sm text-amber-800 space-y-2 list-disc list-inside">
              <li>This application has <strong>not been sent</strong> to the school administration.</li>
              <li>No data has been stored, transmitted, or processed by any backend system.</li>
              <li>No application reference number has been generated.</li>
              <li>No documents have been uploaded to or received by the school.</li>
              <li>To formally apply, please visit the school office or contact the admissions office directly.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-6 text-left">
            <h3 className="font-semibold text-slate-900 mb-3">Next Steps</h3>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
              <li>Print or save a copy of this application for your records.</li>
              <li>Contact the admissions office at <strong>+250 788 123 456</strong> or <strong>admissions@gmail.com</strong>.</li>
              <li>Submit original documents to the school office for verification.</li>
              <li>Pay the registration fee to complete the enrollment process.</li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onNewApplication} className="w-full sm:w-auto">
              Start New Application
            </Button>
            <Link to="/admissions" className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-md border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold">
              Back to Admissions Info
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Unverified placeholder: Contact details and procedures should be confirmed with the school administration.
          </p>
        </div>
      </PageContainer>
    </div>
  )
}
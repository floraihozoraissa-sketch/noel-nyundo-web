import { Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-school-navy text-white">
      <PageContainer className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">C.S. Noël Nyundo School</p>
          <p className="mt-1 text-sm text-white/75">
            Official school information will be added here.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            className="text-sm text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
            to="/contact"
          >
            Contact information coming soon
          </Link>
          <Link
            className="text-sm text-school-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
            to="/privacy"
          >
            Privacy Policy
          </Link>
        </div>
      </PageContainer>
    </footer>
  )
}

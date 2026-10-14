import { Link } from 'react-router'
import { PageContainer } from '../components/ui/PageContainer'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <PageContainer>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl font-bold text-school-navy sm:text-8xl">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-school-navy sm:text-3xl">
            Page Not Found
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/">
              Back to Home
            </Button>
            <Link
              to="/admissions"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
            >
              Admissions
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default NotFoundPage
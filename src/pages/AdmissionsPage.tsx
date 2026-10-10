import { PageContainer } from '../components/ui/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function AdmissionsPage() {
  return (
    <div>
      <PageContainer className="py-12 sm:py-16">
        <SectionHeading title="Admissions" description="Admissions information page." />
        <Card className="mt-8 max-w-3xl">
          <p className="text-slate-700">
            This page is a placeholder. Approved school content will be added in a
            later phase.
          </p>
        </Card>
      </PageContainer>
    </div>
  )
}
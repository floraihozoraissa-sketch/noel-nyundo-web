import { Card } from '../components/ui/Card'
import { PageContainer } from '../components/ui/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'

type PlaceholderPageProps = {
  title: string
  description?: string
  detail?: string
}

function PlaceholderPage({ title, description, detail }: PlaceholderPageProps) {
  return (
    <PageContainer className="py-12 sm:py-16">
      <SectionHeading title={title} description={description} />
      <Card className="mt-8 max-w-3xl">
        <p className="text-slate-700">
          This page is a placeholder. Approved school content will be added in a
          later phase.
        </p>
        {detail && <p className="mt-2 text-sm text-slate-500">{detail}</p>}
      </Card>
    </PageContainer>
  )
}

export function HomePage() {
  return <PlaceholderPage title="Home" description="C.S. Noël Nyundo School website foundation." />
}

export function GalleryPage() {
  return <PlaceholderPage title="Gallery" />
}

export function StudentLifePage() {
  return <PlaceholderPage title="Student Life" />
}

export function ContactPage() {
  return <PlaceholderPage title="Contact" />
}

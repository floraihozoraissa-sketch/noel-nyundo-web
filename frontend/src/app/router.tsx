import { createBrowserRouter } from 'react-router'
import { lazy, Suspense } from 'react'
import { SiteLayout } from '../layout/SiteLayout'
import { LoadingFallback } from '../components/ui/LoadingFallback'
const StaffLoginPage = lazy(() => import('../pages/StaffLoginPage'))

const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const AcademicsPage = lazy(() => import('../pages/AcademicsPage'))
const AdmissionsPage = lazy(() => import('../pages/AdmissionsPage'))
const AdmissionApplicationPage = lazy(() => import('../pages/AdmissionApplicationPage'))
const NoticesPage = lazy(() => import('../pages/NoticesPage'))
const NoticeDetailsPage = lazy(() => import('../pages/NoticeDetailsPage'))
const GalleryPage = lazy(() => import('../pages/GalleryPage'))
const StudentLifePage = lazy(() => import('../pages/StudentLifePage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <SuspenseWrapper><HomePage /></SuspenseWrapper> },
      { path: '/about', element: <SuspenseWrapper><AboutPage /></SuspenseWrapper> },
      { path: '/academics', element: <SuspenseWrapper><AcademicsPage /></SuspenseWrapper> },
      { path: '/admissions', element: <SuspenseWrapper><AdmissionsPage /></SuspenseWrapper> },
      { path: '/admissions/apply', element: <SuspenseWrapper><AdmissionApplicationPage /></SuspenseWrapper> },
      { path: '/notices', element: <SuspenseWrapper><NoticesPage /></SuspenseWrapper> },
      { path: '/notices/:id', element: <SuspenseWrapper><NoticeDetailsPage /></SuspenseWrapper> },
      { path: '/gallery', element: <SuspenseWrapper><GalleryPage /></SuspenseWrapper> },
      { path: '/student-life', element: <SuspenseWrapper><StudentLifePage /></SuspenseWrapper> },
      { path: '/contact', element: <SuspenseWrapper><ContactPage /></SuspenseWrapper> },
      { path: '/privacy', element: <SuspenseWrapper><PrivacyPage /></SuspenseWrapper> },
      { path: '/staff/login',  element: (<SuspenseWrapper><StaffLoginPage /></SuspenseWrapper>),},
      { path: '*', element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper> },
    ],
  },
])
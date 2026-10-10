import { createBrowserRouter } from 'react-router'
import { SiteLayout } from '../layout/SiteLayout'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { AcademicsPage } from '../pages/AcademicsPage'
import {
  AdmissionApplicationPage,
  AdmissionsPage,
  ContactPage,
  GalleryPage,
  NoticeDetailsPage,
  NoticesPage,
  StudentLifePage,
} from '../pages/PlaceholderPages'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/academics', element: <AcademicsPage /> },
      { path: '/admissions', element: <AdmissionsPage /> },
      { path: '/admissions/apply', element: <AdmissionApplicationPage /> },
      { path: '/notices', element: <NoticesPage /> },
      { path: '/notices/:id', element: <NoticeDetailsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/student-life', element: <StudentLifePage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
])

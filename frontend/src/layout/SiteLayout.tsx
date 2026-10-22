import { Outlet } from 'react-router'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-school-navy"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { PageContainer } from '../components/ui/PageContainer'
import { SiteNavigation } from '../navigation/SiteNavigation'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <header className="relative z-10 border-b border-slate-200 bg-white">
      <PageContainer className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          aria-label="C.S. Noël Nyundo School home"
          className="flex min-w-0 items-center gap-3 text-school-navy"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-md border border-school-gold bg-school-gold/15 text-xs font-semibold tracking-wide"
          >
            LOGO
          </span>
          <span className="text-sm font-semibold leading-snug sm:text-base">
            C.S. Noël Nyundo School
          </span>
        </Link>

        <div className="hidden items-center gap-4 xl:flex xl:gap-6">
          <SiteNavigation />
          <Button to="/admissions/apply">Apply Now</Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="grid size-11 shrink-0 place-items-center rounded-md border border-slate-200 text-school-navy transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy xl:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </PageContainer>

      <div
        className="border-t border-slate-200 bg-white py-4 xl:hidden"
        hidden={!isMenuOpen}
        id="mobile-navigation"
      >
        <PageContainer className="flex flex-col items-stretch gap-4">
          <SiteNavigation onNavigate={() => setIsMenuOpen(false)} />
          <Button
            className="w-full"
            to="/admissions/apply"
            onClick={() => setIsMenuOpen(false)}
          >
            Apply Now
          </Button>
        </PageContainer>
      </div>
    </header>
  )
}

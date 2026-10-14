import { PageContainer } from '../../components/ui/PageContainer'
import { MapPin, ExternalLink, Navigation } from 'lucide-react'

type LocationSectionProps = {
  title: string
  description: string
  address?: string
  coordinates?: { lat: number; lng: number }
  mapsUrl?: string
  placeholder?: boolean
}

export function LocationSection({
  title,
  description,
  address,
  coordinates,
  mapsUrl,
  placeholder,
}: LocationSectionProps) {
  const hasVerifiedLocation = Boolean(address && mapsUrl)

  return (
    <section
      aria-label="School location"
      className="bg-school-bg/60 py-16 sm:py-20"
    >
      <PageContainer>
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-school-navy">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">
            {description}
          </p>
          {placeholder && (
            <p className="mt-4 inline-block text-[10px] uppercase tracking-wide text-amber-600">
              Unverified placeholder
            </p>
          )}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-school-navy flex items-center gap-2">
                  <MapPin className="size-5 text-school-gold" aria-hidden="true" />
                  School Address
                </h3>
                {address ? (
                  <address className="mt-3 not-italic text-slate-700 leading-relaxed">
                    {address}
                  </address>
                ) : (
                  <div className="mt-3 text-center py-8 text-slate-500">
                    <MapPin className="mx-auto mb-3 size-10 text-slate-300" aria-hidden="true" />
                    <p>Exact address to be confirmed</p>
                    <p className="mt-2 text-sm">
                      Verified location details will be added once available.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-school-navy flex items-center gap-2">
                  <Navigation className="size-5 text-school-gold" aria-hidden="true" />
                  Directions
                </h3>
                {hasVerifiedLocation && mapsUrl ? (
                  <div className="mt-3 space-y-3">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-school-gold px-6 py-3 text-base font-semibold text-school-navy transition-colors hover:bg-school-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
                    >
                      <Navigation className="size-5" aria-hidden="true" />
                      Open in Google Maps
                    </a>
                    <p className="text-sm text-slate-500">
                      Opens in a new tab with driving, walking, and transit directions.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 text-center py-8 text-slate-500">
                    <ExternalLink className="mx-auto mb-3 size-10 text-slate-300" aria-hidden="true" />
                    <p>Directions will be available once the exact address is verified.</p>
                    <p className="mt-2 text-sm">
                      Please check back later or contact the school office for location details.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {coordinates && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700">Coordinates</h4>
                <p className="mt-1 text-sm font-mono text-slate-600">
                  Latitude: {coordinates.lat.toFixed(6)}, Longitude: {coordinates.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          {!hasVerifiedLocation && (
            <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-center">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> The school location shown is approximate and based on available information.
                Please verify the exact address and directions with the school office before visiting.
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  )
}
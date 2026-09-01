'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import CertificatesSkeleton from "@/components/skeletons/CertificatesSkeleton"
import ZoomableImage from "@/components/ZoomableImage"


export default function Certificates() {
  const { data, loading } = usePortfolio()

  if (loading) return <CertificatesSkeleton />
  if (!data || data.certificates.length === 0) return null

  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color">
      <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-6">
        CERTIFICATES
      </h2>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {data.certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] card-color2 rounded-2xl overflow-hidden border border-color group hover:border-blue-500 transition-all duration-300"
            >
              <div className="h-[160px] relative">
                <ZoomableImage
                  src={cert.image_url}
                  alt={cert.title || 'Certificate'}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
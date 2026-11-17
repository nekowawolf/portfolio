'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import CertificatesSkeleton from "@/components/skeletons/CertificatesSkeleton"
import CollectionTotal from "@/components/CollectionTotal"
import ZoomableImage from "@/components/ZoomableImage"


export default function Certificates() {
  const { data, loading } = usePortfolio()

  if (loading) return <CertificatesSkeleton />
  if (!data || data.certificates.length === 0) return null

  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-fill-color">
          CERTIFICATES
        </h2>
        <CollectionTotal count={data.certificates.length} title="Total certificates in this portfolio" />
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {data.certificates.map((cert, index) => (
            <div
              key={cert._id}
              className="flex-shrink-0 w-[280px] md:w-[320px] card-color2 rounded-2xl overflow-hidden border border-color group hover:border-blue-500 transition-all duration-300"
            >
              <div className="h-[160px] relative">
                <ZoomableImage
                  src={cert.image_url}
                  alt={cert.title || 'Certificate'}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                  images={data.certificates.map(c => c.image_url)}
                  currentIndex={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
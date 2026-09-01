'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import DesignsSkeleton from "@/components/skeletons/DesignsSkeleton"
import Link from "next/link"


export default function RecentDesigns() {
  const { data, loading } = usePortfolio()

  if (loading) return <DesignsSkeleton />
  if (!data || data.designs.length === 0) return null

  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color">
      <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-6">
        RECENT DESIGNS
      </h2>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {data.designs.map((design) => (
            <Link
              href={`/designs/${design._id}`}
              key={design._id}
              className="flex-shrink-0 w-[280px] md:w-[320px] card-color2 rounded-2xl overflow-hidden border border-color group hover:!border-blue-600 transition-all duration-300 block"
            >
              <div className="h-[160px] relative">
                <img
                  src={design.image_url}
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-fill-color font-bold text-lg">
                    {design.title}
                  </h3>
                  <p className="text-fill-color/60 text-sm mt-1 line-clamp-2">
                    {design.description}
                  </p>
                  {design.tools && design.tools.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      {design.tools.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="stack-chip text-[10px] font-medium">
                          {tool}
                        </span>
                      ))}
                      {design.tools.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md border border-color bg-card-color text-fill-color/70 font-bold">
                          +{design.tools.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
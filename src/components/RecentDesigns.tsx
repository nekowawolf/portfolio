'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import { FiArrowRight } from "react-icons/fi"
import DesignsSkeleton from "@/components/skeletons/DesignsSkeleton"
import Link from "next/link"
import Image from "next/image"

export default function RecentDesigns() {
  const { data } = usePortfolio()

  if (!data) return <DesignsSkeleton />

  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color">
      <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-6">
        RECENT DESIGNS
      </h2>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {data.designs.map((design) => (
            <div
              key={design.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] card-color2 rounded-2xl overflow-hidden border border-color group hover:border-blue-500 transition-all duration-300"
            >
              <div className="h-[160px] relative">
                <Image
                  src={design.image_url}
                  alt={design.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                  unoptimized
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-fill-color font-bold text-lg">
                    {design.title}
                  </h3>
                  <p className="text-fill-color/60 text-sm mt-1">
                    {design.description}
                  </p>
                  {design.tools && design.tools.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {design.tools.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="stack-chip text-[10px] font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href={`/designs/${design.id}`}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-full flex-shrink-0 ml-2 cursor-pointer"
                >
                  <FiArrowRight className="w-5 h-5 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
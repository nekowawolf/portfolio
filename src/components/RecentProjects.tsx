'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton"
import Link from "next/link"


export default function RecentProjects() {
  const { data, loading } = usePortfolio()

  if (loading) return <ProjectsSkeleton />
  if (!data || data.projects.length === 0) return null

  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color">
      <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-6">
        RECENT PROJECTS
      </h2>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {data.projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] card-color2 rounded-2xl overflow-hidden border border-color group hover:!border-blue-600 transition-all duration-300 block"
            >
              <div className="h-[160px] relative">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-fill-color font-bold text-lg">
                    {project.title}
                  </h3>
                  <p className="text-fill-color/60 text-sm mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  {project.stack && project.stack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      {project.stack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="stack-chip text-[10px] font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md border border-color bg-card-color text-fill-color/70 font-bold">
                          +{project.stack.length - 4}
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
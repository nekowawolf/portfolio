'use client'


import { usePortfolio } from "@/hooks/usePortfolio"
import SkillsSkeleton from "@/components/skeletons/SkillsSkeleton"

function TechStack({ tech }: { tech: any[] }) {
  return (
    <div className="w-full rounded-2xl border p-6 shadow card-color border-color text-fill-color">
      <h2 className="text-xl font-semibold mb-4">TECH STACK</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {tech.map((skill) => (
          <div key={skill.id} className="flex-shrink-0">
            <img
              src={skill.icon_url}
              alt={skill.name}
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function DesignTools({ design }: { design: any[] }) {
  return (
    <div className="w-full rounded-2xl border p-6 shadow card-color border-color text-fill-color">
      <h2 className="text-xl font-semibold mb-4">DESIGN TOOLS</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {design.map((skill) => (
          <div key={skill.id} className="flex-shrink-0">
            <img
              src={skill.icon_url}
              alt={skill.name}
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { data } = usePortfolio()

  if (!data) return <SkillsSkeleton />

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TechStack tech={data.skills.tech} />
      <DesignTools design={data.skills.design} />
    </div>
  )
}
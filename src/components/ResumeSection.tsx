'use client'

import { usePortfolio } from "@/hooks/usePortfolio"
import ResumeSkeleton from "@/components/skeletons/ResumeSkeleton"
import FormattedText from "@/components/FormattedText"

export default function ResumeSection() {
  const { data, loading } = usePortfolio()

  if (loading) return <ResumeSkeleton />
  if (!data) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

      {/* EXPERIENCE */}
      <div className="card-color rounded-3xl p-6 md:p-8 border border-color h-[250px] flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-4">
          EXPERIENCE
        </h2>

        <div className="overflow-y-auto pr-3 flex-grow">
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-lg font-semibold text-fill-color">
                  {exp.title}
                </h3>

                {exp.description && (
                  <FormattedText text={exp.description} className="text-fill-color/70 text-sm mt-1 whitespace-pre-line" />
                )}

                {exp.subjects && exp.subjects.length > 0 && (
                  <ul className="list-disc pl-5 text-fill-color/70 text-sm mt-2 space-y-1">
                    {exp.subjects.map((subject, idx) => (
                      <li key={idx}>{subject}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDUCATION */}
      <div className="card-color rounded-3xl p-6 md:p-8 border border-color h-[250px] flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-fill-color mb-4">
          EDUCATION
        </h2>

        <div className="overflow-y-auto pr-3 flex-grow">
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-lg font-semibold text-fill-color">
                  {edu.title}
                </h3>

                {edu.description && (
                  <FormattedText text={edu.description} className="text-fill-color/70 text-sm mt-1 whitespace-pre-line" />
                )}

                {edu.subjects && edu.subjects.length > 0 && (
                  <ul className="list-disc pl-5 text-fill-color/70 text-sm mt-2 space-y-1">
                    {edu.subjects.map((subject, idx) => (
                      <li key={idx}>{subject}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
import { getPortfolio } from "@/services/portfolioService"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiExternalLink } from "react-icons/fi"
import { FaGithub } from "react-icons/fa";
import { ProjectDetails } from "@/types/portfolio"


type Props = {
  params: Promise<{ id: string }>
}

function sanitizeUrl(u?: string) {
  if (!u) return ""
  return u.replace(/^`+|`+$/g, "").trim()
}

function normalizeScreenshots(input: any): string[] {
  if (!input) return []
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (typeof item === "string") return sanitizeUrl(item)
        if (item && typeof item === "object" && "image_url" in item) return sanitizeUrl((item as any).image_url as string)
        return ""
      })
      .filter((x) => !!x)
  }
  if (typeof input === "string") {
    const s = sanitizeUrl(input)
    if (!s) return []
    if (s.includes(",")) return s.split(",").map((x) => sanitizeUrl(x)).filter(Boolean)
    return [s]
  }
  return []
}

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

function getVideoType(url: string) {
  if (getYoutubeId(url)) return "youtube"
  if (url.includes("github.com/user-attachments/assets")) return "github"
  if (url.endsWith(".mp4") || url.endsWith(".webm")) return "direct"
  return "unknown"
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const portfolio = await getPortfolio()
  const project = portfolio.projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const hasDetails = (data?: ProjectDetails) => {
    if (!data) return false
    const img = sanitizeUrl(data.image_url)
    const desc = (data.description || "").trim()
    return !!img || !!desc
  }

  const DetailSection = ({ title, data, anchorId }: { title: string, data?: ProjectDetails, anchorId: string }) => {
    if (!hasDetails(data)) return null
    return (
      <div id={anchorId} className="space-y-4">
        <h3 className="text-xl font-bold text-fill-color border-l-4 border-blue-500 pl-3">{title}</h3>
        <div className="card-color rounded-2xl p-6 border border-color space-y-4">
          {sanitizeUrl(data?.image_url) && (
            <div className="rounded-xl overflow-hidden border border-color/30">
              <img src={sanitizeUrl(data?.image_url)} alt={title} width={800} height={600} className="w-full h-auto object-cover" />
            </div>
          )}
          <p className="text-fill-color/80 leading-relaxed whitespace-pre-line">
            {(data?.description || "").trim()}
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="body-color min-h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-6">
          <Link 
            href="/"
            className="cursor-pointer inline-flex items-center gap-2 text-fill-color/60 hover:text-fill-color transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="space-y-4">
             <h1 className="text-2xl md:text-4xl font-extrabold text-fill-color">
              {project.title}
            </h1>
            <p className="text-xl text-fill-color/80">
              {project.description}
            </p>
            
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, index) => (
                  <span 
                    key={index}
                    className="stack-chip text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {(normalizeScreenshots(project.screenshots).length || project.video_url) && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-fill-color border-l-4 border-blue-500 pl-3">Preview</h2>
            <div className="card-color rounded-2xl p-6 border border-color space-y-4">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x">

                {normalizeScreenshots(project.screenshots).map((shot, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl overflow-hidden border border-color snap-center bg-black/20 relative"
                  >
                    <img 
                      src={shot} 
                      alt={`Screenshot ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}

                {project.video_url && (
                  <div className="flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl overflow-hidden border border-color snap-center card-color2">

                    {getVideoType(project.video_url) === "youtube" && (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getYoutubeId(project.video_url)}`}
                        title="Project Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}

                    {getVideoType(project.video_url) === "github" && (
                      <video 
                        controls
                        className="w-full h-full object-contain bg-black"
                      >
                        <source src={project.video_url} />
                      </video>
                    )}

                    {getVideoType(project.video_url) === "direct" && (
                      <video 
                        controls
                        className="w-full h-full object-contain bg-black"
                      >
                        <source src={project.video_url} />
                      </video>
                    )}
                  </div>
                )}
              </div>
              {project.ss_desc && (
                <>
                  <h3 className="text-lg font-semibold text-fill-color">Project Description</h3>
                  <p className="text-fill-color/80 whitespace-pre-line">{project.ss_desc}</p>
                </>
              )}
            </div>
          </div>
        )}

        {(
          hasDetails(project.use_case) ||
          hasDetails(project.activity) ||
          hasDetails(project.erd) ||
          hasDetails(project.flowchart)
        ) && (
          <div className="grid grid-cols-1 gap-8">
            <DetailSection title="Use Case" data={project.use_case} anchorId="use-case" />
            <DetailSection title="Activity" data={project.activity} anchorId="activity" />
            <DetailSection title="ERD" data={project.erd} anchorId="erd" />
            <DetailSection title="Flowchart" data={project.flowchart} anchorId="flowchart" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-8 justify-center">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all text-sm cursor-pointer"
            >
              <FiExternalLink className="w-4 h-4" />
              Visit Project
            </a>
          )}
          
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 card-color hover:bg-white/5 text-fill-color rounded-lg font-medium transition-all text-sm cursor-pointer"
            >
              <FaGithub className="w-4 h-4" />
              View Source
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
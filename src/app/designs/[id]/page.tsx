import { getPortfolio } from "@/services/portfolioService"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FiArrowLeft, FiExternalLink } from "react-icons/fi"
import { VisualAsset } from "@/types/portfolio"
import ZoomableImage from "@/components/ZoomableImage"


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
      .map((item) => (typeof item === "string" ? sanitizeUrl(item) : ""))
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

const AssetSection = ({ title, data }: { title: string, data?: VisualAsset }) => {
  if (!data) return null
  const img = sanitizeUrl(data.image_url)
  const desc = (data.description || "").trim()
  if (!img && !desc) return null
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-fill-color border-l-4 border-blue-500 pl-3">{title}</h3>
      <div className="card-color rounded-2xl p-6 border border-color space-y-4">
        {img && (
          <div className="rounded-xl overflow-hidden">
            <ZoomableImage src={img} alt={title} imageClassName="w-full h-auto object-cover" />
          </div>
        )}
        {desc && (
          <p className="text-fill-color/80 leading-relaxed whitespace-pre-line">{desc}</p>
        )}
      </div>
    </div>
  )
}

export default async function DesignPage({ params }: Props) {
  const { id } = await params
  const portfolio = await getPortfolio()
  const design = portfolio.designs.find((d) => d._id === id)

  if (!design) {
    notFound()
  }

  return (
    <main className="body-color min-h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="space-y-6">
          <Link 
            href="/"
            className="cursor-pointer inline-flex items-center gap-2 text-fill-color/60 hover:text-fill-color transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-fill-color">
              {design.title}
            </h1>
            <p className="text-fill-color/80 text-lg">{design.description}</p>
            
            <div className="flex flex-wrap items-center gap-2">
              {design.category && (
                <span className="stack-chip text-sm font-medium">{design.category}</span>
              )}
              {design.tools && design.tools.length > 0 && (
                <>
                  {design.tools.map((tool, idx) => (
                    <span key={idx} className="stack-chip text-sm font-medium">{tool}</span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {(normalizeScreenshots(design.screenshots).length || design.video_url) && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-fill-color border-l-4 border-blue-500 pl-3">Preview</h2>
            <div className="card-color rounded-2xl p-6 border border-color space-y-4">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x">
                {normalizeScreenshots(design.screenshots).map((shot, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl overflow-hidden border border-color snap-center bg-black/20 relative"
                  >
                    <ZoomableImage 
                      src={shot} 
                      alt={`Screenshot ${index + 1}`} 
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {design.video_url && (
                  <div className="flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl overflow-hidden border border-color snap-center card-color2">
                    {getVideoType(design.video_url) === "youtube" && (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${getYoutubeId(design.video_url)}`}
                        title="Design Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    {getVideoType(design.video_url) === "github" && (
                      <video controls className="w-full h-full object-contain bg-black">
                        <source src={design.video_url} />
                      </video>
                    )}
                    {getVideoType(design.video_url) === "direct" && (
                      <video controls className="w-full h-full object-contain bg-black">
                        <source src={design.video_url} />
                      </video>
                    )}
                  </div>
                )}
              </div>
              {design.ss_desc && (
                <>
                  <h3 className="text-lg font-semibold text-fill-color">Design Description</h3>
                  <p className="text-fill-color/80 whitespace-pre-line">{design.ss_desc}</p>
                </>
              )}
            </div>
          </div>
        )}

        {(design.color_palette || design.typography) && (
          <div className="grid grid-cols-1 gap-8">
            <AssetSection title="Color Palette" data={design.color_palette} />
            <AssetSection title="Typography" data={design.typography} />
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-8 justify-center">
          {design.link && (
            <a
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all text-sm cursor-pointer"
            >
              <FiExternalLink className="w-4 h-4" />
              Visit Design
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
import { FiArrowLeft } from "react-icons/fi"

export default function ProjectDetailSkeleton() {
  const skelColor = "bg-skeleton"

  return (
    <main className="body-color min-h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-fill-color/30">
            <FiArrowLeft className="w-5 h-5" />
            <div className={`w-32 h-5 rounded-md ${skelColor}`}></div>
          </div>

          <div className="space-y-4">
             <div className={`w-2/3 h-10 md:h-12 rounded-lg ${skelColor}`}></div>
             <div className="space-y-3 pt-2">
               <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
               <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
               <div className={`w-3/4 h-4 rounded-md ${skelColor}`}></div>
             </div>
            
             <div className="flex flex-wrap gap-2 pt-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className={`w-20 h-8 rounded-md ${skelColor}`}></div>
               ))}
             </div>
          </div>
        </div>

        {/* Preview Section Skeleton */}
        <div className="space-y-4 pt-4">
          <div className={`w-40 h-8 rounded-md border-l-4 border-blue-500/50 pl-3 ${skelColor}`}></div>
          <div className="card-color rounded-2xl p-6 border border-color space-y-6">
            <div className="flex gap-4 overflow-hidden pb-4">
              <div className={`flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl ${skelColor}`}></div>
              <div className={`flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-xl hidden md:block ${skelColor}`}></div>
            </div>
            
            <div className="space-y-3">
               <div className={`w-48 h-6 rounded-md ${skelColor}`}></div>
               <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
               <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
               <div className={`w-4/5 h-4 rounded-md ${skelColor}`}></div>
            </div>
          </div>
        </div>

        {/* Detail Sections Skeleton */}
        <div className="grid grid-cols-1 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className={`w-48 h-8 rounded-md border-l-4 border-blue-500/50 pl-3 ${skelColor}`}></div>
              <div className="card-color rounded-2xl p-6 border border-color space-y-6">
                <div className={`w-full h-64 md:h-96 rounded-xl ${skelColor}`}></div>
                <div className="space-y-3">
                  <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
                  <div className={`w-full h-4 rounded-md ${skelColor}`}></div>
                  <div className={`w-3/4 h-4 rounded-md ${skelColor}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-4 pt-8 justify-center">
          <div className={`w-36 h-12 rounded-lg ${skelColor}`}></div>
          <div className={`w-36 h-12 rounded-lg ${skelColor}`}></div>
        </div>
      </div>
    </main>
  )
}
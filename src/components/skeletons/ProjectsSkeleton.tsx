export default function ProjectsSkeleton() {
  return (
    <div className="card-color rounded-3xl p-6 md:p-8 border border-color animate-pulse">
      <div className="h-6 w-48 bg-skeleton rounded mb-6" />

      <div className="flex gap-6 overflow-x-auto scrollbar-thin">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl overflow-hidden border border-color"
          >
            <div className="h-[160px] bg-skeleton" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-skeleton rounded" />
              <div className="h-3 w-full bg-skeleton rounded" />
              <div className="mt-2 flex flex-wrap gap-2">
                {[1, 2, 3].map(k => (
                  <div key={k} className="h-6 w-16 bg-skeleton rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
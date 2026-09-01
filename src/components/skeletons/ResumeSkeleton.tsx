export default function ResumeSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
      {[1, 2].map(i => (
        <div
          key={i}
          className="card-color rounded-3xl p-6 md:p-8 border border-color h-[250px]"
        >
          <div className="h-6 w-40 bg-skeleton rounded mb-4" />

          <div className="space-y-4">
            {[1, 2, 3].map(j => (
              <div key={j} className="space-y-2">
                <div className="h-4 w-3/4 bg-skeleton rounded" />
                <div className="h-3 w-full bg-skeleton rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
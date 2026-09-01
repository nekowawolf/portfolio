export default function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-stretch animate-pulse">

      {/* PFP Skeleton */}
      <div className="flex justify-center lg:justify-start">
        <div className="w-full max-w-[220px] h-[160px] lg:max-w-full lg:h-full rounded-3xl bg-skeleton" />
      </div>

      <div className="flex flex-col justify-between">

        {/* SELF SUMMARY Title */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-48 bg-skeleton rounded" />
            <div className="h-8 w-8 bg-skeleton rounded-full" />
          </div>
        </div>

        {/* About Card */}
        <div className="rounded-3xl p-6 border border-color w-full h-full card-color space-y-4">

          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-skeleton rounded" />
            <div className="h-4 w-full bg-skeleton rounded" />
            <div className="h-4 w-5/6 bg-skeleton rounded" />
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4">

            <div className="h-9 w-32 bg-skeleton rounded-lg" />

            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-5 w-5 bg-skeleton rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
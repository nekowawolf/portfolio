export default function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
      {[1, 2].map(i => (
        <div
          key={i}
          className="rounded-2xl border p-6 card-color border-color"
        >
          <div className="h-6 w-32 bg-skeleton rounded mb-4" />

          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(j => (
              <div
                key={j}
                className="w-[50px] h-[50px] bg-skeleton rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
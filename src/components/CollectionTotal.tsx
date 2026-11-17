export default function CollectionTotal({ count, title }: { count: number; title: string }) {
  return (
    <span
      role="status"
      title={title}
      className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[10px] md:text-[11px] tabular-nums bg-blue-500/10 text-blue-400 border-blue-500/20"
    >
      <span className="relative top-px">Total: {count.toLocaleString("en-US")}</span>
    </span>
  )
}
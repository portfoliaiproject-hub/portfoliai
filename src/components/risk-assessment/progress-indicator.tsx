export default function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div aria-label="Progress" className="mb-6">
      <div className="mb-1 text-xs text-gray-500">{pct}% complete</div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}



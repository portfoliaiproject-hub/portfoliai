export default function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-white/10 p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description && <p className="mb-4 text-sm text-white/70">{description}</p>}
      {action}
    </div>
  )
}







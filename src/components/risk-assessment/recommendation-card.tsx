export default function RecommendationCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <h5 className="mb-1 font-semibold">{title}</h5>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  )
}







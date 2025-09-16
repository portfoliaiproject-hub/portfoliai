export default function LoadingSpinner({ size = 20 }: { size?: number }) {
  const border = Math.max(2, Math.round(size / 10))
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size, borderWidth: border }}
      className="inline-block animate-spin rounded-full border-white/20 border-t-blue-500"
    />
  )
}







export default function StatusIndicator({ label, tone = 'green' }: { label: string; tone?: 'green' | 'blue' }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${tone === 'green' ? 'bg-green-500' : 'bg-blue-500'}`} aria-hidden="true" />
      {label}
    </span>
  )
}

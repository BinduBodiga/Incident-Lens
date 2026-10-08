import Card from './Card'

export default function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <div className="label">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </Card>
  )
}

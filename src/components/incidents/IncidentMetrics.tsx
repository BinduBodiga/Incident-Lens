import type { Metric } from '../../types/incident'
import MetricCard from '../common/MetricCard'

export default function IncidentMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {metrics.map((m) => (
        <MetricCard key={m.label} label={m.label} value={m.value} />
      ))}
    </div>
  )
}

import type { Incident } from '../../types/incident'
import Badge, { severityTone } from '../common/Badge'
import Card from '../common/Card'

export default function IncidentHeader({ incident }: { incident: Incident }) {
  return (
    <Card className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <b>{incident.id}</b>
        <Badge tone={severityTone(incident.severity)}>{incident.severity}</Badge>
        <Badge tone={incident.status === 'ACTIVE' ? 'blue' : 'green'}>{incident.status}</Badge>
        <span className="text-[15px] font-semibold">{incident.title}</span>
      </div>
      <div className="mt-1 text-muted">
        {incident.service}
        {incident.startedAt !== '—' && ` · Started ${incident.startedAt}`} · Duration {incident.duration}
      </div>
    </Card>
  )
}

import { ArrowRight } from 'lucide-react'
import type { Incident } from '../../types/incident'
import Badge, { severityTone } from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'
import IncidentMetrics from './IncidentMetrics'

export default function IncidentCard({ incident, onInvestigate }: { incident: Incident; onInvestigate: () => void }) {
  return (
    <Card accent="red">
      <div className="flex flex-wrap items-center gap-2">
        <b>{incident.id}</b>
        <Badge tone={severityTone(incident.severity)}>{incident.severity}</Badge>
        <Badge tone="blue">{incident.status}</Badge>
        <span className="ml-auto text-muted">Started {incident.startedAt}</span>
      </div>
      <h2 className="mb-0.5 mt-2 text-base font-semibold">{incident.title}</h2>
      <div className="text-muted">
        {incident.service} · Signal: {incident.signal}
      </div>
      <div className="my-3">
        <IncidentMetrics metrics={incident.metrics} />
      </div>
      <Button onClick={onInvestigate}>
        Investigate <ArrowRight size={14} aria-hidden="true" />
      </Button>
    </Card>
  )
}

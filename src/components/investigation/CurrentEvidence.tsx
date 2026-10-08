import type { Incident } from '../../types/incident'
import Card from '../common/Card'
import IncidentMetrics from '../incidents/IncidentMetrics'

export default function CurrentEvidence({ incident }: { incident: Incident }) {
  return (
    <section id="evidence" className="mb-4">
      <h3 className="label mb-2">Current Evidence</h3>
      <IncidentMetrics metrics={incident.metrics} />
      <Card className="mt-3">
        Signal: <b>{incident.signal}</b>
      </Card>
    </section>
  )
}

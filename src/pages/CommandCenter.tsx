import { useNavigate } from 'react-router-dom'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import MetricCard from '../components/common/MetricCard'
import IncidentCard from '../components/incidents/IncidentCard'
import PageContainer from '../components/layout/PageContainer'
import { useMemory } from '../hooks/useMemory'
import * as incidentService from '../services/incidentService'

const LOOP = ['INVESTIGATE', 'RESOLVE', 'CONFIRM', 'REMEMBER', 'LEARN', 'INVESTIGATE BETTER']

export default function CommandCenter() {
  const navigate = useNavigate()
  const { summary } = useMemory()
  const incident = incidentService.getActiveIncident()

  return (
    <PageContainer title="Command Center" subtitle="Monitor active incidents and investigate using organizational memory.">
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Active Incidents" value={summary.activeCount} />
        <MetricCard label="Historical Incidents" value={summary.historicalCount} />
        <MetricCard label="Learned Patterns" value={summary.patternCount} />
        <MetricCard label="Hindsight Memories" value={summary.memoryCount} />
      </div>
      <h3 className="label mb-2">Active Incident</h3>
      {incident.status === 'ACTIVE' ? (
        <IncidentCard incident={incident} onInvestigate={() => navigate('/investigate?incident=INC-104')} />
      ) : (
        <Card accent="green">
          <b>INC-104</b> <Badge tone="green">RESOLVED</Badge> — added to organizational memory. No active incidents.
        </Card>
      )}
      <h3 className="label mb-2 mt-4">Memory Demo</h3>
      <Card>
        <p className="mb-3 mt-0 text-muted">See how organizational memory changes the same investigation.</p>
        <div className="flex flex-wrap items-center gap-2">
          {LOOP.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <Badge tone={i === LOOP.length - 1 ? 'green' : i >= 3 ? 'blue' : 'gray'}>{s}</Badge>
              {i < LOOP.length - 1 && <span className="text-muted">→</span>}
            </span>
          ))}
        </div>
        <Button variant="ghost" className="mt-3" onClick={() => navigate('/learning')}>View Learning Progression</Button>
      </Card>
    </PageContainer>
  )
}

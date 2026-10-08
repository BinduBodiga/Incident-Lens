import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IncidentHistoryTable from '../components/incidents/IncidentHistory'
import PageContainer from '../components/layout/PageContainer'
import { useMemory } from '../hooks/useMemory'
import * as incidentService from '../services/incidentService'

const SEVERITIES = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW']

export default function IncidentHistory() {
  useMemory() // re-render when INC-104 is reviewed
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('ALL')
  const q = query.trim().toLowerCase()
  const incidents = incidentService
    .getHistory()
    .filter((i) => (severity === 'ALL' || i.severity === severity) && (!q || [i.id, i.title, i.service, i.rootCause].join(' ').toLowerCase().includes(q)))

  return (
    <PageContainer title="Incident History" subtitle="Past and current incidents with root cause and confirmation state.">
      <div className="mb-3 flex flex-wrap gap-2">
        <input className="input max-w-xs" type="search" placeholder="Filter incidents..." aria-label="Filter incidents" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input !w-auto" aria-label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          {SEVERITIES.map((s) => (<option key={s}>{s}</option>))}
        </select>
      </div>
      <IncidentHistoryTable incidents={incidents} onOpen={(id) => navigate(`/investigate?incident=${id}`)} />
    </PageContainer>
  )
}

import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import EmptyState from '../components/common/EmptyState'
import IncidentHeader from '../components/incidents/IncidentHeader'
import PageContainer from '../components/layout/PageContainer'
import CurrentEvidence from '../components/investigation/CurrentEvidence'
import HindsightRecall from '../components/investigation/HindsightRecall'
import InvestigationNav from '../components/investigation/InvestigationNav'
import InvestigationReport from '../components/investigation/InvestigationReport'
import InvestigatorFeedback from '../components/investigation/InvestigatorFeedback'
import LearnedPattern from '../components/investigation/LearnedPattern'
import MemoryUpdated from '../components/investigation/MemoryUpdated'
import MemoryModal from '../components/memory/MemoryModal'
import { ACTIVE_INCIDENT_ID, INC104_ROOT_CAUSE } from '../data/incidents'
import { useInvestigation } from '../hooks/useInvestigation'
import { useMemory } from '../hooks/useMemory'
import * as incidentService from '../services/incidentService'
import { INVESTIGATION_STEPS } from '../services/investigationService'
import type { HistoricalMemory } from '../types/memory'

export default function Investigate() {
  const [params, setParams] = useSearchParams()
  const id = params.get('incident') ?? ACTIVE_INCIDENT_ID
  const mem = useMemory()
  const feedback = mem.getFeedback(ACTIVE_INCIDENT_ID)
  const reviewed = Boolean(feedback)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const incident = useMemo(() => incidentService.getIncident(id), [id, reviewed])
  const [inspected, setInspected] = useState<HistoricalMemory | null>(null)
  const isActive = id === ACTIVE_INCIDENT_ID
  const inv = useInvestigation(isActive ? incident : undefined, reviewed)

  const selector = (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="incident-select" className="text-muted">Incident</label>
      <select
        id="incident-select"
        className="input !w-auto"
        value={id}
        onChange={(e) => setParams({ incident: e.target.value })}
      >
        {incidentService.getHistory().map((i) => (
          <option key={i.id} value={i.id}>{i.id} — {i.title}</option>
        ))}
      </select>
    </div>
  )

  let body
  if (!incident) {
    body = <EmptyState title="Incident not found">Select another incident from the list above.</EmptyState>
  } else if (!isActive) {
    body = (
      <>
        <IncidentHeader incident={incident} />
        <Card>
          <div className="mb-2 flex gap-2"><Badge tone="green">RESOLVED</Badge><Badge tone="green">CONFIRMED</Badge></div>
          <div>Root cause: {incident.rootCause}</div>
          <div>Context: {incident.context}</div>
          <div>Resolution: {incident.resolution}</div>
          <p className="mb-0 mt-3 text-muted">Historical incident — recorded outcome. Select INC-104 to run an investigation.</p>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <InvestigationNav />
        <IncidentHeader incident={incident} />
        <CurrentEvidence incident={incident} />
        {inv.phase === 'idle' && (
          <Card className="py-7 text-center">
            <h2 className="m-0 text-base font-semibold">Ready to investigate</h2>
            <p className="mb-4 mt-1 text-muted">Analyze current evidence and recall relevant organizational memory for INC-104.</p>
            <Button onClick={inv.run}>Run Investigation</Button>
          </Card>
        )}
        {inv.phase === 'running' && (
          <Card className="fade-in" role="status">
            <div className="flex items-center gap-2 font-semibold"><Loader2 size={15} className="animate-spin" aria-hidden="true" />Investigating…</div>
            <div className="my-2 h-1.5 overflow-hidden rounded bg-line">
              <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(inv.step + 1) * 25}%` }} />
            </div>
            <div className="text-muted">{INVESTIGATION_STEPS[inv.step]}</div>
          </Card>
        )}
        {inv.phase === 'failed' && (
          <Card>
            <b>No confident hypothesis could be generated.</b>
            <div className="mb-3 mt-1 text-muted">Current evidence did not match any recalled organizational memory.</div>
            <Button onClick={inv.run}>Rerun</Button>
          </Card>
        )}
        {inv.phase === 'done' && inv.result && (
          <>
            <HindsightRecall matches={inv.result.historicalMatches} onInspect={setInspected} />
            <InvestigationReport result={inv.result} onRerun={inv.run} />
            <InvestigatorFeedback
              feedback={feedback}
              onConfirm={() => mem.confirm(incident)}
              onCorrect={(d, n) => mem.correct(incident, d, n)}
            />
            {feedback && (
              <>
                <MemoryUpdated feedback={feedback} aiDiagnosis={INC104_ROOT_CAUSE} />
                {feedback.type === 'confirmed' && (
                  <LearnedPattern
                    pattern={mem.patterns[0]}
                    memoryCount={mem.summary.memoryCount}
                    correctionCount={mem.summary.correctionCount}
                  />
                )}
              </>
            )}
          </>
        )}
      </>
    )
  }

  return (
    <PageContainer title="AI Investigation" subtitle="Investigate the incident using current evidence and organizational memory.">
      {selector}
      {body}
      {inspected && <MemoryModal memory={inspected} onClose={() => setInspected(null)} />}
    </PageContainer>
  )
}

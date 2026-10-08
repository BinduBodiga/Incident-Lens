import type { HistoricalMemory } from '../../types/memory'
import Badge from '../common/Badge'
import Card from '../common/Card'

interface Props {
  memory: HistoricalMemory
  onInspect?: (memory: HistoricalMemory) => void
}

export default function MemoryCard({ memory: m, onInspect }: Props) {
  const body = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <b>{m.incidentId}</b>
        {m.similarity !== null && <Badge tone="blue">{m.similarity}% SIMILAR</Badge>}
        {m.confirmed && <Badge tone="green">CONFIRMED</Badge>}
        {m.corrected && <Badge tone="amber">HUMAN-CORRECTED</Badge>}
      </div>
      <div className="my-1.5 font-semibold">{m.title}</div>
      <div className="text-muted">Root Cause: <span className="text-slate-200">{m.rootCause}</span></div>
      <div className="text-muted">Context: {m.context}</div>
      <div className="text-muted">
        Resolution: {m.resolution}
        {m.resolvedIn !== null && ` · Resolved in ${m.resolvedIn} minutes`}
      </div>
    </>
  )
  if (!onInspect) return <Card>{body}</Card>
  return (
    <Card className="p-0 transition-colors hover:border-slate-600">
      <button className="block w-full p-4 text-left" onClick={() => onInspect(m)} aria-label={`Inspect ${m.incidentId}`}>
        {body}
      </button>
    </Card>
  )
}

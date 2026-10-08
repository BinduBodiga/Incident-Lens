import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { HistoricalMemory } from '../../types/memory'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'

export default function MemoryModal({ memory: m, onClose }: { memory: HistoricalMemory; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <Card className="w-full max-w-md" role="dialog" aria-modal="true" aria-label={`${m.incidentId} details`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <b>{m.incidentId}</b>
          {m.confirmed && <Badge tone="green">CONFIRMED</Badge>}
          <Button variant="ghost" className="ml-auto !px-2" onClick={onClose} aria-label="Close">
            <X size={14} />
          </Button>
        </div>
        <h2 className="my-2 text-base font-semibold">{m.title}</h2>
        <dl className="grid grid-cols-[110px_1fr] gap-y-1">
          <dt className="text-muted">Root Cause</dt><dd>{m.rootCause}</dd>
          <dt className="text-muted">Context</dt><dd>{m.context}</dd>
          <dt className="text-muted">Resolution</dt><dd>{m.resolution}</dd>
          {m.resolvedIn !== null && (<><dt className="text-muted">Resolved in</dt><dd>{m.resolvedIn} minutes</dd></>)}
          {m.similarity !== null && (<><dt className="text-muted">Similarity</dt><dd>{m.similarity}% to current incident</dd></>)}
          {m.aiRootCause && (<><dt className="text-muted">AI diagnosis</dt><dd>{m.aiRootCause}</dd></>)}
          {m.notes && (<><dt className="text-muted">Notes</dt><dd>{m.notes}</dd></>)}
        </dl>
      </Card>
    </div>
  )
}

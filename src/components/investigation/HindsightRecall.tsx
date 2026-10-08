import type { HistoricalMemory } from '../../types/memory'
import HistoricalMatchCard from './HistoricalMatchCard'

export default function HindsightRecall({ matches, onInspect }: { matches: HistoricalMemory[]; onInspect: (m: HistoricalMemory) => void }) {
  return (
    <div className="fade-in">
      <section id="recall" className="mb-2">
        <h3 className="label mb-1">Hindsight Recall</h3>
        <p className="mb-2 text-muted">Previous incidents that may help explain the current incident.</p>
        <b>{matches.length} relevant memories found</b>
      </section>
      <section id="matches" className="mb-4 mt-2 grid gap-3 md:grid-cols-3" aria-label="Historical Matches">
        {matches.map((m) => (
          <HistoricalMatchCard key={m.incidentId} memory={m} onInspect={onInspect} />
        ))}
      </section>
    </div>
  )
}

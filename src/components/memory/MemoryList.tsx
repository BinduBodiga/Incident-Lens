import type { HistoricalMemory } from '../../types/memory'
import EmptyState from '../common/EmptyState'
import MemoryCard from './MemoryCard'

interface Props {
  memories: HistoricalMemory[]
  onInspect: (memory: HistoricalMemory) => void
}

export default function MemoryList({ memories, onInspect }: Props) {
  if (memories.length === 0) return <EmptyState title="No memories found">Try a different search.</EmptyState>
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {memories.map((m) => (
        <MemoryCard key={m.incidentId} memory={m} onInspect={onInspect} />
      ))}
    </div>
  )
}

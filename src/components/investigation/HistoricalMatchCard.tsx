import type { HistoricalMemory } from '../../types/memory'
import MemoryCard from '../memory/MemoryCard'

export default function HistoricalMatchCard({ memory, onInspect }: { memory: HistoricalMemory; onInspect: (m: HistoricalMemory) => void }) {
  return <MemoryCard memory={memory} onInspect={onInspect} />
}

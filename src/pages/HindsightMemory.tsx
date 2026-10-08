import { useState } from 'react'
import PageContainer from '../components/layout/PageContainer'
import MemoryList from '../components/memory/MemoryList'
import MemoryModal from '../components/memory/MemoryModal'
import { useMemory } from '../hooks/useMemory'
import type { HistoricalMemory } from '../types/memory'

export default function HindsightMemory() {
  const { memories } = useMemory()
  const [query, setQuery] = useState('')
  const [inspected, setInspected] = useState<HistoricalMemory | null>(null)
  const q = query.trim().toLowerCase()
  const filtered = memories.filter(
    (m) => !q || [m.incidentId, m.title, m.rootCause, m.context, m.resolution].join(' ').toLowerCase().includes(q),
  )
  // Newly confirmed INC-104 is listed first.
  const ordered = [...filtered].sort((a, b) => Number(b.incidentId === 'INC-104') - Number(a.incidentId === 'INC-104'))

  return (
    <PageContainer title="Hindsight Memory" subtitle="Organizational memories IncidentLens can recall.">
      <input
        className="input mb-4 max-w-sm"
        type="search"
        placeholder="Search memories..."
        aria-label="Search memories"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <MemoryList memories={ordered} onInspect={setInspected} />
      {inspected && <MemoryModal memory={inspected} onClose={() => setInspected(null)} />}
    </PageContainer>
  )
}

import type { HistoricalMemory } from '../types/memory'
import { HISTORICAL_INCIDENTS } from './incidents'

/** Every historical incident is a confirmed organizational memory. */
export const SEED_MEMORIES: HistoricalMemory[] = HISTORICAL_INCIDENTS.map((i) => ({
  incidentId: i.id,
  similarity: null,
  title: i.title,
  rootCause: i.rootCause,
  context: i.context,
  resolution: i.resolution,
  resolvedIn: i.resolvedIn,
  confirmed: i.confirmed,
}))

/** Deterministic relevance of memories to an incident (demo values, not ML output). */
export const RELEVANCE: Record<string, { incidentId: string; similarity: number }[]> = {
  'INC-104': [
    { incidentId: 'INC-031', similarity: 96 },
    { incidentId: 'INC-052', similarity: 89 },
    { incidentId: 'INC-083', similarity: 84 },
  ],
}

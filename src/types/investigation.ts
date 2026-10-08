import type { HistoricalMemory } from './memory'

export interface InvestigationResult {
  incidentId: string
  rootCause: string
  description: string
  confidence: number
  evidence: string[]
  recommendations: string[]
  historicalMatches: HistoricalMemory[]
}

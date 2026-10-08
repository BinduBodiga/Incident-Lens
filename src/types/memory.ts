export interface HistoricalMemory {
  incidentId: string
  similarity: number | null
  title: string
  rootCause: string
  context: string
  resolution: string
  resolvedIn: number | null
  confirmed: boolean
  corrected?: boolean
  aiRootCause?: string
  notes?: string
}

export interface Feedback {
  incidentId: string
  type: 'confirmed' | 'corrected'
  correctedDiagnosis?: string
  notes?: string
  timestamp: number
}

import type { HistoricalMemory } from './memory'

export interface LearningPattern {
  id: string
  steps: string[]
  rootCause: string
  confirmedCount: number
  successfulCount: number
}

export interface LearningEvent {
  text: string
  timestamp: number | null
}

export interface LearningSummary {
  activeCount: number
  historicalCount: number
  patternCount: number
  memoryCount: number
  correctionCount: number
}

export interface LearningProgress {
  historicalCount: number
  patternCount: number
  initialConfidence: number
  recall: HistoricalMemory[]
  currentConfidence: number
}

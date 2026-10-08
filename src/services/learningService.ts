import { ACTIVE_INCIDENT, ACTIVE_INCIDENT_ID, HISTORICAL_INCIDENTS } from '../data/incidents'
import { BASE_PATTERNS, CURRENT_CONFIDENCE, INITIAL_CONFIDENCE, SEED_EVENTS } from '../data/patterns'
import type { LearningEvent, LearningPattern, LearningProgress, LearningSummary } from '../types/learning'
import { getFeedback, getRelevantMemories, getStoredEvents, getStoredMemories } from './memoryService'

export function getPatterns(): LearningPattern[] {
  const confirmed = getFeedback(ACTIVE_INCIDENT_ID)?.type === 'confirmed'
  return BASE_PATTERNS.map((p) =>
    p.id === 'PAT-01' && confirmed
      ? { ...p, confirmedCount: p.confirmedCount + 1, successfulCount: p.successfulCount + 1 }
      : p,
  )
}

export function getSummary(): LearningSummary {
  const stored = getStoredMemories()
  return {
    activeCount: getFeedback(ACTIVE_INCIDENT_ID) ? 0 : 1,
    historicalCount: HISTORICAL_INCIDENTS.length + stored.length,
    patternCount: BASE_PATTERNS.length,
    memoryCount: HISTORICAL_INCIDENTS.length + stored.length,
    correctionCount: stored.filter((m) => m.corrected).length,
  }
}

export const getEvents = (): LearningEvent[] => [
  ...getStoredEvents(),
  ...SEED_EVENTS.map((text) => ({ text, timestamp: null })),
]

export function getLearningProgress(): LearningProgress {
  return {
    historicalCount: getSummary().historicalCount,
    patternCount: BASE_PATTERNS.length,
    initialConfidence: INITIAL_CONFIDENCE,
    recall: getRelevantMemories(ACTIVE_INCIDENT),
    currentConfidence: CURRENT_CONFIDENCE,
  }
}

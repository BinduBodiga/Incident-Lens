import { ACTIVE_INCIDENT_ID, INC104_ROOT_CAUSE } from '../data/incidents'
import { RELEVANCE, SEED_MEMORIES } from '../data/memories'
import type { Incident } from '../types/incident'
import type { LearningEvent } from '../types/learning'
import type { Feedback, HistoricalMemory } from '../types/memory'
import { clear, load, save } from './storage'

const MEMORIES = 'memories'
const FEEDBACK = 'feedback'
const EVENTS = 'learning_events'

export const getStoredMemories = (): HistoricalMemory[] => load<HistoricalMemory[]>(MEMORIES, [])
export const getAllMemories = (): HistoricalMemory[] => [...SEED_MEMORIES, ...getStoredMemories()]
export const getStoredEvents = (): LearningEvent[] => load<LearningEvent[]>(EVENTS, [])
export const getAllFeedback = (): Feedback[] => load<Feedback[]>(FEEDBACK, [])
export const getFeedback = (incidentId: string): Feedback | undefined =>
  getAllFeedback().find((f) => f.incidentId === incidentId)


/** Deterministic recall: seeded memories ranked by their demo relevance to the incident. */
export function getRelevantMemories(incident: Incident): HistoricalMemory[] {
  const rel = RELEVANCE[incident.id] ?? []

  return rel
    .flatMap((r) => {
      const m = SEED_MEMORIES.find((s) => s.incidentId === r.incidentId)

      return m
        ? [{ ...m, similarity: r.similarity }]
        : []
    })
    .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
}

function record(incident: Incident, memory: HistoricalMemory, feedback: Feedback, event: string): void {
  save(MEMORIES, [...getStoredMemories().filter((m) => m.incidentId !== incident.id), memory])
  save(FEEDBACK, [...getAllFeedback().filter((f) => f.incidentId !== incident.id), feedback])
  save(EVENTS, [{ text: event, timestamp: feedback.timestamp }, ...getStoredEvents().filter((e) => !e.text.startsWith(incident.id))])
}

export function confirmIncident(incident: Incident): void {
  const timestamp = Date.now()
  record(
    incident,
    {
      incidentId: incident.id, similarity: null, title: incident.title, rootCause: INC104_ROOT_CAUSE,
      context: incident.context, resolution: 'Rollback deployment', resolvedIn: null, confirmed: true,
    },
    { incidentId: incident.id, type: 'confirmed', timestamp },
    `${incident.id} added to organizational memory`,
  )
}

export function correctIncident(incident: Incident, correctedDiagnosis: string, notes: string): void {
  const cause = correctedDiagnosis.trim()
  if (!cause) throw new Error('Corrected root cause is required')
  const timestamp = Date.now()
  record(
    incident,
    {
      incidentId: incident.id, similarity: null, title: incident.title, rootCause: cause,
      context: incident.context, resolution: 'Per engineer correction', resolvedIn: null, confirmed: true,
      corrected: true, aiRootCause: INC104_ROOT_CAUSE, notes: notes.trim(),
    },
    { incidentId: incident.id, type: 'corrected', correctedDiagnosis: cause, notes: notes.trim(), timestamp },
    `${incident.id} added to organizational memory — human-corrected`,
  )
}

export const resetMemory = (): void => clear([MEMORIES, FEEDBACK, EVENTS])
export const isActiveIncident = (id: string): boolean => id === ACTIVE_INCIDENT_ID

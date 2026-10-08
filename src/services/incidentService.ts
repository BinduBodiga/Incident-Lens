import { ACTIVE_INCIDENT, ACTIVE_INCIDENT_ID, HISTORICAL_INCIDENTS } from '../data/incidents'
import type { Incident } from '../types/incident'
import { getFeedback, getStoredMemories } from './memoryService'

/** INC-104 reflects stored feedback: once reviewed it becomes a resolved, confirmed incident. */
export function getActiveIncident(): Incident {
  if (!getFeedback(ACTIVE_INCIDENT_ID)) return ACTIVE_INCIDENT
  const mem = getStoredMemories().find((m) => m.incidentId === ACTIVE_INCIDENT_ID)
  return {
    ...ACTIVE_INCIDENT,
    status: 'RESOLVED',
    confirmed: true,
    rootCause: mem?.rootCause ?? ACTIVE_INCIDENT.rootCause,
    resolution: mem?.resolution ?? ACTIVE_INCIDENT.resolution,
  }
}

export const getHistory = (): Incident[] => [getActiveIncident(), ...HISTORICAL_INCIDENTS]

export const getIncident = (id: string): Incident | undefined => getHistory().find((i) => i.id === id)

export function search(query: string): Incident[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return getHistory().filter((i) => [i.id, i.title, i.service, i.rootCause].join(' ').toLowerCase().includes(q))
}

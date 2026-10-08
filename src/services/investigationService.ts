import { CURRENT_CONFIDENCE } from '../data/patterns'
import { INC104_ROOT_CAUSE } from '../data/incidents'
import type { Incident } from '../types/incident'
import type { InvestigationResult } from '../types/investigation'
import { getRelevantMemories } from './memoryService'

export const INVESTIGATION_STEPS = [
  'Analyzing current evidence...',
  'Recalling relevant incidents...',
  'Comparing historical outcomes...',
  'Generating investigation hypothesis...',
]

/** Deterministic mock investigation. Replace with a real backend call later. */
export async function runInvestigation(incident: Incident): Promise<InvestigationResult | null> {
  const db = parseInt(incident.metrics.find((m) => m.label === 'DB Connections')?.value ?? '0', 10)
  const recentDeploy = incident.metrics.some((m) => m.label === 'Recent Deployment')
  const poolExhausted = incident.signal.toLowerCase().includes('pool')
  const matches = getRelevantMemories(incident)
  if (!(db >= 90 && recentDeploy && poolExhausted && matches.length > 0)) return null
  return {
    incidentId: incident.id,
    rootCause: INC104_ROOT_CAUSE,
    description: 'Evidence suggests a repeat of a known deployment-related connection pattern.',
    confidence: CURRENT_CONFIDENCE,
    evidence: [
      'Database connections above 90%',
      'Deployment occurred shortly before incident',
      'Error matches previous incidents',
      'Three relevant historical incidents show the same pattern',
      'Previous rollback successfully resolved those incidents',
    ],
    recommendations: [
      'Inspect the latest deployment’s database connection handling.',
      'Compare connection lifecycle with INC-031.',
      'Check for unclosed database connections.',
      'Consider rollback if the connection leak is confirmed.',
    ],
    historicalMatches: matches,
  }
}

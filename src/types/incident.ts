export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type IncidentStatus = 'ACTIVE' | 'RESOLVED'

export interface Metric {
  label: string
  value: string
}

export interface Incident {
  id: string
  title: string
  severity: Severity
  status: IncidentStatus
  service: string
  startedAt: string
  duration: string
  metrics: Metric[]
  signal: string
  rootCause: string
  context: string
  resolution: string
  resolvedIn: number | null
  confirmed: boolean
}

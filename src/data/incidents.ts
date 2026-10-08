import type { Incident, Severity } from '../types/incident'

export const ACTIVE_INCIDENT_ID = 'INC-104'
export const INC104_ROOT_CAUSE = 'Database connection leak following recent deployment'

export const ACTIVE_INCIDENT: Incident = {
  id: ACTIVE_INCIDENT_ID,
  title: 'Database Connection Failure',
  severity: 'CRITICAL',
  status: 'ACTIVE',
  service: 'Payment API',
  startedAt: '10:05 AM',
  duration: '12 minutes',
  signal: 'Connection pool exhausted',
  rootCause: 'Under investigation',
  context: 'Recent deployment',
  resolution: '—',
  resolvedIn: null,
  confirmed: false,
  metrics: [
    { label: 'Error Rate', value: '31%' },
    { label: 'API Latency', value: '8.7 sec' },
    { label: 'DB Connections', value: '94%' },
    { label: 'CPU', value: '72%' },
    { label: 'Recent Deployment', value: '12 min ago' },
  ],
}

// NOTE: the first three are from the reference demo. The remaining seven are
// placeholders created only to reach 10 historical incidents; replace them
// if the original data is recovered.
type Row = [string, string, Severity, string, string, string, string, number]
const rows: Row[] = [
  ['INC-031', 'Database Connection Failure', 'CRITICAL', 'Payment API', 'Database connection leak', 'Recent deployment', 'Rollback deployment', 7],
  ['INC-052', 'Database Saturation', 'HIGH', 'Orders API', 'Database connection leak', 'Recent deployment', 'Rollback deployment', 11],
  ['INC-083', 'Database Connection Failure', 'CRITICAL', 'Payment API', 'Database connection leak', 'Recent deployment', 'Rollback deployment', 8],
  ['INC-012', 'Cache Stampede', 'HIGH', 'Catalog API', 'Cache expiry storm', 'Cron job overlap', 'Stagger TTLs', 14],
  ['INC-019', 'Elevated 5xx on Gateway', 'MEDIUM', 'API Gateway', 'Bad config push', 'Config change', 'Revert config', 9],
  ['INC-024', 'Queue Backlog', 'MEDIUM', 'Notification Service', 'Consumer crash loop', 'Dependency upgrade', 'Pin dependency', 22],
  ['INC-040', 'Slow Search Queries', 'LOW', 'Search API', 'Missing index', 'Schema migration', 'Add index', 31],
  ['INC-061', 'Disk Pressure on Node', 'HIGH', 'Ingest Worker', 'Log volume growth', 'Verbose logging', 'Rotate logs', 18],
  ['INC-070', 'TLS Certificate Expiry', 'CRITICAL', 'Edge Proxy', 'Expired certificate', 'None', 'Renew certificate', 6],
  ['INC-095', 'Memory Pressure', 'MEDIUM', 'Auth Service', 'Heap growth', 'Feature release', 'Raise limit and patch', 27],
]

export const HISTORICAL_INCIDENTS: Incident[] = rows.map(
  ([id, title, severity, service, rootCause, context, resolution, resolvedIn]) => ({
    id, title, severity, service, rootCause, context, resolution, resolvedIn,
    status: 'RESOLVED' as const,
    startedAt: '—',
    duration: `${resolvedIn} minutes`,
    metrics: [],
    signal: '—',
    confirmed: true,
  }),
)

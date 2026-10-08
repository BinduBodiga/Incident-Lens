import type { LearningPattern } from '../types/learning'

/** PAT-01 starts at 3 confirmed; confirming INC-104 makes it 4 confirmed / 4 successful. */
export const BASE_PATTERNS: LearningPattern[] = [
  {
    id: 'PAT-01',
    steps: ['Deployment', 'DB connections >90%', 'Connection pool exhaustion'],
    rootCause: 'Database connection leak',
    confirmedCount: 3,
    successfulCount: 3,
  },
  { id: 'PAT-02', steps: ['Config change', '5xx spike'], rootCause: 'Bad config push', confirmedCount: 2, successfulCount: 2 },
  { id: 'PAT-03', steps: ['Cron overlap', 'Cache expiry'], rootCause: 'Cache expiry storm', confirmedCount: 1, successfulCount: 1 },
  { id: 'PAT-04', steps: ['Schema migration', 'Slow queries'], rootCause: 'Missing index', confirmedCount: 1, successfulCount: 1 },
]

export const SEED_EVENTS: string[] = [
  'INC-031 stored in memory — Pool exhaustion',
  'INC-052 stored in memory — Leaked connections',
  'Stored in organizational memory: INC-083',
]

export const INITIAL_CONFIDENCE = 52
export const CURRENT_CONFIDENCE = 89

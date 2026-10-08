import type { ReactNode } from 'react'
import type { Severity } from '../../types/incident'

export type Tone = 'red' | 'green' | 'blue' | 'amber' | 'gray'

const TONES: Record<Tone, string> = {
  red: 'border-red-900 bg-red-950 text-red-300',
  green: 'border-green-800 bg-green-950 text-green-300',
  blue: 'border-blue-800 bg-blue-950 text-blue-300',
  amber: 'border-amber-800 bg-amber-950 text-amber-300',
  gray: 'border-line text-muted',
}

export const severityTone = (s: Severity): Tone =>
  s === 'CRITICAL' ? 'red' : s === 'HIGH' ? 'amber' : s === 'MEDIUM' ? 'blue' : 'gray'

export default function Badge({ tone = 'gray', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block rounded border px-1.5 py-px text-[10px] font-semibold tracking-wider ${TONES[tone]}`}>
      {children}
    </span>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { INVESTIGATION_STEPS, runInvestigation } from '../services/investigationService'
import type { Incident } from '../types/incident'
import type { InvestigationResult } from '../types/investigation'

export type Phase = 'idle' | 'running' | 'done' | 'failed'

/** Runs the deterministic investigation with a short staged loading state. */
export function useInvestigation(incident: Incident | undefined, autoRestore: boolean) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<InvestigationResult | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const incidentId = incident?.id

  useEffect(() => () => window.clearInterval(timer.current), [])

  useEffect(() => {
    window.clearInterval(timer.current)
    setPhase('idle')
    setResult(null)
    setStep(0)
  }, [incidentId])

  // After a refresh, a reviewed incident shows its report again without re-running.
  useEffect(() => {
    if (!autoRestore || !incident || phase !== 'idle') return
    runInvestigation(incident).then((r) => {
      if (r) {
        setResult(r)
        setPhase('done')
      }
    })
  }, [autoRestore, incident, phase])

  const run = useCallback(() => {
    if (!incident) return
    window.clearInterval(timer.current)
    setPhase('running')
    setStep(0)
    let s = 0
    timer.current = window.setInterval(() => {
      s += 1
      if (s < INVESTIGATION_STEPS.length) {
        setStep(s)
        return
      }
      window.clearInterval(timer.current)
      runInvestigation(incident)
        .then((r) => {
          setResult(r)
          setPhase(r ? 'done' : 'failed')
        })
        .catch(() => setPhase('failed'))
    }, 600)
  }, [incident])

  return { phase, step, result, run }
}

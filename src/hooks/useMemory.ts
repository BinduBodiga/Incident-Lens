import { useCallback, useEffect, useState } from 'react'
import * as learningService from '../services/learningService'
import * as memoryService from '../services/memoryService'
import { CHANGE_EVENT } from '../services/storage'
import type { Incident } from '../types/incident'

/** Subscribes to storage changes and exposes memory/learning state plus actions. */
export function useMemory() {
  const [, setVersion] = useState(0)
  useEffect(() => {
    const onChange = () => setVersion((v) => v + 1)
    window.addEventListener(CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CHANGE_EVENT, onChange)
  }, [])

  const confirm = useCallback((incident: Incident) => memoryService.confirmIncident(incident), [])
  const correct = useCallback(
    (incident: Incident, diagnosis: string, notes: string) => memoryService.correctIncident(incident, diagnosis, notes),
    [],
  )
  const reset = useCallback(() => memoryService.resetMemory(), [])

  return {
    memories: memoryService.getAllMemories(),
    events: learningService.getEvents(),
    patterns: learningService.getPatterns(),
    summary: learningService.getSummary(),
    getFeedback: memoryService.getFeedback,
    confirm,
    correct,
    reset,
  }
}

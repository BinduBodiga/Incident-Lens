import { useState } from 'react'
import type { Feedback } from '../../types/memory'
import Button from '../common/Button'
import Card from '../common/Card'

interface Props {
  feedback: Feedback | undefined
  onConfirm: () => void
  onCorrect: (diagnosis: string, notes: string) => void
}

export default function InvestigatorFeedback({ feedback, onConfirm, onCorrect }: Props) {
  const [correcting, setCorrecting] = useState(false)
  const [diagnosis, setDiagnosis] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const save = () => {
    if (!diagnosis.trim()) {
      setError('Enter a corrected root cause.')
      return
    }
    try {
      onCorrect(diagnosis, notes)
      setCorrecting(false)
      setError('')
    } catch {
      setError('Could not save the correction. Please try again.')
    }
  }

  return (
    <Card id="feedback" className="mb-4">
      <h3 className="label mb-2">Investigator Feedback</h3>
      <b>Was the AI diagnosis correct?</b>
      <p className="mb-3 mt-1 text-muted">Confirm or correct the investigation. Your decision becomes future organizational memory.</p>
      {feedback ? (
        <div className="text-muted">
          Feedback recorded: {feedback.type === 'corrected' ? 'Human-corrected diagnosis' : 'Diagnosis confirmed'}.
        </div>
      ) : correcting ? (
        <div className="max-w-lg">
          <label htmlFor="corrected" className="text-muted">Corrected Root Cause</label>
          <input id="corrected" className="input mb-2 mt-1" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g. Connection pool misconfiguration" />
          <label htmlFor="notes" className="text-muted">Correction Notes (optional)</label>
          <textarea id="notes" rows={2} className="input mb-2 mt-1" value={notes} onChange={(e) => setNotes(e.target.value)} />
          {error && <div role="alert" className="mb-2 text-red-300">{error}</div>}
          <div className="flex gap-2">
            <Button variant="success" onClick={save}>Save Correction</Button>
            <Button variant="ghost" onClick={() => setCorrecting(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="success" onClick={onConfirm}>Confirm Diagnosis</Button>
          <Button variant="ghost" onClick={() => setCorrecting(true)}>Correct Diagnosis</Button>
        </div>
      )}
    </Card>
  )
}

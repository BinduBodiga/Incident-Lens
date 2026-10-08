import { ArrowDown } from 'lucide-react'
import type { Feedback } from '../../types/memory'
import Card from '../common/Card'
import StatusIndicator from '../common/StatusIndicator'

const Step = ({ children }: { children: string }) => (
  <div className="min-w-[230px] rounded-md border border-line bg-side px-4 py-1.5 text-center">{children}</div>
)

export default function MemoryUpdated({ feedback, aiDiagnosis }: { feedback: Feedback; aiDiagnosis: string }) {
  const corrected = feedback.type === 'corrected'
  return (
    <Card id="memory-updated" accent="green" className="fade-in mb-4">
      <b className="tracking-widest text-green-300"><StatusIndicator label="MEMORY UPDATED" /></b>
      <p className="mb-1 mt-2">INC-104 has been added to organizational memory.</p>
      <p className="m-0 text-muted">Future investigations can now retrieve this confirmed outcome.</p>
      <div className="mt-3 flex flex-col items-center gap-1 text-muted">
        <Step>AI recommendation</Step>
        <ArrowDown size={14} aria-hidden="true" />
        <Step>{corrected ? 'Human correction' : 'Human confirmation'}</Step>
        <ArrowDown size={14} aria-hidden="true" />
        <Step>Organizational memory</Step>
      </div>
      {corrected && (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Card><div className="label">AI Diagnosis</div>{aiDiagnosis}</Card>
          <Card className="!border-amber-800">
            <div className="label">Human-Corrected Diagnosis</div>
            {feedback.correctedDiagnosis}
            {feedback.notes && <div className="mt-1 text-muted">Notes: {feedback.notes}</div>}
          </Card>
        </div>
      )}
    </Card>
  )
}

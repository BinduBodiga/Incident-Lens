import { ArrowDown } from 'lucide-react'
import type { LearningProgress } from '../../types/learning'
import LearningStage from './LearningStage'

export default function LearningProgression({ progress: p }: { progress: LearningProgress }) {
  const arrow = <ArrowDown size={16} className="mx-auto text-muted" aria-hidden="true" />
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-1.5">
      <LearningStage stage={1} title="INITIAL INVESTIGATION">
        {p.historicalCount} historical incidents available<br />
        {p.patternCount} learned patterns
        <div className="label mt-2">Confidence</div>
        <div className="text-2xl font-semibold">{p.initialConfidence}%</div>
      </LearningStage>
      {arrow}
      <LearningStage stage={2} title="HINDSIGHT RECALL">
        {p.recall.length} highly relevant memories
        <table className="mt-1 w-full">
          <tbody>
            {p.recall.map((m) => (
              <tr key={m.incidentId}>
                <td className="py-0.5">{m.incidentId}</td>
                <td className="py-0.5 text-right">{m.similarity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LearningStage>
      {arrow}
      <LearningStage stage={3} title="CURRENT INVESTIGATION">
        Known connection-leak pattern<br />
        Evidence strengthened by prior outcomes
        <div className="label mt-2">Confidence</div>
        <div className="text-2xl font-semibold text-green-500">{p.currentConfidence}%</div>
      </LearningStage>
    </div>
  )
}

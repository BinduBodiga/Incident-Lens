import { ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { LearningPattern } from '../../types/learning'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'

interface Props {
  pattern: LearningPattern
  memoryCount: number
  correctionCount: number
}

export default function LearnedPattern({ pattern, memoryCount, correctionCount }: Props) {
  const navigate = useNavigate()
  return (
    <Card className="fade-in mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="label m-0">Learned Pattern</h3>
        <Badge tone="blue">{pattern.id}</Badge>
        <span className="ml-auto text-muted">{memoryCount} memories · {correctionCount} corrections</span>
      </div>
      <div className="my-3 flex flex-col items-center gap-1">
        {pattern.steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div className="min-w-[230px] rounded-md border border-line bg-side px-4 py-1.5 text-center">{i + 1}. {s}</div>
            <ArrowDown size={14} className="text-muted" aria-hidden="true" />
          </div>
        ))}
        <div className="min-w-[230px] rounded-md border border-green-800 bg-side px-4 py-1.5 text-center font-semibold">{pattern.rootCause}</div>
      </div>
      <div className="flex justify-center gap-2">
        <Badge tone="green">{pattern.confirmedCount} CONFIRMED</Badge>
        <Badge tone="green">{pattern.successfulCount} SUCCESSFUL</Badge>
      </div>
      <div className="mt-3 flex gap-2">
        <Button variant="ghost" onClick={() => navigate('/learning')}>View Learning</Button>
        <Button variant="ghost" onClick={() => navigate('/memory')}>View Hindsight Memory</Button>
      </div>
    </Card>
  )
}

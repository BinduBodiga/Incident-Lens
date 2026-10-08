import type { LearningEvent } from '../../types/learning'
import Card from '../common/Card'
import EmptyState from '../common/EmptyState'

export default function LearningEvents({ events }: { events: LearningEvent[] }) {
  if (events.length === 0) return <EmptyState title="No learning events yet" />
  return (
    <Card>
      <ul>
        {events.map((e, i) => (
          <li key={`${e.text}-${i}`} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
            <span className={`h-2 w-2 rounded-full ${e.timestamp ? 'bg-green-500' : 'bg-blue-500'}`} aria-hidden="true" />
            {e.text}
            {e.timestamp && <span className="ml-auto text-muted">{new Date(e.timestamp).toLocaleTimeString()}</span>}
          </li>
        ))}
      </ul>
    </Card>
  )
}

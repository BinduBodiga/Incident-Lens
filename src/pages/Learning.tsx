import Button from '../components/common/Button'
import LearningEvents from '../components/learning/LearningEvents'
import LearningProgression from '../components/learning/LearningProgression'
import PageContainer from '../components/layout/PageContainer'
import { useMemory } from '../hooks/useMemory'
import * as learningService from '../services/learningService'

export default function Learning() {
  const { events, summary, reset } = useMemory()
  const progress = learningService.getLearningProgress()

  return (
    <PageContainer title="LEARNING PROGRESSION" subtitle="Organizational context increases investigation relevance">
      <LearningProgression progress={progress} />
      <p className="mx-auto my-3 max-w-xl text-[11px] text-muted">
        Values show demo investigation relevance, not ML accuracy or scientific validation.
      </p>
      <h3 className="label mb-2 mt-5">Recent Learning Events</h3>
      <LearningEvents events={events} />
      {summary.activeCount === 0 && (
        <Button variant="ghost" className="mt-3" onClick={reset}>Reset demo</Button>
      )}
    </PageContainer>
  )
}

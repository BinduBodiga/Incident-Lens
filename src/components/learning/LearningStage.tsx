import type { ReactNode } from 'react'
import Card from '../common/Card'

export default function LearningStage({ stage, title, children }: { stage: number; title: string; children: ReactNode }) {
  return (
    <Card className="transition-colors hover:border-slate-600">
      <div className="label">Stage {stage}</div>
      <div className="font-semibold">{title}</div>
      <div className="mt-2">{children}</div>
    </Card>
  )
}

import type { ReactNode } from 'react'
import Card from './Card'

export default function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Card className="py-8 text-center">
      <h2 className="text-base font-semibold">{title}</h2>
      {children && <div className="mt-1 text-muted">{children}</div>}
    </Card>
  )
}

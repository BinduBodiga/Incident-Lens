import type { ReactNode } from 'react'

export default function PageContainer({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
      <h1>{title}</h1>
      <p className="mb-5 mt-0.5 text-muted">{subtitle}</p>
      {children}
    </div>
  )
}

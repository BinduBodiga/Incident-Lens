import { RefreshCw } from 'lucide-react'
import type { InvestigationResult } from '../../types/investigation'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'

export default function InvestigationReport({ result, onRerun }: { result: InvestigationResult; onRerun: () => void }) {
  return (
    <Card id="root-cause" className="fade-in mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="label m-0">Investigation Report</h3>
        <Badge tone="green">ANALYSIS COMPLETE</Badge>
        <Button variant="ghost" className="ml-auto" onClick={onRerun}>
          <RefreshCw size={13} aria-hidden="true" /> Rerun
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap items-start gap-4">
        <div className="min-w-[240px] flex-1">
          <div className="label">Likely Root Cause</div>
          <div className="my-1 text-base font-semibold">{result.rootCause}</div>
          <div className="text-muted">{result.description}</div>
        </div>
        <div>
          <div className="label">Confidence</div>
          <div className="text-4xl font-bold text-green-500">{result.confidence}%</div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="label mb-2">Why this conclusion?</h3>
          <ul>
            {result.evidence.map((e) => (
              <li key={e} className="border-b border-line py-1.5 before:mr-1.5 before:text-green-500 before:content-['✓']">{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="label mb-2">Recommended Investigation</h3>
          <ol className="list-decimal pl-5">
            {result.recommendations.map((r) => (
              <li key={r} className="py-1">{r}</li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mb-0 mt-3 text-[11px] text-muted">
        Confidence reflects demo investigation relevance from current evidence plus organizational memory — not ML accuracy.
      </p>
    </Card>
  )
}

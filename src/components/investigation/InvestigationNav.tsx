const TABS: [string, string][] = [
  ['evidence', 'CURRENT EVIDENCE'],
  ['recall', 'HINDSIGHT RECALL'],
  ['matches', 'HISTORICAL MATCHES'],
  ['root-cause', 'LIKELY ROOT CAUSE'],
  ['feedback', 'HUMAN FEEDBACK'],
  ['memory-updated', 'MEMORY UPDATED'],
]

export default function InvestigationNav() {
  return (
    <nav aria-label="Investigation sections" className="mb-4 flex gap-1 overflow-x-auto border-b border-line">
      {TABS.map(([id, label]) => (
        <button
          key={id}
          className="whitespace-nowrap px-2.5 py-2 text-[11px] tracking-wider text-muted hover:text-slate-200"
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

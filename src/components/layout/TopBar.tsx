import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as incidentService from '../../services/incidentService'
import StatusIndicator from '../common/StatusIndicator'

export default function TopBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const results = incidentService.search(query).slice(0, 6)

  const open = (id: string) => {
    setQuery('')
    navigate(`/investigate?incident=${id}`)
  }

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-line bg-side px-4 py-2.5 md:px-6">
      <b>Production</b>
      <StatusIndicator label="Systems Operational" />
      <div className="flex-1" />
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-2 text-muted" aria-hidden="true" />
        <input
          className="input !w-40 !pl-8 md:!w-64"
          type="search"
          placeholder="Search incidents..."
          aria-label="Search incidents"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setQuery('')
            if (e.key === 'Enter' && results[0]) open(results[0].id)
          }}
        />
        {query.trim() && (
          <ul className="absolute left-0 top-9 z-20 w-80 overflow-hidden rounded-md border border-line bg-panel">
            {results.length === 0 && <li className="px-3 py-2 text-muted">No results</li>}
            {results.map((i) => (
              <li key={i.id}>
                <button className="w-full border-b border-line px-3 py-2 text-left hover:bg-white/5" onClick={() => open(i.id)}>
                  <b>{i.id}</b> {i.title} <span className="text-muted">· {i.service}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="rounded p-1 text-muted hover:text-slate-200" aria-label="Notifications">
        <Bell size={17} />
      </button>
      <div className="grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-[11px] font-semibold" aria-label="User TM">
        TM
      </div>
    </header>
  )
}

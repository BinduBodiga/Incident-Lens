import { NavLink } from 'react-router-dom'
import StatusIndicator from '../common/StatusIndicator'
import { NAV_ITEMS } from './navItems'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-line bg-side p-3 md:flex">
      <div className="text-sm font-bold tracking-[0.12em]">INCIDENTLENS</div>
      <div className="mb-5 mt-0.5 text-[11px] text-muted">Learning-First Incident Investigator</div>
      <nav aria-label="Primary" className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md border px-2.5 py-2 transition-colors ${
                isActive ? 'border-blue-900 bg-[#14223f] text-white' : 'border-transparent text-muted hover:bg-white/5 hover:text-slate-200'
              }`
            }
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-line pt-3 text-xs text-muted">
        <StatusIndicator label="Hindsight Connected" />
        <div className="mt-3">
          <div className="label">Environment</div>
          <div className="text-slate-200">Production</div>
        </div>
      </div>
    </aside>
  )
}

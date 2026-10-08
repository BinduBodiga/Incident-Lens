import { NavLink } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import { NAV_ITEMS } from './components/layout/navItems'
import AppRouter from './router/AppRouter'

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <TopBar />
        <nav aria-label="Mobile" className="flex gap-3 overflow-x-auto border-b border-line px-4 py-2 md:hidden">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `whitespace-nowrap ${isActive ? 'text-white' : 'text-muted'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <main>
          <AppRouter />
        </main>
      </div>
    </div>
  )
}

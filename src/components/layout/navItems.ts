import { Brain, GraduationCap, History, LayoutDashboard, Search } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Command Center', icon: LayoutDashboard },
  { to: '/investigate', label: 'Investigate', icon: Search },
  { to: '/memory', label: 'Hindsight Memory', icon: Brain },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/history', label: 'Incident History', icon: History },
]

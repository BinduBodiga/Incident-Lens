import { Navigate, Route, Routes } from 'react-router-dom'
import CommandCenter from '../pages/CommandCenter'
import HindsightMemory from '../pages/HindsightMemory'
import IncidentHistory from '../pages/IncidentHistory'
import Investigate from '../pages/Investigate'
import Learning from '../pages/Learning'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<CommandCenter />} />
      <Route path="/investigate" element={<Investigate />} />
      <Route path="/memory" element={<HindsightMemory />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/history" element={<IncidentHistory />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

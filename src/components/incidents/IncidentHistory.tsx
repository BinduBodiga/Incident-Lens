import type { Incident } from '../../types/incident'
import Badge, { severityTone } from '../common/Badge'
import Card from '../common/Card'
import EmptyState from '../common/EmptyState'

export default function IncidentHistory({ incidents, onOpen }: { incidents: Incident[]; onOpen: (id: string) => void }) {
  if (incidents.length === 0) return <EmptyState title="No incidents match" />
  return (
    <Card className="overflow-x-auto !p-0">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-[11px] uppercase text-muted">
            {['ID', 'Title', 'Service', 'Severity', 'Status', 'Root cause', 'Resolution', 'Confirmed'].map((h) => (
              <th key={h} className="border-b border-line p-2.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.map((i) => (
            <tr key={i.id} className="hover:bg-white/5">
              <td className="border-b border-line p-2.5">
                <button className="font-semibold text-blue-300 hover:underline" onClick={() => onOpen(i.id)}>{i.id}</button>
              </td>
              <td className="border-b border-line p-2.5">{i.title}</td>
              <td className="border-b border-line p-2.5">{i.service}</td>
              <td className="border-b border-line p-2.5"><Badge tone={severityTone(i.severity)}>{i.severity}</Badge></td>
              <td className="border-b border-line p-2.5"><Badge tone={i.status === 'ACTIVE' ? 'blue' : 'green'}>{i.status}</Badge></td>
              <td className="border-b border-line p-2.5">{i.rootCause}</td>
              <td className="border-b border-line p-2.5">{i.resolution}</td>
              <td className="border-b border-line p-2.5">
                {i.confirmed ? <Badge tone="green">CONFIRMED</Badge> : <Badge>PENDING</Badge>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

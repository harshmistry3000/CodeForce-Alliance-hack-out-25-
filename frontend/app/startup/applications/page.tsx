import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { applications } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"

export default function ApplicationsPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Submitted Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Scheme</th>
                  <th className="p-2">Milestone</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.company}</td>
                    <td className="p-2">{a.schemeId}</td>
                    <td className="p-2">{a.milestone}</td>
                    <td className="p-2">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

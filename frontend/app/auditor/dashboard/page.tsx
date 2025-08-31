import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { applications } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"

export default function AuditorDashboard() {
  const pending = applications.filter((a) => a.status === "in_review" || a.status === "pending")
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Auditor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-700">{pending.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{applications.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-700">
            {applications.filter((a) => a.status === "approved").length}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Milestone</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.company}</td>
                    <td className="p-2">{a.milestone}</td>
                    <td className="p-2">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

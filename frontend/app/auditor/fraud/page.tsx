import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fraudAlerts } from "@/lib/mock-data"

export default function AuditorFraud() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Fraud Detection</h1>
      <Card>
        <CardHeader>
          <CardTitle>Flagged Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-2">Alert</th>
                <th className="p-2">Application</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Severity</th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="p-2">{f.id}</td>
                  <td className="p-2">{f.applicationId}</td>
                  <td className="p-2">{f.reason}</td>
                  <td className="p-2 capitalize">{f.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

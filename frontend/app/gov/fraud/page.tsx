import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fraudAlerts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function FraudPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Fraud Prevention</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Duplicate Application Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">Alert ID</th>
                  <th className="p-2">Application</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Severity</th>
                </tr>
              </thead>
              <tbody>
                {fraudAlerts.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.applicationId}</td>
                    <td className="p-2">{a.reason}</td>
                    <td className="p-2 capitalize">{a.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Document Verification Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">Doc Hash</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {["0x12ab..99", "0x45cd..77", "0x88ff..aa"].map((h) => (
                  <tr key={h} className="border-t">
                    <td className="p-2 font-mono">{h}</td>
                    <td className="p-2">verified</td>
                    <td className="p-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
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

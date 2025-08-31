import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { applications, transactions } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"

export default function StartupDashboard() {
  const myApps = applications
  const myTx = transactions
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Startup Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-700">{myApps.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payments Received</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-700">
            ₹
            {(myTx.filter((t) => t.status === "payment_complete").reduce((s, x) => s + x.amount, 0) / 1_00_000).toFixed(
              2,
            )}
            L
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {myApps.filter((a) => a.status === "in_review").length}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
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
                {myApps.slice(0, 5).map((a) => (
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
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">Txn</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {myTx.slice(0, 5).map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">{t.id}</td>
                    <td className="p-2">₹{(t.amount / 1_00_000).toFixed(2)}L</td>
                    <td className="p-2">{t.date}</td>
                    <td className="p-2">
                      <StatusBadge status={t.status} />
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

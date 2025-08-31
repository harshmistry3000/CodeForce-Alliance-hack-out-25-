import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FundUtilizationBar } from "@/components/charts/fund-utilization"
import { FraudAlertsChart } from "@/components/charts/fraud-alerts"
import { schemes, alertsOverTime } from "@/lib/mock-data"

export default function GovDashboard() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Government Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Schemes</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-700">
            {schemes.filter((s) => s.status === "active").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Allocated</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            ₹{(schemes.reduce((s, x) => s + x.allocated, 0) / 1_00_000).toFixed(2)}L
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilization (%)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-700">
            {Math.round((100 * schemes.reduce((s, x) => s + x.used, 0)) / schemes.reduce((s, x) => s + x.allocated, 0))}
            %
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fund Utilization by Scheme</CardTitle>
          </CardHeader>
          <CardContent>
            <FundUtilizationBar data={schemes.map((s) => ({ name: s.name, allocated: s.allocated, used: s.used }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fraud Alerts Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <FraudAlertsChart data={alertsOverTime} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

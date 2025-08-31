import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FundUtilizationBar } from "@/components/charts/fund-utilization"
import { FraudAlertsChart } from "@/components/charts/fraud-alerts"
import { schemes, alertsOverTime } from "@/lib/mock-data"

export default function ReportsPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Reports & Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <FundUtilizationBar data={schemes.map((s) => ({ name: s.name, allocated: s.allocated, used: s.used }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fraud Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <FraudAlertsChart data={alertsOverTime} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

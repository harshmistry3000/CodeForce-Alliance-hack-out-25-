import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { schemes } from "@/lib/mock-data"

const rules = [
  {
    id: "R-1",
    schemeId: "SCH-001",
    milestone: "Design",
    rule: "Upload design docs + auditor approval",
    status: "success",
  },
  { id: "R-2", schemeId: "SCH-001", milestone: "Pilot", rule: "Energy yield > X threshold", status: "pending" },
]

const timeline = [
  { ts: "2025-08-10 10:00", event: "Milestone verified: Design", by: "Automation" },
  { ts: "2025-08-15 11:30", event: "Payment triggered: ₹5,00,000", by: "Smart Contract" },
]

export default function AutomationPage() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Automation Engine</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Milestone Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">Scheme</th>
                  <th className="p-2">Milestone</th>
                  <th className="p-2">Rule</th>
                  <th className="p-2">Verification</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{schemes.find((s) => s.id === r.schemeId)?.name}</td>
                    <td className="p-2">{r.milestone}</td>
                    <td className="p-2">{r.rule}</td>
                    <td className="p-2">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          r.status === "success" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Triggered Payments Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {timeline.map((t, i) => (
                <li key={i} className="rounded border p-3">
                  <div className="text-sm text-gray-600">{t.ts}</div>
                  <div className="font-medium">{t.event}</div>
                  <div className="text-xs text-gray-500">by {t.by}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

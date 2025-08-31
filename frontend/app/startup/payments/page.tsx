"use client"

import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { transactions } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"

export default function StartupPayments() {
  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Payment History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Transactions (Razorpay/Paytm test)</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-2">Txn</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">₹{(t.amount / 1_00_000).toFixed(2)}L</td>
                  <td className="p-2">{t.date}</td>
                  <td className="p-2">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-2">
                    <Button size="sm" variant="outline" onClick={() => alert("Downloading PDF placeholder...")}>
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

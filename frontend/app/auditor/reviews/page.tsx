"use client"
import { useState } from "react"
import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { applications as initialApps } from "@/lib/mock-data"

export default function ReviewsPage() {
  const [apps, setApps] = useState(initialApps)
  const [comment, setComment] = useState("")

  const act = (id: string, status: "approved" | "rejected" | "flagged") => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
    alert(`${status.toUpperCase()} with comment: ${comment || "(none)"}`)
    setComment("")
  }

  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Review Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input placeholder="Add comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Documents</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{a.id}</td>
                    <td className="p-2">{a.company}</td>
                    <td className="p-2">
                      <button className="text-blue-700 underline" onClick={() => alert("Downloading docs...")}>
                        Download
                      </button>
                    </td>
                    <td className="p-2">
                      <Button size="sm" className="mr-2" onClick={() => act(a.id, "approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="mr-2" onClick={() => act(a.id, "rejected")}>
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => act(a.id, "flagged")}>
                        Flag
                      </Button>
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

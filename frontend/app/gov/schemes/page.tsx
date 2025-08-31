"use client"
import { useState } from "react"
import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/status-badge"
import { schemes as initialSchemes } from "@/lib/mock-data"

type Scheme = (typeof initialSchemes)[number]

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes)
  const [form, setForm] = useState<Partial<Scheme>>({
    name: "",
    description: "",
    allocated: 0,
    milestones: 1,
    status: "active",
    used: 0,
  })

  const addScheme = () => {
    const id = `SCH-${Math.floor(Math.random() * 900 + 100)}`
    setSchemes((prev) => [
      ...prev,
      {
        id,
        name: form.name!,
        description: form.description!,
        allocated: Number(form.allocated) || 0,
        used: 0,
        milestones: Number(form.milestones) || 1,
        status: (form.status as any) || "active",
      },
    ])
    setForm({ name: "", description: "", allocated: 0, milestones: 1, status: "active", used: 0 })
  }
  const remove = (id: string) => setSchemes((prev) => prev.filter((s) => s.id !== id))

  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Scheme Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>All Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Allocated</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-2">{s.id}</td>
                      <td className="p-2">{s.name}</td>
                      <td className="p-2">₹{(s.allocated / 1_00_000).toFixed(2)}L</td>
                      <td className="p-2">
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="mr-2 bg-transparent"
                          onClick={() => alert("Edit placeholder")}
                        >
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => remove(s.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Scheme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Allocated Funds (₹)</Label>
              <Input
                type="number"
                value={form.allocated ?? 0}
                onChange={(e) => setForm({ ...form, allocated: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Milestones</Label>
              <Input
                type="number"
                value={form.milestones ?? 1}
                onChange={(e) => setForm({ ...form, milestones: Number(e.target.value) })}
              />
            </div>
            <Button onClick={addScheme}>Add Scheme</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

"use client"
import { useState } from "react"
import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { schemes } from "@/lib/mock-data"
import { FileUpload } from "@/components/file-upload"

export default function ApplyPage() {
  const [company, setCompany] = useState("")
  const [scheme, setScheme] = useState(schemes[0]?.id ?? "")
  const [milestone, setMilestone] = useState("Design")

  const submit = () => {
    alert(`Application submitted for ${company} to ${scheme} at milestone ${milestone} (demo)`)
  }

  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Apply to Scheme</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Label>Company Name</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Scheme</Label>
              <select className="rounded border p-2" value={scheme} onChange={(e) => setScheme(e.target.value)}>
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Milestone</Label>
              <Input
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                placeholder="e.g., Design / Pilot / Deployment"
              />
            </div>
            <Button onClick={submit}>Submit Application</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "./status-badge"

type Doc = { id: string; name: string; status: "pending" | "in_review" | "approved" | "rejected" }

export function FileUpload() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [file, setFile] = useState<File | null>(null)

  const addDoc = () => {
    if (!file) return
    setDocs((prev) => [...prev, { id: String(Date.now()), name: file.name, status: "pending" }])
    setFile(null)
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <Label htmlFor="doc">Upload Document</Label>
        <Input id="doc" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <Button onClick={addDoc} disabled={!file}>
          Add
        </Button>
      </div>
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-2">{d.name}</td>
                <td className="p-2">
                  <StatusBadge status={d.status} />
                </td>
                <td className="p-2">
                  <Button variant="outline" size="sm" onClick={() => alert("Downloading placeholder...")}>
                    Download
                  </Button>
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No documents uploaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

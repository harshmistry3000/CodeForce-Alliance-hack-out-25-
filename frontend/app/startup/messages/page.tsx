"use client"
import { useState } from "react"
import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Msg = { id: string; from: string; subject: string; body: string; unread?: boolean }
const initialMsgs: Msg[] = [
  {
    id: "M-1",
    from: "Govt Admin",
    subject: "Application A-102 under review",
    body: "Please provide pilot data.",
    unread: true,
  },
  { id: "M-2", from: "Auditor", subject: "Document verification", body: "Upload original invoice for equipment." },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMsgs)
  const [selected, setSelected] = useState<Msg | null>(initialMsgs[0])

  const markRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)))
  }

  return (
    <DashboardShell>
      <h1 className="mb-4 text-pretty text-2xl font-semibold">Message Center</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelected(m)
                  markRead(m.id)
                }}
                className={`block w-full rounded border p-2 text-left ${
                  selected?.id === m.id ? "border-blue-300 bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{m.subject}</span>
                  {m.unread && <span className="rounded bg-blue-600 px-2 py-0.5 text-xs text-white">New</span>}
                </div>
                <div className="text-xs text-gray-600">From: {m.from}</div>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{selected?.subject ?? "Select a message"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-800">{selected?.body}</p>
            <div className="flex items-center gap-2">
              <Input placeholder="Type a reply..." />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

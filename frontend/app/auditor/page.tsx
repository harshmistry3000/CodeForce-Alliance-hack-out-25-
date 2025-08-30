"use client"

import { useMemo, useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { Metrics } from "@/components/metrics"
import { MOCK_APPLICATIONS, MOCK_AUDITS } from "@/lib/mock-data"

export default function AuditorDashboard() {
  const [apps, setApps] = useState(MOCK_APPLICATIONS)
  const audits = MOCK_AUDITS

  const pending = useMemo(() => apps.filter((a: any) => a.status === "UNDER_REVIEW"), [apps])

  const metrics = [
    { label: "Pending Reviews", value: pending.length },
    { label: "Approved", value: apps.filter((a: any) => a.status === "APPROVED").length },
    { label: "Rejected", value: apps.filter((a: any) => a.status === "REJECTED").length },
    { label: "Audit Logs", value: audits.length },
  ]

  function quickApprove(id: string) {
    setApps((prev) => prev.map((a: any) => (a._id === id ? { ...a, status: "APPROVED" } : a)))
  }
  function quickReject(id: string) {
    setApps((prev) => prev.map((a: any) => (a._id === id ? { ...a, status: "REJECTED" } : a)))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
      <div className="py-4 md:py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">Auditor Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Review applications, verify docs, maintain audit trails.
        </p>
      </div>

      <Metrics items={metrics} />

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">Pending Applications</h2>
          <ul className="mt-3 space-y-3">
            {pending.map((a: any) => (
              <li
                key={a._id}
                className="rounded-xl border border-white/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur p-3"
              >
                <p className="font-medium text-slate-900 dark:text-white">{a.scheme?.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => quickApprove(a._id)}
                    className="rounded-xl bg-emerald-500 text-white px-3 py-1.5 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => quickReject(a._id)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-900 dark:text-white"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">Audit Trail</h2>
          <ul className="mt-3 divide-y divide-white/20 text-sm">
            {audits.slice(0, 6).map((log: any) => (
              <li key={log._id} className="py-2 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-200">{log.action}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </main>
  )
}

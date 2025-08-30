"use client"

import type React from "react"
import { useState } from "react"
import { GlassCard } from "@/components/glass-card"
import { Metrics } from "@/components/metrics"
import { MOCK_SCHEMES, MOCK_APPLICATIONS, MOCK_PAYMENTS } from "@/lib/mock-data"

export default function StartupDashboard() {
  const [schemes] = useState(MOCK_SCHEMES)
  const [apps, setApps] = useState(MOCK_APPLICATIONS)
  const [payments] = useState(MOCK_PAYMENTS)

  const metrics = [
    { label: "My Applications", value: apps.filter((a: any) => a.applicantRole === "STARTUP").length },
    { label: "Approved", value: apps.filter((a: any) => a.status === "APPROVED").length },
    { label: "Paid", value: payments.filter((p: any) => p.status === "SUCCESS").length },
    { label: "Pending", value: apps.filter((a: any) => a.status === "UNDER_REVIEW").length },
  ]

  async function submitDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const schemeId = form.get("scheme") as string
    const scheme = schemes.find((s: any) => s._id === schemeId)
    const newApp = {
      _id: Math.random().toString(36).slice(2),
      applicantRole: "STARTUP",
      scheme: { _id: schemeId, title: scheme?.title },
      status: "SUBMITTED",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
    }
    setApps((prev: any[]) => [newApp, ...prev])
    alert("Demo: Application submitted")
    e.currentTarget.reset()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
      <div className="py-4 md:py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">Startup Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Apply to schemes, track status, and view payments.</p>
      </div>

      <Metrics items={metrics} />

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">Apply to Scheme</h2>
          <form onSubmit={submitDemo} className="mt-3 grid gap-3">
            <label className="text-sm">
              <span className="block text-slate-700 dark:text-slate-300 mb-1">Scheme</span>
              <select
                name="scheme"
                required
                className="w-full rounded-xl border border-white/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur px-3 py-2"
              >
                <option value="">Select scheme</option>
                {schemes
                  .filter((s: any) => s.status === "OPEN")
                  .map((s: any) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="block text-slate-700 dark:text-slate-300 mb-1">Notes</span>
              <textarea
                name="notes"
                placeholder="Brief project summary"
                className="w-full rounded-xl border border-white/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur px-3 py-2 h-24"
              />
            </label>
            <button type="submit" className="rounded-xl bg-emerald-500 text-white px-4 py-2">
              Submit
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">My Applications</h2>
          <ul className="mt-3 divide-y divide-white/20">
            {apps
              .filter((a: any) => a.applicantRole === "STARTUP")
              .map((a: any) => (
                <li key={a._id} className="py-3 text-sm flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{a.scheme?.title}</p>
                    <p className="text-slate-500 dark:text-slate-400">
                      {a.status} • {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-900 text-white text-xs px-2 py-0.5">{a.paymentStatus}</span>
                </li>
              ))}
          </ul>
        </GlassCard>
      </div>

      <div className="mt-6">
        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">Payment History</h2>
          <ul className="mt-3 divide-y divide-white/20 text-sm">
            {payments.map((p: any) => (
              <li key={p.paymentRef} className="py-2 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-200">{p.paymentRef}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  ₹{p.amount.toLocaleString()} • {p.status}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </main>
  )
}

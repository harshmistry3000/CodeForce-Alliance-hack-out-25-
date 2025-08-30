"use client"

import { useMemo } from "react"
import { GlassCard } from "@/components/glass-card"
import { Metrics } from "@/components/metrics"
import { MOCK_SCHEMES, MOCK_PAYMENTS, MOCK_APPLICATIONS } from "@/lib/mock-data"

export default function GovernmentDashboard() {
  const schemes = MOCK_SCHEMES
  const payments = MOCK_PAYMENTS
  const apps = MOCK_APPLICATIONS

  const { total, disbursed } = useMemo(() => {
    const total = schemes.reduce((acc: number, s: any) => acc + (s.fundAllocation?.totalAmount || 0), 0)
    const disbursed = schemes.reduce((acc: number, s: any) => acc + (s.fundAllocation?.disbursedAmount || 0), 0)
    return { total, disbursed }
  }, [schemes])

  const metrics = [
    { label: "Schemes", value: schemes.length },
    { label: "Allocated", value: "₹" + total.toLocaleString() },
    {
      label: "Disbursed",
      value: "₹" + disbursed.toLocaleString(),
      sub: ((disbursed / Math.max(1, total)) * 100).toFixed(0) + "%",
    },
    { label: "Applications", value: apps.length },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
      <div className="py-4 md:py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">Government Admin</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Manage schemes, allocations, and disbursement status.
        </p>
      </div>

      <Metrics items={metrics} />

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <GlassCard className="md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-slate-900 dark:text-white">Schemes</h2>
            <button className="rounded-xl bg-emerald-500 text-white px-3 py-1.5 text-sm" title="Demo only">
              + New Scheme
            </button>
          </div>
          <ul className="mt-3 divide-y divide-white/20">
            {schemes.map((s: any) => (
              <li key={s._id} className="py-3 text-sm flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{s.title}</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {s.status} • Applicants: {s.analytics?.applicants ?? 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-700 dark:text-slate-200">
                    ₹{(s.fundAllocation?.disbursedAmount || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    of ₹{(s.fundAllocation?.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="font-medium text-slate-900 dark:text-white">Recent Payments</h2>
          <ul className="mt-3 divide-y divide-white/20 text-sm">
            {payments.slice(0, 6).map((p: any) => (
              <li key={p.paymentRef} className="py-2 flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-200">{p.paymentRef}</span>
                <span className="text-slate-500 dark:text-slate-400">₹{p.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </main>
  )
}

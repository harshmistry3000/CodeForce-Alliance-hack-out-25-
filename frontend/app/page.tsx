import Link from "next/link"
import { GlassCard } from "@/components/glass-card"
import { Metrics } from "@/components/metrics"
import { MOCK_SCHEMES, MOCK_PAYMENTS } from "@/lib/mock-data"

function getPublicStatsFromMocks() {
  const schemes = MOCK_SCHEMES
  const payments = MOCK_PAYMENTS
  const total = schemes.reduce((acc: number, s: any) => acc + (s.fundAllocation?.totalAmount || 0), 0)
  const disbursed = schemes.reduce((acc: number, s: any) => acc + (s.fundAllocation?.disbursedAmount || 0), 0)
  return {
    metrics: [
      { label: "Active Schemes", value: schemes.filter((s: any) => s.status === "OPEN").length },
      { label: "Total Funds", value: "₹" + total.toLocaleString() },
      { label: "Disbursed", value: "₹" + disbursed.toLocaleString() },
      { label: "Payments", value: payments.length, sub: "All-time transactions" },
    ],
    schemes,
    payments,
  }
}

export default async function HomePage() {
  const { metrics, schemes, payments } = getPublicStatsFromMocks()

  return (
    <main className="relative pb-24 md:pb-8">
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-white/20 bg-white/70 dark:bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary" aria-hidden="true" />
            <p className="font-semibold text-foreground text-pretty">Green H2 Subsidy Portal</p>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            <Link className="text-foreground/80 hover:underline" href="/startup">
              Startup
            </Link>
            <Link className="text-foreground/80 hover:underline" href="/auditor">
              Auditor
            </Link>
            <Link className="text-foreground/80 hover:underline" href="/gov">
              Government
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 mt-6 md:mt-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <GlassCard className="md:col-span-1">
            <h1 className="text-balance text-2xl md:text-4xl font-semibold text-slate-900 dark:text-white">
              Transparent, automated subsidies for Green Hydrogen
            </h1>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              Smart-contract powered milestone verification, automatic disbursements, and full audit trails across
              Government, Startups, and Auditors.
            </p>
            <div className="mt-5 flex gap-3">
              <Link href="/startup" className="rounded-xl bg-primary text-primary-foreground px-4 py-2">
                Enter as Startup
              </Link>
              <Link href="/auditor" className="rounded-xl border border-border px-4 py-2 text-foreground">
                Auditor
              </Link>
              <Link href="/gov" className="rounded-xl border border-border px-4 py-2 text-foreground">
                Government
              </Link>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Demo mode with sample data</p>
          </GlassCard>

          <div className="space-y-4">
            <Metrics items={metrics} />
            <GlassCard>
              <h3 className="font-medium text-slate-900 dark:text-white">Recent Payments</h3>
              <ul className="mt-2 divide-y divide-white/20">
                {payments.slice(0, 5).map((p: any) => (
                  <li key={p.paymentRef} className="py-2 flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">{p.paymentRef}</span>
                    <span className="text-slate-500 dark:text-slate-400">₹{p.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-8 md:mt-12">
        <h2 className="text-lg md:text-2xl font-semibold text-slate-900 dark:text-white">Open Schemes</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {schemes
            .filter((s: any) => s.status === "OPEN")
            .map((s: any) => (
              <GlassCard key={s._id}>
                <h3 className="font-medium text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{s.description}</p>
                <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                  Total: ₹{(s.fundAllocation?.totalAmount || 0).toLocaleString()}
                </div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Disbursed: ₹{(s.fundAllocation?.disbursedAmount || 0).toLocaleString()}
                </div>
                <Link
                  href="/startup"
                  className="mt-3 inline-block rounded-xl bg-primary text-primary-foreground px-3 py-1.5 text-sm"
                >
                  Apply
                </Link>
              </GlassCard>
            ))}
        </div>
      </section>
    </main>
  )
}

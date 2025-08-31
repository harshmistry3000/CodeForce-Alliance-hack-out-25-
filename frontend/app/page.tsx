import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/layouts/dashboard-shell"
import { FundUtilizationBar, UtilizationPie } from "@/components/charts/fund-utilization"
import { schemes, transactions } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { BarChart3, Globe, Leaf, ShieldCheck } from "lucide-react"

export default function TransparencyHome() {
  const totalAllocated = schemes.reduce((s, x) => s + x.allocated, 0)
  const totalUsed = schemes.reduce((s, x) => s + x.used, 0)

  return (
    <DashboardShell>
      <div className="space-y-8">
        <section className="rounded-xl border bg-secondary p-6 md:p-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-pretty text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Advancing Green Hydrogen with Transparency and Trust
            </h1>
            <p className="max-w-2xl text-pretty text-muted-foreground leading-relaxed">
              Explore funding allocations, program impact, and active schemes. Our mission is to enable clean energy
              innovation while ensuring accountability to the public.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="bg-accent text-accent-foreground hover:opacity-90" asChild>
                <a href="#features">Learn More</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/startup/apply">Apply Now</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-accent" aria-hidden />
              <CardTitle>Clean Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Funding targeted at decarbonization, catalyzing sustainable industry growth.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden />
              <CardTitle>Accountability</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Transparent public reporting on allocation, disbursal, and program outcomes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-accent" aria-hidden />
              <CardTitle>Open Data</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Visual dashboards and datasets to track utilization and progress.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-accent" aria-hidden />
              <CardTitle>Nationwide Reach</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Supporting startups and initiatives across regions for maximum impact.
            </CardContent>
          </Card>
        </section>

        {/* Summary cards */}
        <h2 className="text-pretty text-xl font-semibold">Transparency Portal</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Allocated</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-primary">
              ₹{(totalAllocated / 1_00_000).toFixed(2)}L
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Disbursed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-accent">₹{(totalUsed / 1_00_000).toFixed(2)}L</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Startups Funded</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-primary">{transactions.length}</CardContent>
          </Card>
        </div>

        {/* Charts section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Fund Allocation vs Used</CardTitle>
            </CardHeader>
            <CardContent>
              <FundUtilizationBar data={schemes.map((s) => ({ name: s.name, allocated: s.allocated, used: s.used }))} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Overall Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <UtilizationPie used={totalUsed} remaining={totalAllocated - totalUsed} />
            </CardContent>
          </Card>
        </div>

        {/* Active schemes table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Allocated</th>
                    <th className="p-2">Used</th>
                    <th className="p-2">Milestones</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes
                    .filter((s) => s.status === "active")
                    .map((s) => (
                      <tr key={s.id} className="border-t">
                        <td className="p-2">{s.id}</td>
                        <td className="p-2">{s.name}</td>
                        <td className="p-2">₹{(s.allocated / 1_00_000).toFixed(2)}L</td>
                        <td className="p-2">₹{(s.used / 1_00_000).toFixed(2)}L</td>
                        <td className="p-2">{s.milestones}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Geographic distribution placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution (placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src="/geographic-distribution-map-placeholder.png"
              alt="Geographic distribution map placeholder"
              className="h-64 w-full rounded border object-cover"
            />
          </CardContent>
        </Card>

        {/* CTA banner */}
        <section className="rounded-xl bg-primary p-6 text-primary-foreground md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-pretty text-2xl font-semibold">Partner with the Green Hydrogen Program</h3>
              <p className="max-w-2xl text-pretty text-primary-foreground/90">
                Join us in accelerating clean energy innovation. Explore opportunities for startups, research, and
                public-private collaboration.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" asChild>
                <a href="/gov/reports">View Reports</a>
              </Button>
              <Button className="bg-accent text-accent-foreground hover:opacity-90" asChild>
                <a href="/startup/apply">Apply Now</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}

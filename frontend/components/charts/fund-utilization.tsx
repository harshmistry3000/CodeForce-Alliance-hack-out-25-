"use client"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"

const CHART_PRIMARY = "var(--color-primary)" // allocated
const CHART_ACCENT = "var(--color-accent)" // used
const CHART_MUTED = "var(--color-muted-foreground)" // remaining

export function FundUtilizationBar({ data }: { data: { name: string; allocated: number; used: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="allocated" fill={CHART_PRIMARY} fillOpacity={0.85} />
          <Bar dataKey="used" fill={CHART_ACCENT} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function UtilizationPie({ used, remaining }: { used: number; remaining: number }) {
  const pieData = [
    { name: "Used", value: used, color: CHART_ACCENT },
    { name: "Remaining", value: remaining, color: CHART_MUTED },
  ]
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
            {pieData.map((slice, index) => (
              <Cell key={index} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

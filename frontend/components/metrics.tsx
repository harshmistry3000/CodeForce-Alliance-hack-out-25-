import { GlassCard } from "./glass-card"

type Metric = {
  label: string
  value: string | number
  sub?: string
}

export function Metrics({ items }: { items: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map((m) => (
        <GlassCard key={m.label} className="p-3 md:p-4">
          <div className="text-xs text-slate-600 dark:text-slate-300">{m.label}</div>
          <div className="text-lg md:text-2xl font-semibold text-slate-900 dark:text-white">{m.value}</div>
          {m.sub ? <div className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400">{m.sub}</div> : null}
        </GlassCard>
      ))}
    </div>
  )
}

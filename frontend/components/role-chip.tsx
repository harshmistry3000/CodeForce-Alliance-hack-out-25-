import { cn } from "@/lib/utils"

export function RoleChip({
  role,
  className,
}: { role: "GOVERNMENT" | "STARTUP" | "AUDITOR" | string; className?: string }) {
  const map: Record<string, string> = {
    GOVERNMENT: "bg-emerald-500 text-white",
    STARTUP: "bg-sky-500 text-white",
    AUDITOR: "bg-slate-900 text-white",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
        map[role] || "bg-slate-200 text-slate-800",
        className,
      )}
    >
      {role}
    </span>
  )
}

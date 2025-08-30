import type React from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: React.ReactNode
}

export function GlassCard({ className, children }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-lg",
        "p-4 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  )
}

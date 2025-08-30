"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home" },
  { href: "/startup", label: "Startup" },
  { href: "/auditor", label: "Auditor" },
  { href: "/gov", label: "Gov" },
]

export function MobileTabbar() {
  const pathname = usePathname()
  return (
    <nav aria-label="Primary" className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-auto max-w-xl">
        <div className="m-3 rounded-2xl border border-white/20 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-lg">
          <ul className="grid grid-cols-4 text-sm">
            {items.map((it) => {
              const active = pathname === it.href
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={cn(
                      "flex items-center justify-center py-3 rounded-2xl",
                      active ? "bg-emerald-500 text-white" : "text-slate-700 dark:text-slate-200",
                    )}
                  >
                    {it.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

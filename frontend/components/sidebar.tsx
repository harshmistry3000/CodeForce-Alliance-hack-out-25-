"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRole } from "@/components/roles/role-context"

const roleMenus: Record<string, { label: string; href: string }[]> = {
  government: [
    { label: "Dashboard", href: "/gov/dashboard" },
    { label: "Schemes", href: "/gov/schemes" },
    { label: "Users", href: "/gov/users" },
    { label: "Reports", href: "/gov/reports" },
    { label: "Fraud", href: "/gov/fraud" },
    { label: "Automation", href: "/gov/automation" },
    { label: "Payments", href: "/gov/payments" },
  ],
  startup: [
    { label: "Dashboard", href: "/startup/dashboard" },
    { label: "Apply", href: "/startup/apply" },
    { label: "Applications", href: "/startup/applications" },
    { label: "Payments", href: "/startup/payments" },
    { label: "Messages", href: "/startup/messages" },
  ],
  auditor: [
    { label: "Dashboard", href: "/auditor/dashboard" },
    { label: "Reviews", href: "/auditor/reviews" },
    { label: "Fraud", href: "/auditor/fraud" },
  ],
  public: [{ label: "Transparency", href: "/" }],
}

export function Sidebar() {
  const pathname = usePathname()
  const { session } = useRole()
  const menu = roleMenus[session.role] || roleMenus.public
  return (
    <aside className="hidden w-64 border-r bg-gray-50 p-4 md:block">
      <nav className="flex flex-col gap-1">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`rounded px-3 py-2 text-sm ${
              pathname === m.href ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

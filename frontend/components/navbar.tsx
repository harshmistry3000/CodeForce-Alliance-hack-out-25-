"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRole } from "@/components/roles/role-context"
import { NotificationBell } from "./notification-bell"

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

export function Navbar() {
  const pathname = usePathname()
  const { session, signOut } = useRole()
  const items = roleMenus[session.role] || roleMenus.public

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-blue-600">
            Green H2 Subsidy
          </Link>
          <nav className="hidden gap-4 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href ? "font-medium text-blue-700" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Session menu">
                {session.role}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Session</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/login">Switch role</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

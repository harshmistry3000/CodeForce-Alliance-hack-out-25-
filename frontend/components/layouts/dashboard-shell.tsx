"use client"
import { Navbar } from "@/components/navbar"
import type React from "react"

import { Sidebar } from "@/components/sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
    </div>
  )
}

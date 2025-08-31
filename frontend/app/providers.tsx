"use client"
import { RoleProvider } from "@/components/roles/role-context"
import type React from "react"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>
}

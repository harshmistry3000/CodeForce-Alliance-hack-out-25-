"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type React from "react"

export type Role = "public" | "government" | "startup" | "auditor"
type Session = { role: Role; email?: string; token?: string }

type RoleContextValue = {
  session: Session
  setSession: (s: Session) => void
  signOut: () => void
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session>({ role: "public" })
  useEffect(() => {
    try {
      const raw = localStorage.getItem("green-h2-session")
      if (raw) setSessionState(JSON.parse(raw))
    } catch {}
  }, [])
  const setSession = (s: Session) => {
    setSessionState(s)
    try {
      localStorage.setItem("green-h2-session", JSON.stringify(s))
    } catch {}
  }
  const signOut = () => {
    setSession({ role: "public" })
    try {
      localStorage.removeItem("green-h2-session")
    } catch {}
  }
  const value = useMemo(() => ({ session, setSession, signOut }), [session])
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used within RoleProvider")
  return ctx
}

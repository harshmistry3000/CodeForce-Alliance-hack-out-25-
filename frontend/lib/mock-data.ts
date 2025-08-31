export const schemes = [
  {
    id: "SCH-001",
    name: "Hydrogen Pilot 2025",
    description: "Pilot scale green H2",
    allocated: 10000000,
    used: 4200000,
    milestones: 3,
    status: "active",
  },
  {
    id: "SCH-002",
    name: "Electrolyzer Efficiency Grant",
    description: "Boost efficiency",
    allocated: 6000000,
    used: 2000000,
    milestones: 2,
    status: "active",
  },
  {
    id: "SCH-003",
    name: "Green H2 Transport",
    description: "Logistics and transport",
    allocated: 8000000,
    used: 7800000,
    milestones: 4,
    status: "inactive",
  },
]

export const applications = [
  { id: "A-101", company: "H2Start Labs", schemeId: "SCH-001", milestone: "Design", status: "pending" },
  { id: "A-102", company: "ElectroTech", schemeId: "SCH-002", milestone: "Pilot", status: "in_review" },
  { id: "A-103", company: "GreenMove", schemeId: "SCH-003", milestone: "Deployment", status: "approved" },
]

export const users = [
  { id: "U-01", name: "Priya Sharma", role: "government", email: "priya@gov.example" },
  { id: "U-02", name: "Arun Verma", role: "auditor", email: "arun@audit.example" },
  { id: "U-03", name: "Nova H2 Pvt", role: "startup", email: "ops@novah2.example" },
]

export const transactions = [
  { id: "TXN-8891", schemeId: "SCH-001", amount: 500000, date: "2025-08-15", status: "payment_complete" },
  { id: "TXN-8892", schemeId: "SCH-002", amount: 250000, date: "2025-08-16", status: "payment_pending" },
]

export const fraudAlerts = [
  { id: "F-800", applicationId: "A-102", reason: "Duplicate document hash", severity: "high" },
  { id: "F-801", applicationId: "A-103", reason: "Inconsistent milestone dates", severity: "medium" },
]

export const alertsOverTime = [
  { date: "Aug 1", alerts: 2 },
  { date: "Aug 8", alerts: 1 },
  { date: "Aug 15", alerts: 3 },
  { date: "Aug 22", alerts: 2 },
  { date: "Aug 29", alerts: 4 },
]

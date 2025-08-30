import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    {
      _id: "schm1",
      title: "Green H2 Pilot Plants 2025",
      description: "Capex subsidy for pilot green hydrogen production plants with verified renewable sourcing.",
      status: "OPEN",
      fundAllocation: { totalAmount: 500000000, availableAmount: 320000000, disbursedAmount: 180000000 },
      createdBy: "user-gov-1",
      analytics: { applicants: 28, claimsApproved: 12 },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "schm2",
      title: "Electrolyser Manufacturing Support",
      description: "Incentives for domestic electrolyser manufacturing capacity.",
      status: "OPEN",
      fundAllocation: { totalAmount: 750000000, availableAmount: 600000000, disbursedAmount: 150000000 },
      createdBy: "user-gov-1",
      analytics: { applicants: 19, claimsApproved: 7 },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "schm3",
      title: "Green H2 Mobility Program",
      description: "Support for hydrogen refueling infrastructure and FCEV pilots.",
      status: "CLOSED",
      fundAllocation: { totalAmount: 200000000, availableAmount: 0, disbursedAmount: 200000000 },
      createdBy: "user-gov-1",
      analytics: { applicants: 35, claimsApproved: 30 },
      createdAt: new Date().toISOString(),
    },
  ]
  return NextResponse.json(data)
}

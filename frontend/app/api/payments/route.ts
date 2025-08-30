import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    {
      _id: "p1",
      application: "app2",
      amount: 25000000,
      paymentRef: "PAY-2025-0001",
      method: "OTHER",
      status: "SUCCESS",
      triggeredBy: "user-gov-1",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      _id: "p2",
      application: "app3",
      amount: 12000000,
      paymentRef: "PAY-2025-0002",
      method: "OTHER",
      status: "FAILED",
      triggeredBy: "user-gov-1",
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    {
      _id: "p3",
      application: "app1",
      amount: 18000000,
      paymentRef: "PAY-2025-0003",
      method: "OTHER",
      status: "PENDING",
      triggeredBy: "user-gov-1",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ]
  return NextResponse.json(data)
}

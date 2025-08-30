import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    {
      _id: "log1",
      action: "AUDIT_REVIEW_STARTED",
      refId: "app1",
      entityType: "Application",
      performedBy: "user-auditor-1",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      meta: { status: "UNDER_REVIEW" },
    },
    {
      _id: "log2",
      action: "AUDIT_STATUS_UPDATED",
      refId: "app2",
      entityType: "Application",
      performedBy: "user-auditor-2",
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      meta: { from: "UNDER_REVIEW", to: "APPROVED" },
    },
    {
      _id: "log3",
      action: "PAYMENT_TRIGGERED",
      refId: "p1",
      entityType: "Payment",
      performedBy: "user-gov-1",
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      meta: { amount: 25000000 },
    },
  ]
  return NextResponse.json(data)
}

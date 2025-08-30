import { NextResponse } from "next/server"

export async function GET() {
  const data = [
    {
      _id: "app1",
      applicant: "user-startup-1",
      applicantRole: "STARTUP",
      scheme: { _id: "schm1", title: "Green H2 Pilot Plants 2025" },
      formData: {},
      documents: [{ fileUrl: "/document-stack.png", fileHash: "abc123", verified: true }],
      status: "UNDER_REVIEW",
      paymentStatus: "PENDING",
      analytics: {},
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      _id: "app2",
      applicant: "user-startup-2",
      applicantRole: "STARTUP",
      scheme: { _id: "schm2", title: "Electrolyser Manufacturing Support" },
      formData: {},
      documents: [{ fileUrl: "/document-stack.png", fileHash: "def456", verified: true }],
      status: "APPROVED",
      paymentStatus: "PAID",
      analytics: {},
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      _id: "app3",
      applicant: "user-startup-3",
      applicantRole: "STARTUP",
      scheme: { _id: "schm2", title: "Electrolyser Manufacturing Support" },
      formData: {},
      documents: [{ fileUrl: "/document-stack.png", fileHash: "ghi789", verified: false }],
      status: "REJECTED",
      paymentStatus: "FAILED",
      analytics: {},
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
  ]
  return NextResponse.json(data)
}

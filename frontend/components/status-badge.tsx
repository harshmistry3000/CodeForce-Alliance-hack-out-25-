"use client"
import { Badge } from "@/components/ui/badge"

const colors: Record<string, string> = {
  pending: "bg-gray-200 text-gray-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  payment_pending: "bg-amber-100 text-amber-800",
  payment_complete: "bg-green-200 text-green-900",
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-700",
  flagged: "bg-red-100 text-red-800",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={`${colors[status] ?? "bg-gray-100 text-gray-700"} capitalize`}>{status.replace("_", " ")}</Badge>
  )
}

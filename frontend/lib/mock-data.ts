export const MOCK_SCHEMES = [
  {
    _id: "sch-1",
    title: "Green H2 Pilot Plants",
    description: "Funding for pilot-scale electrolysers and supporting infra.",
    status: "OPEN",
    fundAllocation: { totalAmount: 200_00_00_000, disbursedAmount: 75_00_00_000 }, // INR paise style grouping, but numeric
    analytics: { applicants: 24 },
  },
  {
    _id: "sch-2",
    title: "Electrolyser Manufacturing",
    description: "Capex incentives for domestic electrolyser manufacturing units.",
    status: "OPEN",
    fundAllocation: { totalAmount: 500_00_00_000, disbursedAmount: 210_00_00_000 },
    analytics: { applicants: 41 },
  },
  {
    _id: "sch-3",
    title: "Green H2 Mobility",
    description: "Subsidy for H2 refueling stations and fleet pilots.",
    status: "CLOSED",
    fundAllocation: { totalAmount: 120_00_00_000, disbursedAmount: 120_00_00_000 },
    analytics: { applicants: 18 },
  },
]

export const MOCK_APPLICATIONS = [
  {
    _id: "app-101",
    applicantRole: "STARTUP",
    scheme: { _id: "sch-1", title: "Green H2 Pilot Plants" },
    status: "UNDER_REVIEW",
    paymentStatus: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: "app-102",
    applicantRole: "STARTUP",
    scheme: { _id: "sch-2", title: "Electrolyser Manufacturing" },
    status: "APPROVED",
    paymentStatus: "PAID",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    _id: "app-103",
    applicantRole: "STARTUP",
    scheme: { _id: "sch-2", title: "Electrolyser Manufacturing" },
    status: "SUBMITTED",
    paymentStatus: "PENDING",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    _id: "app-104",
    applicantRole: "STARTUP",
    scheme: { _id: "sch-3", title: "Green H2 Mobility" },
    status: "REJECTED",
    paymentStatus: "FAILED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
]

export const MOCK_PAYMENTS = [
  { paymentRef: "PMT-0001", amount: 50_00_000, status: "SUCCESS" },
  { paymentRef: "PMT-0002", amount: 1_25_00_000, status: "SUCCESS" },
  { paymentRef: "PMT-0003", amount: 30_00_000, status: "FAILED" },
  { paymentRef: "PMT-0004", amount: 2_00_00_000, status: "SUCCESS" },
  { paymentRef: "PMT-0005", amount: 75_00_000, status: "SUCCESS" },
  { paymentRef: "PMT-0006", amount: 10_00_000, status: "SUCCESS" },
]

export const MOCK_AUDITS = [
  { _id: "log-1", action: "Application SUBMITTED (app-103)", timestamp: new Date().toISOString() },
  {
    _id: "log-2",
    action: "KYC VERIFIED for applicant #42",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    _id: "log-3",
    action: "Milestone 1 verified for app-102",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    _id: "log-4",
    action: "Disbursement executed PMT-0004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "log-5",
    action: "REJECTION recorded for app-104",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    _id: "log-6",
    action: "Scheme sch-2 window extended",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

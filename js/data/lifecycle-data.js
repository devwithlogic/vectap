// USP 4: Post-Award Continuous Monitoring Lifecycle Data
window.GEM_LIFECYCLE_DATA = [
  {
    contractId: "GEMC-5116877-2025-A",
    vendorName: "Apex Infra & Computing Pvt Ltd",
    tenderRef: "GEM/2025/B/49102",
    awardedValue: "₹ 12.40 Cr",
    contractDate: "15-Nov-2025",
    currentStatus: "WARNING_DEFAULT",
    checkpoints: [
      { period: "T+30 Days (Dec 2025)", gstStatus: "ACTIVE", epfStatus: "FILED", incident: "None", alert: false },
      { period: "T+60 Days (Jan 2026)", gstStatus: "ACTIVE", epfStatus: "FILED", incident: "None", alert: false },
      { period: "T+90 Days (Feb 2026)", gstStatus: "DEFAULTED", epfStatus: "DELAYED", incident: "GSTR-3B Non-Filing Notice Issued", alert: true }
    ],
    recommendedAction: "Trigger GeM Clause 19(a): Performance Bank Guarantee Freeze & 15-Day Cure Period"
  }
];

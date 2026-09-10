// USP 2: Explainable AI (XAI) Scoring Attribution Data
window.GEM_XAI_DATA = {
  "B001": {
    baseScore: 100,
    finalScore: 96,
    factors: [
      { name: "GST Compliance & Active Status", delta: 0, citation: "GSTN API Rule 138E", status: "PASS" },
      { name: "ITR & Financial Capacity (₹48.2 Cr)", delta: 0, citation: "GFR 2017 Rule 173(v)", status: "PASS" },
      { name: "Make in India (72.4% Verified BoM)", delta: 0, citation: "DPIIT PPO 2017 Sec 3(a)", status: "PASS" },
      { name: "Prior Performance Deduction", delta: -4, citation: "Minor SLA delivery penalty on 2024 contract", status: "FLAG" }
    ]
  },
  "B002": {
    baseScore: 100,
    finalScore: 71,
    factors: [
      { name: "MII Local Content Shortfall", delta: -15, citation: "PPO 2017 Sec 3 & Tender Cl. 14(b) (Claimed 65% vs Verified 38.6%)", status: "FAIL" },
      { name: "Delayed GSTR-3B Tax Filing", delta: -14, citation: "GeM GTC Cl. 14(b) Statutory Returns", status: "FAIL" },
      { name: "EPFO Active Member Count Match", delta: 0, citation: "EPFO Unified Portal API", status: "PASS" }
    ]
  },
  "B003": {
    baseScore: 100,
    finalScore: 38,
    factors: [
      { name: "Active Debarment on CPPP Watchlist", delta: -40, citation: "GFR 2017 Rule 151 (Ministry of Railways 2-Yr Ban)", status: "FAIL" },
      { name: "Forged OEM MAF Certificate", delta: -20, citation: "GeM Incident Mgmt Policy 3.2 & IPC 468", status: "FAIL" },
      { name: "Suspended GSTIN Status", delta: -10, citation: "CGST Act Sec 29(2)", status: "FAIL" },
      { name: "Negative Net Worth Anomaly", delta: -10, citation: "Tender Cl. 9 Minimum Financial Solvency", status: "FAIL" }
    ]
  },
  "B004": {
    baseScore: 100,
    finalScore: 91,
    factors: [
      { name: "Udyam Micro Enterprise Exemption", delta: 0, citation: "MSME Act 2006 & Public Procurement Policy", status: "PASS" },
      { name: "EMD & Tender Fee Waiver Verified", delta: 0, citation: "GFR 2017 Rule 170(i)", status: "PASS" },
      { name: "Turnover Exemption Granted (MSE)", delta: 0, citation: "DPIIT OM No. F.20/2/2014-PPD", status: "PASS" },
      { name: "Limited Manufacturing Track Record", delta: -9, citation: "Tender Cl. 11 Capacity Assessment", status: "FLAG" }
    ]
  }
};

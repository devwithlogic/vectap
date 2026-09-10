/**
 * VECTA: Fully Compliant Bidders Dataset (Bidder 1 & Bidder 4)
 */

window.GEM_BIDDERS_QUALIFIED = [
  {
    id: "bidder-01",
    name: "Bharat Cloud Tech Solutions Ltd",
    companyType: "Public Limited Company",
    cin: "L72200DL2012PLC238910",
    pan: "AABCB8821L",
    gstin: "07AABCB8821L1Z4",
    udyamNumber: "UDYAM-DL-03-0048192",
    bidQuote: "₹ 17,94,50,000",
    complianceScore: 96,
    riskLevel: "LOW",
    recommendation: "QUALIFY",
    recommendationSummary: "All 12 statutory and tender-specific criteria fully validated. Certified Class-I Local Supplier (72.4% local content verified via audited Bill of Materials). Clean statutory records across GSTN, EPFO, and MCA21. No adverse debarment records found.",
    officerDecision: {
      status: "APPROVED",
      decidedBy: "Shri R. K. Sharma (TEC Chairman)",
      timestamp: "08-Sep-2026 14:15 IST",
      remarks: "Bidder meets all technical, statutory, and Make-in-India mandates under GFR Rule 153. Fully recommended for commercial stage."
    },
    portalVerifications: {
      udyam: { status: "VERIFIED", details: "Medium Enterprise, Valid till 31-Mar-2027, P&M Investment: ₹ 22.4 Cr, Turnover: ₹ 88.2 Cr" },
      gstn: { status: "VERIFIED", details: "Active Regular Taxpayer. GSTR-3B filed up to July 2026. Zero default flags." },
      incometax: { status: "VERIFIED", details: "PAN Valid & Active. ITR-V filed for AY 2024-25, 2025-26, 2026-27. PAN-Aadhaar seeded." },
      mca21: { status: "VERIFIED", details: "Active (Compliant). 4 Active Directors. Zero default in filing Form AOC-4 / MGT-7." },
      startupindia: { status: "NOT_APPLICABLE", details: "Non-Startup (Mature Corporation - 14 years established)." },
      makeinindia: { status: "VERIFIED", details: "Class-I Local Supplier. Declared: 74%, Portal BoM Validated: 72.4% (Passes >=50% threshold)." },
      epfo: { status: "VERIFIED", details: "Code: DLCPM0048192000. 418 Active Subscribing Members. Monthly ECR filed regularly." },
      esic: { status: "VERIFIED", details: "Code: 11000849200000999. Current contribution compliant." },
      nsic: { status: "NOT_APPLICABLE", details: "Direct Corporate Bidder." },
      oem: { status: "VERIFIED", details: "MAF Ref: INTEL-NVIDIA-2026-B892104. Verified direct from OEM cryptographic repository with 5-yr on-site SLA." },
      cppp_debar: { status: "VERIFIED", details: "Clean Record. Scanned 48 CPSE and State Debarment databases. Zero blacklisting." },
      digilocker: { status: "VERIFIED", details: "All 9 submitted documents cryptographically signed & verified via DigiLocker PKI." }
    },
    discrepancies: [],
    documents: [
      { name: "Udyam Registration Certificate", docType: "Udyam", issuer: "Ministry of MSME", status: "VERIFIED", hashMatch: true, date: "12-Jan-2026", size: "1.4 MB" },
      { name: "GST Registration Certificate (REG-06)", docType: "GSTN", issuer: "CBIC Goods and Services Tax", status: "VERIFIED", hashMatch: true, date: "04-Aug-2021", size: "2.1 MB" },
      { name: "Chartered Accountant Local Content Certificate", docType: "MII Audit", issuer: "M/s Singhal & Co, CA", status: "VERIFIED", hashMatch: true, date: "28-Aug-2026", size: "3.5 MB" },
      { name: "OEM Authorization Form (MAF)", docType: "OEM", issuer: "NVIDIA Enterprise India / Intel Corp", status: "VERIFIED", hashMatch: true, date: "01-Sep-2026", size: "1.8 MB" },
      { name: "Audited Balance Sheets (3 FYs)", docType: "Financial", issuer: "Statutory Auditor", status: "VERIFIED", hashMatch: true, date: "15-Jul-2026", size: "8.4 MB" }
    ],
    auditTrail: [
      { time: "04-Sep-2026 15:02:11 IST", action: "BID_INGESTED", actor: "GeM Ingestion Gateway", payloadHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", details: "Technical bid received with 9 digital attachments." },
      { time: "04-Sep-2026 15:02:18 IST", action: "PORTAL_SYNC_START", actor: "VECTA AI Orchestrator", payloadHash: "7d793037a0760186574b0282f2f435e70d71686e9aa5530414f3101f467c79e2", details: "Initiated parallel queries to 12 Government databases." },
      { time: "04-Sep-2026 15:02:44 IST", action: "GSTN_RECONCILED", actor: "GSTN API Gateway", payloadHash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a", details: "GSTIN 07AABCB8821L1Z4 active; GSTR-3B filings reconciled with zero defaults." },
      { time: "04-Sep-2026 15:03:02 IST", action: "MII_BOM_AUDIT_PASS", actor: "AI Algorithmic Engine", payloadHash: "6a88e9cf944a956d405b0d00b1a03980d23fb5f52f36f3322bc6cf0034a7428f", details: "Bill of Materials components cross-verified against Indian assembly line certifications: 72.4% local content confirmed." },
      { time: "04-Sep-2026 15:03:19 IST", action: "COMPLIANCE_SCORE_GENERATED", actor: "AI Scoring Engine", payloadHash: "88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589", details: "Overall score calculated at 96/100. Risk level classified as LOW. Automated qualification recommended." },
      { time: "08-Sep-2026 14:15:30 IST", action: "OFFICER_APPROVAL", actor: "Shri R. K. Sharma (TEC Chairman)", payloadHash: "c4ca4238a0b923820dcc509a6f75849b6d8a2a5e8efab38e154f2a245582c6a0", details: "Officially marked as QUALIFIED for Financial Bid Opening." }
    ]
  },
  {
    id: "bidder-04",
    name: "Shreshtha Micro Dynamics (MSME)",
    companyType: "Private Limited (MSME)",
    cin: "U29253KA2021PTC148201",
    pan: "AALCS9120K",
    gstin: "29AALCS9120K1ZC",
    udyamNumber: "UDYAM-KR-03-0089123",
    bidQuote: "₹ 17,45,00,000",
    complianceScore: 91,
    riskLevel: "LOW",
    recommendation: "QUALIFY",
    recommendationSummary: "VERIFIED MSME WITH EMD EXEMPTION: Registered as Micro Enterprise on Udyam portal with valid manufacturing classification for IT & Electronics hardware. Meets Class-I Local Content requirement (81.2% local value addition). Turnover and prior experience criteria waived in accordance with GeM Special Terms & Conditions for verified MSEs. All statutory registrations in pristine order.",
    officerDecision: {
      status: "APPROVED",
      decidedBy: "Shri R. K. Sharma (TEC Chairman)",
      timestamp: "08-Sep-2026 15:45 IST",
      remarks: "Eligible for MSE Purchase Preference under Public Procurement Policy for Micro and Small Enterprises Order 2012."
    },
    portalVerifications: {
      udyam: { status: "VERIFIED", details: "Micro Enterprise (Manufacturing). Valid till 31-Mar-2027. Verified turnover: ₹ 4.2 Cr." },
      gstn: { status: "VERIFIED", details: "Active Taxpayer in Bengaluru, Karnataka. GSTR-1 & 3B up to date." },
      incometax: { status: "VERIFIED", details: "PAN Valid. ITR-V filed for last 3 Assessment Years." },
      mca21: { status: "VERIFIED", details: "Active Company. Compliant with annual returns and MCA e-filings." },
      startupindia: { status: "VERIFIED", details: "DPIIT Recognized Startup (Certificate DIPP99214). Eligible for turnover/experience waiver." },
      makeinindia: { status: "VERIFIED", details: "Class-I Local Supplier. Calculated local value addition: 81.2% (exceeds 50% requirement)." },
      epfo: { status: "VERIFIED", details: "Code: KNBNG0089123000. 28 Subscribing Members. Compliant." },
      esic: { status: "VERIFIED", details: "Code: 53000891230000777. Compliant." },
      nsic: { status: "VERIFIED", details: "Registered under Single Point Registration Scheme (SPRS Certificate NSIC/BNG/2024/718)." },
      oem: { status: "VERIFIED", details: "Direct Manufacturer of indigenous edge AI computing hardware + MAF for server blades." },
      cppp_debar: { status: "VERIFIED", details: "Zero debarment or penalty records found." },
      digilocker: { status: "VERIFIED", details: "All certificates verified via DigiLocker with valid PKI signatures." }
    },
    discrepancies: [],
    documents: [
      { name: "Udyam Registration Certificate", docType: "Udyam", issuer: "Ministry of MSME", status: "VERIFIED", hashMatch: true, date: "15-May-2025", size: "1.6 MB" },
      { name: "DPIIT Startup Recognition Certificate", docType: "Startup", issuer: "DPIIT Ministry of Commerce", status: "VERIFIED", hashMatch: true, date: "10-Nov-2024", size: "2.0 MB" },
      { name: "NSIC Single Point Registration Certificate", docType: "NSIC", issuer: "NSIC Bengaluru", status: "VERIFIED", hashMatch: true, date: "02-Feb-2025", size: "2.4 MB" },
      { name: "Local Content Audit Certificate", docType: "MII", issuer: "CA K. R. Rao & Associates", status: "VERIFIED", hashMatch: true, date: "01-Sep-2026", size: "1.9 MB" }
    ],
    auditTrail: [
      { time: "04-Sep-2026 14:35:10 IST", action: "BID_INGESTED", actor: "GeM Ingestion Gateway", payloadHash: "2c33a44b55c66d77e88f99a00b11c22d33e44f55a66b77c88d99e00f11a22b33", details: "Bid received with MSE exemption claim." },
      { time: "04-Sep-2026 14:35:18 IST", action: "UDYAM_MSME_VERIFIED", actor: "Udyam MSME Portal API", payloadHash: "3d44b55c66d77e88f99a00b11c22d33e44f55a66b77c88d99e00f11a22b33c44", details: "Micro Enterprise status confirmed. EMD waiver authenticated." },
      { time: "04-Sep-2026 14:35:36 IST", action: "STARTUP_INDIA_CONFIRMED", actor: "DPIIT Hub Gateway", payloadHash: "4e55c66d77e88f99a00b11c22d33e44f55a66b77c88d99e00f11a22b33c44d55", details: "DPIIT Recognition verified; turnover relaxation applied per GeM GTC clause 4(x)." },
      { time: "04-Sep-2026 14:35:55 IST", action: "COMPLIANCE_SCORE_GENERATED", actor: "AI Scoring Engine", payloadHash: "5f66d77e88f99a00b11c22d33e44f55a66b77c88d99e00f11a22b33c44d55e66", details: "Overall score calculated at 91/100. Low risk. Qualified for MSE preference." },
      { time: "08-Sep-2026 15:45:00 IST", action: "OFFICER_APPROVAL", actor: "Shri R. K. Sharma (TEC Chairman)", payloadHash: "6a77e88f99a00b11c22d33e44f55a66b77c88d99e00f11a22b33c44d55e66f77", details: "Technical qualification approved with MSE Preference benefits." }
    ]
  }
];

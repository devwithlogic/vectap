/**
 * VECTA: Flagged & Disqualified Bidders Dataset (Bidder 2 & Bidder 3)
 */

window.GEM_BIDDERS_FLAGGED = [
  {
    id: "bidder-02",
    name: "Apex Infra & Computing Pvt Ltd",
    companyType: "Private Limited Company",
    cin: "U72900MH2018PTC309124",
    pan: "AAGCA4912M",
    gstin: "27AAGCA4912M1ZK",
    udyamNumber: "UDYAM-MH-19-0091823",
    bidQuote: "₹ 16,88,00,000",
    complianceScore: 71,
    riskLevel: "MEDIUM",
    recommendation: "SEEK_CLARIFICATION",
    recommendationSummary: "CRITICAL MISMATCH IN MAKE IN INDIA (MII) DECLARATION: Bidder self-declared 65% local content, but AI Bill of Materials breakdown and customs tariff records indicate imported GPU sub-assemblies reduce actual local content to ~38.6%, falling below the mandatory 50% Class-I threshold. Furthermore, GSTR-3B for June 2026 was filed with a 42-day delay. Procurement Officer should issue a GeM Rule 4.3 Representation Notice.",
    officerDecision: {
      status: "PENDING_CLARIFICATION",
      decidedBy: "Pending Procurement Officer Review",
      timestamp: "Awaiting Action",
      remarks: "Draft clarification notice prepared for discrepancy in Local Content computation."
    },
    portalVerifications: {
      udyam: { status: "VERIFIED", details: "Small Enterprise, Valid till 31-Mar-2027, P&M: ₹ 7.8 Cr, Turnover: ₹ 14.2 Cr" },
      gstn: { status: "WARNING", details: "Active Taxpayer, but GSTR-3B for June 2026 filed with 42-day delay with late fees." },
      incometax: { status: "VERIFIED", details: "PAN Valid. 3-year ITR filed. Turnover reported: ₹ 13.9 Cr, ₹ 15.1 Cr, ₹ 14.2 Cr." },
      mca21: { status: "VERIFIED", details: "Active Company. Registered in Mumbai, Maharashtra. Zero open charges pending." },
      startupindia: { status: "NOT_APPLICABLE", details: "Does not hold DPIIT startup certificate." },
      makeinindia: { status: "DISCREPANCY", details: "FLAGGED: Bidder declared 65% (Class-I), but AI BoM audit calculated 38.6% (Class-II only). Non-compliant with tender 50% minimum!" },
      epfo: { status: "VERIFIED", details: "Code: MHBAN0091823000. 64 Subscribing Members. Active compliance." },
      esic: { status: "VERIFIED", details: "Code: 31000918230000888. Regular." },
      nsic: { status: "NOT_APPLICABLE", details: "Direct bidder without NSIC certificate." },
      oem: { status: "VERIFIED", details: "MAF Ref: DELL-EMC-IN-99214. Genuine MAF with 3-year warranty back-to-back." },
      cppp_debar: { status: "VERIFIED", details: "No active debarment or blacklisting found in CPPP." },
      digilocker: { status: "VERIFIED", details: "7 out of 7 uploaded documents have valid digital timestamps." }
    },
    discrepancies: [
      {
        portal: "Make in India (MII) Engine",
        field: "Local Content Percentage",
        claimedValue: "65.00% (Class-I Local Supplier)",
        portalValue: "38.60% (Class-II Local Supplier only)",
        severity: "HIGH",
        description: "Bidder claimed 65% local value addition, but customs HS Code 84715000 records reveal server motherboards and GPU modules were imported fully assembled. Local value addition is only 38.60%, violating the minimum 50% Class-I requirement.",
        ruleReference: "DPIIT Public Procurement Order P-45021/2/2017-PP (BE-II)"
      },
      {
        portal: "GSTN Portal",
        field: "GSTR-3B Filing Regularity",
        claimedValue: "Up to date without delay",
        portalValue: "Delayed by 42 days (June 2026)",
        severity: "MEDIUM",
        description: "GSTR-3B monthly return for June 2026 was filed after due date with interest penalties.",
        ruleReference: "GeM GTC Clause 4(m) - Statutory Tax Return Compliance"
      }
    ],
    documents: [
      { name: "Local Content Self-Declaration", docType: "MII", issuer: "Self-Certified by MD", status: "DISCREPANCY", hashMatch: false, date: "02-Sep-2026", size: "1.2 MB" },
      { name: "Udyam Registration Certificate", docType: "Udyam", issuer: "Ministry of MSME", status: "VERIFIED", hashMatch: true, date: "18-Feb-2025", size: "1.9 MB" },
      { name: "GST Registration Certificate", docType: "GSTN", issuer: "CBIC GST", status: "VERIFIED", hashMatch: true, date: "10-May-2019", size: "1.5 MB" },
      { name: "OEM Authorization Letter", docType: "OEM", issuer: "Dell Global B.V.", status: "VERIFIED", hashMatch: true, date: "30-Aug-2026", size: "2.3 MB" }
    ],
    auditTrail: [
      { time: "04-Sep-2026 14:48:02 IST", action: "BID_INGESTED", actor: "GeM Ingestion Gateway", payloadHash: "1a88b56f890c2e3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e", details: "Technical bid received with 7 digital attachments." },
      { time: "04-Sep-2026 14:48:22 IST", action: "PORTAL_SYNC_START", actor: "VECTA AI Orchestrator", payloadHash: "2b99c67a901d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f", details: "Initiated multi-portal cross verification." },
      { time: "04-Sep-2026 14:48:51 IST", action: "MII_DISCREPANCY_FLAGGED", actor: "AI Algorithmic Engine", payloadHash: "3c00d78b012e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a", details: "Local content deficit detected: Claimed 65%, Actual Calculated 38.6%." },
      { time: "04-Sep-2026 14:49:15 IST", action: "COMPLIANCE_SCORE_GENERATED", actor: "AI Scoring Engine", payloadHash: "4d11e89c123f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", details: "Overall score calculated at 71/100. Risk level classified as MEDIUM. Clarification notice recommended." }
    ]
  },
  {
    id: "bidder-03",
    name: "Horizon Telematics Systems",
    companyType: "Partnership Firm",
    cin: "Unregistered (Partnership)",
    pan: "AAFFH3819P",
    gstin: "06AAFFH3819P1Z8",
    udyamNumber: "UDYAM-HR-02-0019283 (Revoked)",
    bidQuote: "₹ 14,20,00,000",
    complianceScore: 38,
    riskLevel: "CRITICAL",
    recommendation: "DISQUALIFY",
    recommendationSummary: "CRITICAL STATUTORY BREACH & DEBARMENT DETECTED: 1. Bidder is actively DEBARRED by Ministry of Railways on CPPP (Order No. MOR/VIG/2025/112, effective till 14-Nov-2027) for submission of forged experience documents in earlier procurement. 2. GSTIN is flagged as 'Cancelled / Suspended Suo-Motu' by Tax authorities due to non-filing of returns for >6 months. 3. Submitted OEM Authorization Form (MAF) carries a forged digital signature hash not registered in OEM database. IMMEDIATE DISQUALIFICATION AND VENDOR SUSPENSION RECOMMENDED.",
    officerDecision: {
      status: "DISQUALIFIED",
      decidedBy: "Shri R. K. Sharma (TEC Chairman)",
      timestamp: "08-Sep-2026 11:30 IST",
      remarks: "Disqualified under GFR Rule 151 (Debarment from Bidding) and GeM Incident Policy due to active CPPP debarment and invalid GSTIN."
    },
    portalVerifications: {
      udyam: { status: "FAILED", details: "Udyam registration revoked due to fraudulent turnover declaration in AY 2024." },
      gstn: { status: "FAILED", details: "GSTIN 06AAFFH3819P1Z8 status is CANCELLED / SUSPENDED suo-motu by Tax Officer." },
      incometax: { status: "WARNING", details: "PAN Active, but ITR-V for AY 2025-26 and 2026-27 are non-filed." },
      mca21: { status: "NOT_APPLICABLE", details: "Partnership Firm (not incorporated under Companies Act)." },
      startupindia: { status: "FAILED", details: "No valid DPIIT recognition found." },
      makeinindia: { status: "FAILED", details: "Forged self-certification without valid CA UDIN number." },
      epfo: { status: "FAILED", details: "Establishment in default: 9 months overdue ECR contributions." },
      esic: { status: "FAILED", details: "ESIC registration inactive." },
      nsic: { status: "FAILED", details: "Expired on 14-Aug-2024." },
      oem: { status: "FAILED", details: "MAF Serial Ref: HP-IN-FAKE-8819 does NOT match OEM cryptographic ledger. Flagged as FORGERY." },
      cppp_debar: { status: "FAILED", details: "ACTIVE DEBARMENT: Blacklisted by Ministry of Railways till 14-Nov-2027 (Debarment ID: CPPP/DEB/2025/8912)." },
      digilocker: { status: "FAILED", details: "Digital signature on MAF document failed hash integrity check. Tampering detected." }
    },
    discrepancies: [
      {
        portal: "CPPP & Debarment Watchlist",
        field: "Debarment / Blacklisting Status",
        claimedValue: "Self-declared 'Never debarred or blacklisted'",
        portalValue: "ACTIVELY DEBARRED till 14-Nov-2027",
        severity: "CRITICAL",
        description: "Bidder submitted a false non-debarment affidavit. Live CPPP check revealed active debarment order MOR/VIG/2025/112 by Ministry of Railways.",
        ruleReference: "General Financial Rules (GFR) 2017 Rule 151"
      },
      {
        portal: "GSTN Portal",
        field: "GSTIN Registration Status",
        claimedValue: "Active Regular GSTIN",
        portalValue: "CANCELLED / SUSPENDED",
        severity: "CRITICAL",
        description: "GSTIN was suspended by Haryana State GST ward for repeated default in tax remittance and failure to file GSTR-3B for 7 consecutive months.",
        ruleReference: "CGST Act 2017 Section 29(2)"
      },
      {
        portal: "OEM Authorization Registry",
        field: "MAF Authenticity & Signature Hash",
        claimedValue: "Authorized OEM Partner Certificate",
        portalValue: "CRYPTO HASH MISMATCH - FORGERY",
        severity: "CRITICAL",
        description: "OEM API rejected MAF Ref HP-IN-FAKE-8819. The digital signature public key does not belong to authorized HP India signatories.",
        ruleReference: "Indian Penal Code Sec 465 / GeM GTC Clause 4(v)"
      }
    ],
    documents: [
      { name: "Non-Debarment Affidavit", docType: "Affidavit", issuer: "Notary Public Gurgaon", status: "FRAUD_DETECTED", hashMatch: false, date: "03-Sep-2026", size: "1.1 MB" },
      { name: "Alleged OEM Authorization Letter", docType: "OEM", issuer: "Purported HP India", status: "FORGERY", hashMatch: false, date: "29-Aug-2026", size: "1.4 MB" },
      { name: "Suspended GST Certificate", docType: "GSTN", issuer: "CBIC GST", status: "CANCELLED", hashMatch: false, date: "12-Nov-2021", size: "1.8 MB" }
    ],
    auditTrail: [
      { time: "04-Sep-2026 14:10:05 IST", action: "BID_INGESTED", actor: "GeM Ingestion Gateway", payloadHash: "5e22f90d234a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c", details: "Bid received with 5 documents." },
      { time: "04-Sep-2026 14:10:12 IST", action: "CPPP_DEBARMENT_MATCH", actor: "CPPP Debarment Gateway", payloadHash: "6f33a01e345b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d", details: "CRITICAL ALERT: PAN AAFFH3819P matched active debarment record in CPPP Central Index." },
      { time: "04-Sep-2026 14:10:24 IST", action: "GSTN_STATUS_CANCELLED", actor: "GSTN API Gateway", payloadHash: "7a44b12f456c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e", details: "GSTIN returned status: CANCELLED_SUO_MOTU." },
      { time: "04-Sep-2026 14:10:38 IST", action: "OEM_MAF_HASH_REJECTED", actor: "DigiLocker & OEM Engine", payloadHash: "8b55c23a567d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f", details: "Cryptographic hash mismatch. Certificate identified as forged." },
      { time: "04-Sep-2026 14:10:50 IST", action: "COMPLIANCE_SCORE_GENERATED", actor: "AI Scoring Engine", payloadHash: "9c66d34b678e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a", details: "Overall score calculated at 38/100. Risk level: CRITICAL. Automatic disqualification triggered." },
      { time: "08-Sep-2026 11:30:15 IST", action: "OFFICER_DISQUALIFICATION", actor: "Shri R. K. Sharma (TEC Chairman)", payloadHash: "0d77e45c789f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b", details: "Disqualification confirmed under GFR 151 and incident reported to GeM Blacklisting Cell." }
    ]
  }
];

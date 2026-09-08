/**
 * GeM-Comply AI: Core Data Store
 * Simulates real-time Government Portal integrations, Bidders, Discrepancies, and Audit Trail.
 */

window.GEM_DATA = {
  tenderInfo: {
    tenderId: "GEM/2026/B/892104",
    title: "Supply, Commissioning & Maintenance of Enterprise AI Server Clusters & Hybrid Storage Infrastructure",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    buyerOrganization: "National Informatics Centre Services Inc. (NICSI)",
    estimatedValue: "₹ 18,50,00,000",
    valueNumeric: 185000000,
    openingDate: "04-Sep-2026",
    evaluationDeadline: "18-Sep-2026",
    minimumTurnover: "₹ 6.00 Cr (Exempt for MSME/Startups)",
    minimumLocalContent: "Class-I Local Supplier (>= 50%)",
    emdRequirement: "₹ 37,00,000 (Exempt for Udyam MSME / NSIC)",
    officer: {
      name: "Shri R. K. Sharma",
      designation: "Senior Director (Procurement & TEC Chairman)",
      department: "MeitY - GeM Technical Evaluation Committee",
      empId: "NICSI-TEC-8841"
    }
  },

  // 12 Connected Government Portals
  portals: [
    {
      id: "udyam",
      name: "Udyam / MSME Portal",
      authority: "Ministry of Micro, Small & Medium Enterprises",
      apiStatus: "ACTIVE",
      latencyMs: 140,
      protocol: "REST / OAuth 2.0 PKI",
      icon: "fa-industry",
      description: "Validates enterprise category (Micro/Small/Medium), Plant & Machinery Investment, and verified Turnover."
    },
    {
      id: "gstn",
      name: "GSTN Portal",
      authority: "Goods and Services Tax Network",
      apiStatus: "ACTIVE",
      latencyMs: 210,
      protocol: "GST GSP Sandbox API",
      icon: "fa-receipt",
      description: "Live checks of GSTIN status, regular GSTR-1 and GSTR-3B filings, and turnover reconciliation."
    },
    {
      id: "incometax",
      name: "Income Tax (CBDT) & PAN",
      authority: "Central Board of Direct Taxes",
      apiStatus: "ACTIVE",
      latencyMs: 180,
      protocol: "CBDT e-Filing REST API",
      icon: "fa-id-card",
      description: "Validates PAN validity, Aadhaar-PAN linkage, and ITR return filing status for past 3 Assessment Years."
    },
    {
      id: "mca21",
      name: "MCA21 Registry",
      authority: "Ministry of Corporate Affairs",
      apiStatus: "ACTIVE",
      latencyMs: 320,
      protocol: "MCA21 V3 Corporate Registry",
      icon: "fa-building",
      description: "Fetches Company Master Data, Active Status, Director DINs, Authorized Capital, and Charge registers."
    },
    {
      id: "startupindia",
      name: "Startup India (DPIIT)",
      authority: "Dept. for Promotion of Industry and Internal Trade",
      apiStatus: "ACTIVE",
      latencyMs: 110,
      protocol: "DPIIT Startup Hub API",
      icon: "fa-rocket",
      description: "Verifies DPIIT Recognition Certificate, Tax Exemption (80-IAC), and prior turnover/experience waiver eligibility."
    },
    {
      id: "makeinindia",
      name: "Make in India (MII) Engine",
      authority: "DPIIT Public Procurement Order (PPO)",
      apiStatus: "ACTIVE",
      latencyMs: 260,
      protocol: "Algorithmic BoM Validator",
      icon: "fa-shield-halved",
      description: "Audits Bill of Materials, verifies Class-I (>=50%) / Class-II (>=20%) local value addition and CA certificate."
    },
    {
      id: "epfo",
      name: "EPFO Unified Portal",
      authority: "Employees' Provident Fund Organisation",
      apiStatus: "ACTIVE",
      latencyMs: 195,
      protocol: "Shram Suvidha API",
      icon: "fa-users",
      description: "Verifies active establishment code, contributing members count, and up-to-date monthly ECR payment challans."
    },
    {
      id: "esic",
      name: "ESIC Portal",
      authority: "Employees' State Insurance Corporation",
      apiStatus: "ACTIVE",
      latencyMs: 175,
      protocol: "ESIC Shramik Gateway",
      icon: "fa-heart-pulse",
      description: "Validates 17-digit employer code, insured persons compliance, and monthly contribution filings."
    },
    {
      id: "nsic",
      name: "NSIC Single Point",
      authority: "National Small Industries Corporation",
      apiStatus: "ACTIVE",
      latencyMs: 130,
      protocol: "NSIC SPRS Validation API",
      icon: "fa-certificate",
      description: "Confirms Single Point Registration Scheme (SPRS) validity, store items capacity, and EMD waiver authorization."
    },
    {
      id: "oem",
      name: "OEM Authorization Registry",
      authority: "Original Equipment Manufacturer Digital Ledger",
      apiStatus: "ACTIVE",
      latencyMs: 290,
      protocol: "Cryptographic MAF Verifier",
      icon: "fa-key",
      description: "Validates Manufacturer Authorization Form (MAF) serial numbers, tender-specific QR hashes, and warranty commitments."
    },
    {
      id: "cppp_debar",
      name: "CPPP & Debarment Watchlist",
      authority: "Central Public Procurement Portal & GeM Incident Register",
      apiStatus: "ACTIVE",
      latencyMs: 155,
      protocol: "National Debarment Index API",
      icon: "fa-ban",
      description: "Real-time query across Ministry debarment lists, GeM Incident Management blacklists, and GFR Rule 151 triggers."
    },
    {
      id: "digilocker",
      name: "DigiLocker / Digital Seal",
      authority: "National e-Governance Division (NeGD)",
      apiStatus: "ACTIVE",
      latencyMs: 220,
      protocol: "DigiLocker Issuer & PKI Verify",
      icon: "fa-folder-check",
      description: "e-Signed certificate verification, SHA-256 integrity checks, and issuer digital signature timestamp auditing."
    }
  ],

  // 4 Realistic Bidders
  bidders: [
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
  ],

  // Statutory Criteria Checklist Definition
  statutoryCriteria: [
    { id: "c1", label: "Udyam / MSME Registration & Enterprise Classification", category: "Statutory", tenderRequirement: "Valid registration under MSMED Act 2006", portalId: "udyam" },
    { id: "c2", label: "GST Registration & Return Filing Compliance", category: "Taxation", tenderRequirement: "Active GSTIN with GSTR-3B filed up to previous month", portalId: "gstn" },
    { id: "c3", label: "PAN & Income Tax Return Compliance", category: "Taxation", tenderRequirement: "Valid Corporate PAN + ITR-V past 3 financial years", portalId: "incometax" },
    { id: "c4", label: "MCA21 Corporate Good Standing & Director DINs", category: "Statutory", tenderRequirement: "Active status in RoC, non-disqualified directors", portalId: "mca21" },
    { id: "c5", label: "Make in India (MII) - Class-I Local Supplier (>= 50%)", category: "National Policy", tenderRequirement: "Minimum 50% local value addition certified by Auditor", portalId: "makeinindia" },
    { id: "c6", label: "EPFO Monthly Contribution & Active Member ECR", category: "Labor Compliance", tenderRequirement: "Active establishment code with zero contribution default", portalId: "epfo" },
    { id: "c7", label: "ESIC Registration & Health Insurance Compliance", category: "Labor Compliance", tenderRequirement: "Active employer registration with timely filings", portalId: "esic" },
    { id: "c8", label: "Manufacturer Authorization Form (MAF) Validity", category: "Technical Eligibility", tenderRequirement: "Direct OEM authorization specific to Tender GEM/2026/B/892104", portalId: "oem" },
    { id: "c9", label: "Non-Debarment & Blacklisting Check", category: "Integrity Pact", tenderRequirement: "Zero debarment on CPPP / Ministry lists per GFR Rule 151", portalId: "cppp_debar" },
    { id: "c10", label: "DigiLocker Document Integrity & PKI Signatures", category: "Document Integrity", tenderRequirement: "Verifiable digital signature timestamp on all uploads", portalId: "digilocker" }
  ]
};

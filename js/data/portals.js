/**
 * VECTA: 12 Connected Government Portals Specification
 */

window.GEM_PORTALS = [
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
];

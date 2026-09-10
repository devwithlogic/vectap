/**
 * VECTA: 10 Mandatory Statutory & Tender Checklist Criteria
 */

window.GEM_STATUTORY_CRITERIA = [
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
];

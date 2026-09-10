// USP 3: Forensic Document Tampering Data
window.GEM_FORGERY_DATA = {
  documentId: "DOC-MAF-8819",
  bidderId: "B003",
  bidderName: "Horizon Telematics Systems",
  docType: "OEM Manufacturer Authorization Form",
  forensicVerdict: "CONFIRMED_FORGERY",
  forgeryConfidence: 99.4,
  anomalies: [
    { type: "METADATA_ALTERATION", detail: "Software 'Adobe Photoshop 24.1' used. Modified 3 days after notarization.", severity: "CRITICAL" },
    { type: "ELA_PIXEL_SPLICE", detail: "Error Level Analysis shows 84.2% compression spike on validity date '31-Dec-2028'.", severity: "CRITICAL" },
    { type: "DSC_SIGNATURE_REVOKED", detail: "Digital certificate signed with revoked key (CRL Serial #994812 - CCA India).", severity: "CRITICAL" }
  ]
};

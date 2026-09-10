/**
 * VECTA: Bidder Application Modal Controller
 */

window.initApplyModal = function(onNewBidSubmitted) {
  const applyModal = document.getElementById('applyTenderModal');
  const openApplyBtns = [
    document.getElementById('btnApplyTenderNav'),
    document.getElementById('btnApplyTenderHero'),
    document.getElementById('btnApplyTenderSidebar')
  ];
  const closeApplyBtn = document.getElementById('closeApplyModalBtn');
  const cancelApplyBtn = document.getElementById('cancelApplyBtn');
  const autoFetchBtn = document.getElementById('btnAutoFetchDigilocker');
  const submitApplyBidBtn = document.getElementById('submitApplyBidBtn');

  openApplyBtns.forEach(btn => {
    if (btn) {
      btn.onclick = () => {
        if (applyModal) {
          applyModal.classList.remove('hidden');
          applyModal.classList.add('flex');
        }
      };
    }
  });

  window.addEventListener('open-apply-modal', (e) => {
    if (applyModal) {
      applyModal.classList.remove('hidden');
      applyModal.classList.add('flex');
      if (e.detail?.zeroUpload) {
        window.showToast("Zero-Upload Mode Active: Documents fetched via DigiLocker / UDIN APIs.", "success");
      }
    }
  });

  const hideApplyModal = () => {
    if (applyModal) {
      applyModal.classList.add('hidden');
      applyModal.classList.remove('flex');
    }
  };

  if (closeApplyBtn) closeApplyBtn.onclick = hideApplyModal;
  if (cancelApplyBtn) cancelApplyBtn.onclick = hideApplyModal;

  if (autoFetchBtn) {
    autoFetchBtn.onclick = () => {
      window.showToast("DigiLocker PKI linked: 4 verified statutory certificates auto-fetched successfully!", "success");
    };
  }

  if (submitApplyBidBtn) {
    submitApplyBidBtn.onclick = () => {
      const companyName = document.getElementById('applyCompanyName').value.trim() || 'Zenith Infra-Tech Systems Pvt Ltd';
      const entityType = document.getElementById('applyEntityType').value;
      const gstin = document.getElementById('applyGSTIN').value.trim() || '07AAECZ9123M1Z8';
      const pan = document.getElementById('applyPAN').value.trim() || 'AAECZ9123M';
      const udyam = document.getElementById('applyUdyam').value.trim() || 'UDYAM-DL-03-0099881';
      const cin = document.getElementById('applyCIN').value.trim() || 'U72900DL2022PTC394812';
      const quote = document.getElementById('applyBidQuote').value.trim() || '₹ 17,25,00,000';
      const localContent = parseFloat(document.getElementById('applyLocalContent').value) || 68;

      const isClassI = localContent >= 50;
      const now = new Date();
      const timestampStr = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} IST`;
      const newId = `bidder-${Date.now()}`;

      const newBidder = {
        id: newId,
        name: companyName,
        companyType: entityType,
        cin: cin,
        pan: pan,
        gstin: gstin,
        udyamNumber: udyam,
        bidQuote: quote,
        complianceScore: isClassI ? 94 : 68,
        riskLevel: isClassI ? "LOW" : "MEDIUM",
        recommendation: isClassI ? "QUALIFY" : "SEEK_CLARIFICATION",
        recommendationSummary: `Newly submitted bid for Tender GEM/2026/B/892104. Self-declared Local Content: ${localContent}% (${isClassI ? 'Class-I Local Supplier' : 'Class-II Local Supplier'}). Multi-portal records in order across GSTN, PAN, and Udyam.`,
        officerDecision: {
          status: "UNDER_EVALUATION",
          decidedBy: "Pending Procurement Officer Review",
          timestamp: timestampStr,
          remarks: "Bid newly received via GeM Bidder Gateway. Ready for Technical Evaluation Committee scrutiny."
        },
        portalVerifications: {
          udyam: { status: "VERIFIED", details: `Registered MSME Enterprise: ${udyam}. Turnover & Investment compliant.` },
          gstn: { status: "VERIFIED", details: `Active Regular Taxpayer: ${gstin}. GSTR-3B filings reconciled.` },
          incometax: { status: "VERIFIED", details: `PAN ${pan} Valid & Active. 3-Year ITR compliance verified.` },
          mca21: { status: "VERIFIED", details: `Active company standing. CIN: ${cin}. Zero RoC default.` },
          startupindia: { status: entityType.includes('Startup') ? "VERIFIED" : "NOT_APPLICABLE", details: "DPIIT status validated." },
          makeinindia: { 
            status: isClassI ? "VERIFIED" : "DISCREPANCY", 
            details: isClassI ? `Class-I Local Supplier (${localContent}% local value addition verified).` : `Local content (${localContent}%) below mandatory 50% Class-I threshold.`
          },
          epfo: { status: "VERIFIED", details: "Active establishment code. Monthly ECR filings current." },
          esic: { status: "VERIFIED", details: "Employer registration active and compliant." },
          nsic: { status: "NOT_APPLICABLE", details: "Direct corporate bidder." },
          oem: { status: "VERIFIED", details: "Genuine OEM MAF verified via cryptographic registry." },
          cppp_debar: { status: "VERIFIED", details: "Clean Record. Zero blacklisting or debarment records found." },
          digilocker: { status: "VERIFIED", details: "All 4 certificates validated with NeGD DigiLocker PKI timestamp." }
        },
        discrepancies: isClassI ? [] : [
          {
            portal: "Make in India (MII) Engine",
            field: "Local Content Percentage",
            claimedValue: `${localContent}%`,
            portalValue: `${localContent}% (Below 50% Threshold)`,
            severity: "MEDIUM",
            description: `Tender GEM/2026/B/892104 requires Class-I Local Supplier (>=50%). Bidder declared ${localContent}%.`,
            ruleReference: "DPIIT PPO Order P-45021/2/2017-PP (BE-II)"
          }
        ],
        documents: [
          { name: "Udyam MSME Certificate", docType: "Udyam", issuer: "Ministry of MSME", status: "VERIFIED", hashMatch: true, date: "15-May-2025", size: "1.8 MB" },
          { name: "GST Registration Certificate", docType: "GSTN", issuer: "CBIC GST", status: "VERIFIED", hashMatch: true, date: "12-Apr-2022", size: "2.1 MB" },
          { name: "MII Local Content Certificate", docType: "MII", issuer: "CA Singhal & Associates", status: isClassI ? "VERIFIED" : "DISCREPANCY", hashMatch: true, date: "02-Sep-2026", size: "3.4 MB" },
          { name: "OEM Authorization Form", docType: "OEM", issuer: "Supermicro / NVIDIA India", status: "VERIFIED", hashMatch: true, date: "01-Sep-2026", size: "1.9 MB" }
        ],
        auditTrail: [
          { time: timestampStr, action: "BID_SUBMITTED", actor: "Bidder Gateway", payloadHash: Math.random().toString(36).substring(2), details: `Bid submitted for Tender GEM/2026/B/892104 by ${companyName}.` },
          { time: timestampStr, action: "AI_PRE_CHECK_COMPLETE", actor: "VECTA AI Engine", payloadHash: Math.random().toString(36).substring(2), details: `Instant pre-check score: ${isClassI ? 94 : 68}/100.` }
        ]
      };

      window.GEM_DATA.bidders.unshift(newBidder);
      hideApplyModal();

      if (onNewBidSubmitted) {
        onNewBidSubmitted(newBidder);
      }
    };
  }
};

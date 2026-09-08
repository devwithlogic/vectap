/**
 * VECTA: Main Application Controller
 * Handles user interactions, tabs, live simulations, officer actions, and rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    activeBidderId: 'bidder-01',
    activeTab: 'cross-check',
    filterRisk: 'ALL',
    searchQuery: '',
    isSimulating: false
  };

  // DOM Elements
  const bidderListEl = document.getElementById('bidderList');
  const bidderDetailEl = document.getElementById('bidderDetail');
  const portalRibbonEl = document.getElementById('portalRibbon');
  const searchInput = document.getElementById('bidderSearch');
  const riskFilterBtns = document.querySelectorAll('.risk-filter-btn');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const simulationModal = document.getElementById('simulationModal');
  const documentModal = document.getElementById('documentModal');
  const reportModal = document.getElementById('reportModal');
  const toastContainer = document.getElementById('toastContainer');

  // Initialize
  init();

  function init() {
    renderPortalRibbon();
    renderBidderList();
    renderBidderDetail();
    attachEventListeners();
  }

  // Render Portals Ribbon (12 Connected Databases)
  function renderPortalRibbon() {
    if (!portalRibbonEl) return;
    const portals = window.GEM_DATA.portals;

    portalRibbonEl.innerHTML = portals.map(p => `
      <div class="portal-badge" title="${p.authority} - ${p.description}">
        <span class="w-2 h-2 rounded-full bg-emerald-600 mr-2 pulse-dot"></span>
        <i class="fa-solid ${p.icon} mr-1.5 text-rust-primary text-xs"></i>
        <span>${p.name}</span>
        <span class="ml-1.5 text-[10px] text-stone-500 font-mono">(${p.latencyMs}ms)</span>
      </div>
    `).join('');
  }

  // Render Bidder Cards List
  function renderBidderList() {
    if (!bidderListEl) return;
    const bidders = window.GEM_DATA.bidders;

    const filtered = bidders.filter(b => {
      const matchesRisk = state.filterRisk === 'ALL' || b.riskLevel === state.filterRisk;
      const q = state.searchQuery.toLowerCase();
      const matchesSearch = b.name.toLowerCase().includes(q) || b.gstin.toLowerCase().includes(q) || b.pan.toLowerCase().includes(q);
      return matchesRisk && matchesSearch;
    });

    if (filtered.length === 0) {
      bidderListEl.innerHTML = `
        <div class="p-6 text-center text-stone-500 bg-white rounded-xl border border-stone-200">
          <i class="fa-solid fa-folder-open text-3xl mb-2 text-rust-300"></i>
          <p class="font-medium">No bidders matching current filter</p>
        </div>
      `;
      return;
    }

    bidderListEl.innerHTML = filtered.map(b => {
      const isActive = b.id === state.activeBidderId;
      const riskClass = b.riskLevel === 'LOW' ? 'badge-low-risk' : b.riskLevel === 'MEDIUM' ? 'badge-med-risk' : 'badge-critical-risk';
      const riskIcon = b.riskLevel === 'LOW' ? 'fa-circle-check' : b.riskLevel === 'MEDIUM' ? 'fa-triangle-exclamation' : 'fa-circle-xmark';

      let decisionPill = '';
      if (b.officerDecision?.status === 'APPROVED') {
        decisionPill = `<span class="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full"><i class="fa-solid fa-check mr-1"></i>Approved</span>`;
      } else if (b.officerDecision?.status === 'DISQUALIFIED') {
        decisionPill = `<span class="text-[11px] font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full"><i class="fa-solid fa-ban mr-1"></i>Disqualified</span>`;
      } else {
        decisionPill = `<span class="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full"><i class="fa-solid fa-clock mr-1"></i>Action Req.</span>`;
      }

      return `
        <div class="bidder-card p-4 rounded-xl cursor-pointer mb-3 ${isActive ? 'active' : ''}" data-bidder-id="${b.id}">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h4 class="font-semibold text-stone-900 text-sm leading-snug">${b.name}</h4>
              <p class="text-xs text-stone-500 mt-0.5 font-mono">GSTIN: ${b.gstin}</p>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full ${riskClass}">
                <i class="fa-solid ${riskIcon} mr-1 text-[10px]"></i>${b.riskLevel}
              </span>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-stone-500">Score:</span>
              <span class="font-bold text-sm ${b.complianceScore >= 80 ? 'text-emerald-700' : b.complianceScore >= 60 ? 'text-amber-700' : 'text-rose-700'}">${b.complianceScore}/100</span>
            </div>
            <div>
              ${decisionPill}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click handlers to cards
    document.querySelectorAll('.bidder-card').forEach(card => {
      card.addEventListener('click', () => {
        state.activeBidderId = card.getAttribute('data-bidder-id');
        renderBidderList();
        renderBidderDetail();
      });
    });
  }

  // Render Detailed Bidder Inspector
  function renderBidderDetail() {
    if (!bidderDetailEl) return;
    const bidder = window.GEM_DATA.bidders.find(b => b.id === state.activeBidderId);
    if (!bidder) return;

    // Header Details
    document.getElementById('detailBidderName').textContent = bidder.name;
    document.getElementById('detailBidderMeta').innerHTML = `
      <span><strong class="text-stone-700">Entity:</strong> ${bidder.companyType}</span>
      <span class="mx-2 text-stone-300">•</span>
      <span><strong class="text-stone-700">CIN:</strong> ${bidder.cin}</span>
      <span class="mx-2 text-stone-300">•</span>
      <span><strong class="text-stone-700">PAN:</strong> ${bidder.pan}</span>
      <span class="mx-2 text-stone-300">•</span>
      <span><strong class="text-stone-700">Bid Quote:</strong> <span class="font-semibold text-rust-700">${bidder.bidQuote}</span></span>
    `;

    // Badges & Score
    const scoreValEl = document.getElementById('detailScoreValue');
    const riskBadgeEl = document.getElementById('detailRiskBadge');
    const recBadgeEl = document.getElementById('detailRecBadge');

    scoreValEl.textContent = `${bidder.complianceScore}/100`;
    scoreValEl.className = `text-2xl font-black ${bidder.complianceScore >= 80 ? 'text-emerald-700' : bidder.complianceScore >= 60 ? 'text-amber-700' : 'text-rose-700'}`;

    riskBadgeEl.textContent = `${bidder.riskLevel} RISK`;
    riskBadgeEl.className = `text-xs font-bold px-3 py-1 rounded-full ${bidder.riskLevel === 'LOW' ? 'badge-low-risk' : bidder.riskLevel === 'MEDIUM' ? 'badge-med-risk' : 'badge-critical-risk'}`;

    recBadgeEl.textContent = `REC: ${bidder.recommendation.replace('_', ' ')}`;
    recBadgeEl.className = `text-xs font-semibold px-3 py-1 rounded-full ${bidder.recommendation === 'QUALIFY' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : bidder.recommendation === 'SEEK_CLARIFICATION' ? 'bg-amber-50 text-amber-800 border border-amber-300' : 'bg-rose-50 text-rose-800 border border-rose-300'}`;

    // Render Tab Content
    renderTabContent(bidder);
  }

  // Render Dynamic Tab Contents
  function renderTabContent(bidder) {
    const tabContentContainer = document.getElementById('tabContentContainer');
    if (!tabContentContainer) return;

    if (state.activeTab === 'cross-check') {
      tabContentContainer.innerHTML = generateCrossCheckHTML(bidder);
    } else if (state.activeTab === 'documents') {
      tabContentContainer.innerHTML = generateDocumentsHTML(bidder);
      attachDocumentPreviewEvents(bidder);
    } else if (state.activeTab === 'checklist') {
      tabContentContainer.innerHTML = generateChecklistHTML(bidder);
    } else if (state.activeTab === 'decision') {
      tabContentContainer.innerHTML = generateDecisionHTML(bidder);
      attachDecisionEvents(bidder);
    } else if (state.activeTab === 'audit') {
      tabContentContainer.innerHTML = generateAuditTrailHTML(bidder);
    }
  }

  // TAB 1: Cross-Check & Discrepancies
  function generateCrossCheckHTML(bidder) {
    let discrepanciesHTML = '';
    if (bidder.discrepancies.length === 0) {
      discrepanciesHTML = `
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 mb-6">
          <i class="fa-solid fa-circle-check text-xl text-emerald-600"></i>
          <div>
            <h5 class="font-semibold text-sm">Zero Data Discrepancies Detected</h5>
            <p class="text-xs text-emerald-700 mt-0.5">Bidder's self-declarations perfectly reconcile with records across all 12 integrated Government portals.</p>
          </div>
        </div>
      `;
    } else {
      discrepanciesHTML = `
        <div class="mb-6">
          <h4 class="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation"></i>
            Active Inconsistencies & Flags (${bidder.discrepancies.length})
          </h4>
          <div class="space-y-3">
            ${bidder.discrepancies.map(d => `
              <div class="discrepancy-card p-4 rounded-xl">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-[11px] font-bold text-rust-700 uppercase bg-rust-50 px-2 py-0.5 rounded border border-rust-200">${d.portal}</span>
                    <h5 class="font-semibold text-stone-900 text-sm mt-1">${d.field}</h5>
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${d.severity === 'CRITICAL' ? 'bg-rose-900 text-white' : d.severity === 'HIGH' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
                    ${d.severity} SEVERITY
                  </span>
                </div>
                <p class="text-xs text-stone-700 mt-2 leading-relaxed">${d.description}</p>
                <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-2.5 rounded-lg border border-stone-200 text-xs font-mono">
                  <div class="border-l-2 border-amber-500 pl-2">
                    <span class="text-stone-500 text-[10px] uppercase block">Declared in Bid:</span>
                    <span class="text-stone-800 font-medium">${d.claimedValue}</span>
                  </div>
                  <div class="border-l-2 border-rose-500 pl-2">
                    <span class="text-stone-500 text-[10px] uppercase block">Government Portal Live Data:</span>
                    <span class="text-rose-700 font-bold">${d.portalValue}</span>
                  </div>
                </div>
                <div class="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                  <i class="fa-solid fa-scale-balanced text-rust-600"></i>
                  <span>Regulatory Clause: <strong>${d.ruleReference}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Portal Verification Grid (12 Cards)
    const portalsGridHTML = window.GEM_DATA.portals.map(p => {
      const v = bidder.portalVerifications[p.id] || { status: 'VERIFIED', details: 'Record confirmed.' };
      let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      let statusIcon = 'fa-check';

      if (v.status === 'FAILED') {
        statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
        statusIcon = 'fa-xmark';
      } else if (v.status === 'WARNING' || v.status === 'DISCREPANCY') {
        statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
        statusIcon = 'fa-exclamation';
      } else if (v.status === 'NOT_APPLICABLE') {
        statusColor = 'text-stone-600 bg-stone-100 border-stone-200';
        statusIcon = 'fa-minus';
      }

      return `
        <div class="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-rust-300 transition shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <i class="fa-solid ${p.icon} text-rust-600 text-sm"></i>
              <span class="font-semibold text-stone-800 text-xs">${p.name}</span>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}">
              <i class="fa-solid ${statusIcon} mr-1 text-[9px]"></i>${v.status}
            </span>
          </div>
          <p class="text-xs text-stone-600 leading-relaxed font-sans">${v.details}</p>
          <div class="mt-2 text-[10px] text-stone-400 font-mono flex items-center justify-between border-t border-stone-100 pt-1.5">
            <span>Auth: ${p.authority.slice(0, 26)}...</span>
            <span class="text-emerald-600"><i class="fa-solid fa-signal mr-1"></i>${p.latencyMs}ms</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      ${discrepanciesHTML}
      <div>
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <i class="fa-solid fa-server text-rust-600"></i>
            Live Multi-Portal Handshake & Extraction Status (12 Portals)
          </h4>
          <span class="text-xs text-stone-500 font-mono">Last Synchronized: 08-Sep-2026 19:40 IST</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          ${portalsGridHTML}
        </div>
      </div>
    `;
  }

  // TAB 2: Document Inspection & DigiLocker OCR
  function generateDocumentsHTML(bidder) {
    return `
      <div>
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700">Submitted Bid Certificates & DigiLocker Verifications</h4>
            <p class="text-xs text-stone-500 mt-0.5">Automated OCR extraction, SHA-256 hash comparison, and DigiLocker PKI digital signature checks.</p>
          </div>
          <span class="text-xs bg-rust-50 text-rust-700 border border-rust-200 font-semibold px-2.5 py-1 rounded-lg">
            <i class="fa-solid fa-shield-check mr-1.5"></i>NeGD DigiLocker Gateway
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${bidder.documents.map((doc, idx) => `
            <div class="p-4 rounded-xl border border-stone-200 bg-white hover:shadow-md transition">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-rust-50 border border-rust-200 flex items-center justify-center text-rust-700 font-bold text-sm">
                    <i class="fa-solid fa-file-invoice"></i>
                  </div>
                  <div>
                    <h5 class="font-semibold text-stone-900 text-xs">${doc.name}</h5>
                    <p class="text-[11px] text-stone-500 font-mono">Issuer: ${doc.issuer}</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'DISCREPANCY' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
                  ${doc.status}
                </span>
              </div>

              <div class="mt-3 bg-stone-50 p-2.5 rounded-lg border border-stone-100 text-[11px] text-stone-600 space-y-1">
                <div class="flex justify-between">
                  <span>Document Type:</span>
                  <span class="font-medium text-stone-800">${doc.docType}</span>
                </div>
                <div class="flex justify-between">
                  <span>Date of Issue:</span>
                  <span class="font-mono">${doc.date}</span>
                </div>
                <div class="flex justify-between">
                  <span>Digital Hash Integrity:</span>
                  <span class="${doc.hashMatch ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-bold'}">
                    ${doc.hashMatch ? '<i class="fa-solid fa-check-double mr-1"></i>Matches Issuer Ledger' : '<i class="fa-solid fa-xmark mr-1"></i>Hash Tampered / Mismatch'}
                  </span>
                </div>
              </div>

              <div class="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                <span class="text-[11px] text-stone-400 font-mono">${doc.size}</span>
                <button class="view-doc-btn text-xs font-semibold text-rust-700 hover:text-rust-900 flex items-center gap-1" data-doc-idx="${idx}">
                  <i class="fa-regular fa-eye"></i> View OCR & PKI Seal
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // TAB 3: Statutory & Tender Compliance Checklist
  function generateChecklistHTML(bidder) {
    const criteria = window.GEM_DATA.statutoryCriteria;

    return `
      <div>
        <div class="mb-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700">Tender Eligibility & Statutory Compliance Checklist</h4>
          <p class="text-xs text-stone-500 mt-0.5">Automated evaluation against Tender GEM/2026/B/892104 rules & GFR 2017 conditions.</p>
        </div>

        <div class="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-rust-subtle text-rust-900 font-semibold border-b border-stone-200">
                <th class="p-3">#</th>
                <th class="p-3">Compliance Criteria</th>
                <th class="p-3">Category</th>
                <th class="p-3">Tender Mandate</th>
                <th class="p-3">Portal Verified Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${criteria.map((c, idx) => {
                const pv = bidder.portalVerifications[c.portalId] || { status: 'VERIFIED', details: 'Complies.' };
                const isSuccess = pv.status === 'VERIFIED';
                const isFail = pv.status === 'FAILED';

                return `
                  <tr class="hover:bg-stone-50">
                    <td class="p-3 font-mono text-stone-500">${idx + 1}</td>
                    <td class="p-3 font-semibold text-stone-900">${c.label}</td>
                    <td class="p-3"><span class="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px]">${c.category}</span></td>
                    <td class="p-3 text-stone-600">${c.tenderRequirement}</td>
                    <td class="p-3">
                      <span class="inline-flex items-center gap-1.5 font-bold px-2.5 py-1 rounded-full text-[11px] ${isSuccess ? 'bg-emerald-100 text-emerald-800' : isFail ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}">
                        <i class="fa-solid ${isSuccess ? 'fa-check' : isFail ? 'fa-xmark' : 'fa-triangle-exclamation'} text-[10px]"></i>
                        ${pv.status}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // TAB 4: AI Recommendation & Officer Decision Workspace
  function generateDecisionHTML(bidder) {
    const isApproved = bidder.officerDecision?.status === 'APPROVED';
    const isDisqualified = bidder.officerDecision?.status === 'DISQUALIFIED';
    const isPending = bidder.officerDecision?.status === 'PENDING_CLARIFICATION';

    return `
      <div>
        <!-- AI Executive Recommendation Banner -->
        <div class="p-5 rounded-xl border border-rust-200 bg-gradient-to-r from-rust-50 via-white to-rust-50 mb-6 shadow-sm">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-full bg-rust-700 text-white flex items-center justify-center flex-shrink-0 text-lg shadow-sm">
              <i class="fa-solid fa-microchip-ai"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-sm text-rust-900 uppercase">AI Recommendation Engine Assessment</h4>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${bidder.recommendation === 'QUALIFY' ? 'bg-emerald-200 text-emerald-900' : bidder.recommendation === 'SEEK_CLARIFICATION' ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}">
                  ${bidder.recommendation.replace('_', ' ')}
                </span>
              </div>
              <p class="text-xs text-stone-700 mt-2 leading-relaxed font-normal">${bidder.recommendationSummary}</p>
            </div>
          </div>
        </div>

        <!-- Procurement Officer Decision Controls -->
        <div class="p-6 rounded-xl border-2 border-rust-400 bg-white shadow-md">
          <div class="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
            <div>
              <h3 class="font-bold text-base text-rust-900 flex items-center gap-2">
                <i class="fa-solid fa-gavel text-rust-700"></i>
                Procurement Officer Statutory Decision Panel
              </h3>
              <p class="text-xs text-stone-500 mt-0.5">As per GeM Procurement Manual & GFR 2017 Rule 153, the final technical qualification decision is solely vested in the Officer.</p>
            </div>
            <div class="officer-seal text-xs">
              <i class="fa-solid fa-stamp mr-1"></i>TEC RECORD
            </div>
          </div>

          <!-- Current Decision Status -->
          <div class="mb-5 p-3.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <span class="text-stone-500">Current Determination:</span>
              <strong class="ml-1 text-sm ${isApproved ? 'text-emerald-800' : isDisqualified ? 'text-rose-800' : 'text-amber-800'}">
                ${bidder.officerDecision?.status || 'UNDER EVALUATION'}
              </strong>
              <span class="mx-2 text-stone-400">|</span>
              <span class="text-stone-500">Recorded By:</span>
              <span class="font-medium text-stone-800">${bidder.officerDecision?.decidedBy || 'Pending'}</span>
            </div>
            <span class="text-stone-400 font-mono text-[11px]">${bidder.officerDecision?.timestamp || ''}</span>
          </div>

          <!-- Remarks Input -->
          <div class="mb-5">
            <label class="block text-xs font-semibold text-stone-700 mb-1.5" for="officerRemarksInput">
              Official Technical Evaluation Remarks (Recorded permanently in Audit Log & Tender File):
            </label>
            <textarea id="officerRemarksInput" rows="3" class="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rust-500 focus:border-rust-500 font-sans" placeholder="Record reasoned justification, statutory clauses, or clarification references...">${bidder.officerDecision?.remarks || ''}</textarea>
          </div>

          <!-- Action Buttons in Rust & GovTech palette -->
          <div class="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button id="btnSeekClarification" class="px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center gap-2">
              <i class="fa-solid fa-paper-plane"></i> Issue GeM Representation Notice
            </button>
            <button id="btnDisqualify" class="px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold transition flex items-center gap-2">
              <i class="fa-solid fa-ban"></i> Disqualify Bidder
            </button>
            <button id="btnApproveQualify" class="px-5 py-2.5 rounded-lg bg-rust-700 hover:bg-rust-800 text-white shadow-md text-xs font-bold transition flex items-center gap-2">
              <i class="fa-solid fa-check-double"></i> Qualify Bidder for Commercial Stage
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // TAB 5: Immutable Verifiable Audit Trail
  function generateAuditTrailHTML(bidder) {
    return `
      <div>
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700">Immutable Cryptographic Audit Trail</h4>
            <p class="text-xs text-stone-500 mt-0.5">Every API handshake, document verification hash, and officer action is stamped with SHA-256 payload integrity.</p>
          </div>
          <button id="btnExportAuditLedger" class="text-xs text-rust-700 hover:text-rust-900 font-semibold border border-rust-300 bg-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
            <i class="fa-solid fa-download"></i> Download Audit Log
          </button>
        </div>

        <div class="relative pl-6 space-y-6">
          <div class="timeline-stem"></div>
          ${bidder.auditTrail.map(log => `
            <div class="relative flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-white border-2 border-rust-600 text-rust-700 flex items-center justify-center flex-shrink-0 z-10 text-xs shadow-sm">
                <i class="fa-solid fa-fingerprint"></i>
              </div>
              <div class="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex-1">
                <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span class="text-xs font-bold text-rust-900 font-mono uppercase">${log.action}</span>
                  <span class="text-[11px] text-stone-400 font-mono">${log.time}</span>
                </div>
                <p class="text-xs text-stone-700 mb-2 leading-relaxed">${log.details}</p>
                <div class="flex items-center justify-between text-[10px] text-stone-500 bg-stone-50 p-2 rounded border border-stone-100 font-mono">
                  <span>Actor: <strong>${log.actor}</strong></span>
                  <span class="text-stone-400" title="${log.payloadHash}">Hash: ${log.payloadHash.slice(0, 18)}...</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Attach Document Preview Click Events
  function attachDocumentPreviewEvents(bidder) {
    document.querySelectorAll('.view-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-doc-idx'), 10);
        const doc = bidder.documents[idx];
        openDocumentModal(bidder, doc);
      });
    });
  }

  // Open Document Modal
  function openDocumentModal(bidder, doc) {
    if (!documentModal) return;
    const contentEl = document.getElementById('documentModalContent');

    contentEl.innerHTML = `
      <div class="p-6">
        <div class="flex items-start justify-between border-b border-stone-200 pb-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-rust-100 text-rust-800 flex items-center justify-center text-xl font-bold">
              <i class="fa-solid fa-file-shield"></i>
            </div>
            <div>
              <h3 class="font-bold text-base text-stone-900">${doc.name}</h3>
              <p class="text-xs text-stone-500 font-mono">Bidder: ${bidder.name} | Category: ${doc.docType}</p>
            </div>
          </div>
          <button id="closeDocModalBtn" class="text-stone-400 hover:text-stone-700 text-xl font-bold">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <!-- OCR Extracted Fields -->
          <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-rust-800 mb-3 flex items-center gap-1.5">
              <i class="fa-solid fa-brain"></i> AI OCR Extracted Fields
            </h4>
            <div class="space-y-2 text-xs font-mono">
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">Document Issuer:</span>
                <span class="text-stone-900 font-bold">${doc.issuer}</span>
              </div>
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">Issue Date:</span>
                <span class="text-stone-900">${doc.date}</span>
              </div>
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">Document Size:</span>
                <span class="text-stone-900">${doc.size}</span>
              </div>
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">OCR Confidence:</span>
                <span class="text-emerald-700 font-bold">99.4% Validated</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="text-stone-500">Classification:</span>
                <span class="text-rust-700 font-bold">${doc.docType}</span>
              </div>
            </div>
          </div>

          <!-- Digital Seal & Cryptographic Verification -->
          <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h4 class="text-xs font-bold uppercase tracking-wider text-rust-800 mb-3 flex items-center gap-1.5">
              <i class="fa-solid fa-signature"></i> DigiLocker PKI Seal
            </h4>
            <div class="space-y-2 text-xs font-mono">
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">PKI Verification:</span>
                <span class="${doc.hashMatch ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}">
                  ${doc.hashMatch ? 'VERIFIED VALID' : 'FAILED / COMPROMISED'}
                </span>
              </div>
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">Algorithm:</span>
                <span class="text-stone-900">RSA-2048 / SHA-256</span>
              </div>
              <div class="flex justify-between border-b border-stone-200 pb-1.5">
                <span class="text-stone-500">Timestamp Authority:</span>
                <span class="text-stone-900">National Informatics Centre (NIC-CA)</span>
              </div>
              <div class="pt-1">
                <span class="text-stone-500 text-[10px] block">SHA-256 Document Checksum:</span>
                <span class="text-[10px] text-stone-700 break-all select-all font-mono">
                  ${doc.hashMatch ? '9e382b4a39c85a32b84a39e8c5b8fdfbf7eaddcf25201f3e34326e5d59a63a29' : '0000000000000000000000000000000000000000000000000000000000000000'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-rust-50 border border-rust-200 text-xs text-rust-900 flex items-center justify-between">
          <span><i class="fa-solid fa-lock mr-2"></i>Verified against Government Master Repository on 08-Sep-2026.</span>
          <button id="btnDownloadOriginalDoc" class="font-bold text-rust-800 hover:text-rust-950 underline">Download Original e-Signed PDF</button>
        </div>
      </div>
    `;

    documentModal.classList.remove('hidden');
    documentModal.classList.add('flex');

    document.getElementById('closeDocModalBtn').onclick = () => {
      documentModal.classList.add('hidden');
      documentModal.classList.remove('flex');
    };

    document.getElementById('btnDownloadOriginalDoc').onclick = () => {
      showToast(`Downloading e-Signed ${doc.name}...`, 'info');
    };
  }

  // Attach Officer Decision Buttons Events
  function attachDecisionEvents(bidder) {
    const btnApprove = document.getElementById('btnApproveQualify');
    const btnDisqualify = document.getElementById('btnDisqualify');
    const btnClarification = document.getElementById('btnSeekClarification');
    const remarksInput = document.getElementById('officerRemarksInput');

    if (btnApprove) {
      btnApprove.onclick = () => {
        const remarks = remarksInput.value.trim() || 'Bidder technically qualified by Procurement Officer.';
        updateBidderDecision(bidder, 'APPROVED', remarks);
        showToast(`Bidder "${bidder.name}" successfully QUALIFIED!`, 'success');
      };
    }

    if (btnDisqualify) {
      btnDisqualify.onclick = () => {
        const remarks = remarksInput.value.trim() || 'Bidder disqualified under applicable procurement rules.';
        updateBidderDecision(bidder, 'DISQUALIFIED', remarks);
        showToast(`Bidder "${bidder.name}" marked as DISQUALIFIED.`, 'danger');
      };
    }

    if (btnClarification) {
      btnClarification.onclick = () => {
        const remarks = remarksInput.value.trim() || 'Notice issued under GeM Clause 4.3 seeking statutory clarification.';
        updateBidderDecision(bidder, 'PENDING_CLARIFICATION', remarks);
        showToast(`GeM Representation Notice issued for "${bidder.name}".`, 'warning');
      };
    }
  }

  // Update Bidder Decision State
  function updateBidderDecision(bidder, status, remarks) {
    const now = new Date();
    const timestampStr = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} IST`;

    bidder.officerDecision = {
      status: status,
      decidedBy: "Shri R. K. Sharma (TEC Chairman)",
      timestamp: timestampStr,
      remarks: remarks
    };

    // Append to audit trail
    bidder.auditTrail.push({
      time: timestampStr,
      action: `OFFICER_${status}`,
      actor: "Shri R. K. Sharma (TEC Chairman)",
      payloadHash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      details: `Officer Determination: ${status}. Remarks: ${remarks}`
    });

    renderBidderList();
    renderBidderDetail();
  }

  // Live Verification Simulation Flow
  const startSimulationBtn = document.getElementById('btnStartSimulation');
  if (startSimulationBtn) {
    startSimulationBtn.onclick = () => {
      runLiveVerificationModal(state.activeBidderId);
    };
  }

  function runLiveVerificationModal(bidderId) {
    if (!simulationModal) return;
    const bidder = window.GEM_DATA.bidders.find(b => b.id === bidderId);
    if (!bidder) return;

    simulationModal.classList.remove('hidden');
    simulationModal.classList.add('flex');

    const progressBar = document.getElementById('simProgressBar');
    const progressPercent = document.getElementById('simProgressPercent');
    const currentStage = document.getElementById('simCurrentStage');
    const logConsole = document.getElementById('simLogConsole');
    const simCloseBtn = document.getElementById('simCloseBtn');

    logConsole.innerHTML = '';
    simCloseBtn.disabled = true;
    simCloseBtn.classList.add('opacity-50', 'cursor-not-allowed');

    window.verificationEngine.simulateLiveVerification(bidderId, (event) => {
      if (progressBar) progressBar.style.width = `${event.percent}%`;
      if (progressPercent) progressPercent.textContent = `${event.percent}%`;
      if (currentStage) currentStage.textContent = event.stage;

      if (logConsole) {
        const logLine = document.createElement('div');
        logLine.className = 'text-xs font-mono py-1 border-b border-stone-800 flex items-start gap-2';
        logLine.innerHTML = `
          <span class="text-rust-400 select-none">></span>
          <span class="text-stone-300">${event.log}</span>
        `;
        logConsole.appendChild(logLine);
        logConsole.scrollTop = logConsole.scrollHeight;
      }

      if (event.percent === 100) {
        simCloseBtn.disabled = false;
        simCloseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        showToast(`Live multi-portal verification complete for ${bidder.name}`, 'success');
      }
    });

    simCloseBtn.onclick = () => {
      simulationModal.classList.add('hidden');
      simulationModal.classList.remove('flex');
      renderBidderDetail();
    };
  }

  // Technical Evaluation Report Modal & Print
  const btnExportTEC = document.getElementById('btnExportTEC');
  if (btnExportTEC) {
    btnExportTEC.onclick = () => {
      if (!reportModal) return;
      const reportContent = document.getElementById('reportModalContent');
      reportContent.innerHTML = window.verificationEngine.generateTECSummaryHTML();
      reportModal.classList.remove('hidden');
      reportModal.classList.add('flex');

      document.getElementById('closeReportModalBtn').onclick = () => {
        reportModal.classList.add('hidden');
        reportModal.classList.remove('flex');
      };

      document.getElementById('btnPrintReportBtn').onclick = () => {
        window.print();
      };
    };
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-emerald-800 text-white' : type === 'danger' ? 'bg-rose-800 text-white' : type === 'warning' ? 'bg-amber-800 text-white' : 'bg-rust-800 text-white';
    const icon = type === 'success' ? 'fa-circle-check' : type === 'danger' ? 'fa-ban' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-xs font-medium ${bgClass} transition-all transform duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-sm"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Animate out & destroy
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // General Event Listeners
  function attachEventListeners() {
    // Risk Filter Buttons
    riskFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        riskFilterBtns.forEach(b => b.classList.remove('bg-rust-700', 'text-white', 'font-bold'));
        riskFilterBtns.forEach(b => b.classList.add('bg-white', 'text-stone-700'));
        btn.classList.remove('bg-white', 'text-stone-700');
        btn.classList.add('bg-rust-700', 'text-white', 'font-bold');

        state.filterRisk = btn.getAttribute('data-risk');
        renderBidderList();
      });
    });

    // Search Input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        renderBidderList();
      });
    }

    // Tab Navigation
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeTab = btn.getAttribute('data-tab');
        const bidder = window.GEM_DATA.bidders.find(b => b.id === state.activeBidderId);
        if (bidder) renderTabContent(bidder);
      });
    });

    // Preface Toggle ("Explore Legacy Paper Burden")
    const prefaceToggleBtn = document.getElementById('prefaceToggleBtn');
    const prefaceDetails = document.getElementById('prefaceDetails');
    if (prefaceToggleBtn && prefaceDetails) {
      prefaceToggleBtn.onclick = () => {
        prefaceDetails.classList.toggle('hidden');
        if (prefaceDetails.classList.contains('hidden')) {
          prefaceToggleBtn.innerHTML = `<i class="fa-solid fa-circle-info mr-1.5"></i> Why VECTA? (The Paperwork Crisis)`;
        } else {
          prefaceToggleBtn.innerHTML = `<i class="fa-solid fa-chevron-up mr-1.5"></i> Hide Paperwork Crisis Analysis`;
        }
      };
    }

    // Apply for Tender Modal Handlers
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
        showToast("DigiLocker PKI linked: 4 verified statutory certificates auto-fetched successfully!", "success");
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
            { time: timestampStr, action: "BID_SUBMITTED", actor: "Bidder Gateway", payloadHash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2), details: `Bid submitted for Tender GEM/2026/B/892104 by ${companyName}.` },
            { time: timestampStr, action: "AI_PRE_CHECK_COMPLETE", actor: "VECTA AI Engine", payloadHash: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2), details: `Instant pre-check score: ${isClassI ? 94 : 68}/100.` }
          ]
        };

        // Prepend to bidders
        window.GEM_DATA.bidders.unshift(newBidder);
        state.activeBidderId = newId;

        hideApplyModal();
        renderBidderList();
        renderBidderDetail();

        showToast(`Bid submitted for "${companyName}"! Starting VECTA live verification...`, 'success');
        
        // Trigger live simulation modal for instant feedback
        runLiveVerificationModal(newId);
      };
    }
  }
});

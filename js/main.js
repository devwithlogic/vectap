import { initDrawer } from './ui/drawer.js';
import { renderCollusionTab } from './ui/tab-collusion.js';
import { renderXAITab } from './ui/tab-xai.js';
import { initForgeryModal } from './ui/modal-forgery.js';
import { renderLifecycleTab } from './ui/tab-lifecycle.js';
import { initChatbot } from './ui/chatbot.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (window.loadComponents) await window.loadComponents();

  const state = { activeBidderId: 'bidder-01', activeTab: 'cross-check', filterRisk: 'ALL', searchQuery: '' };

  window.renderPortalRibbon();
  window.renderBidderList(state, onSelectBidder);
  renderBidderDetail();
  attachEventListeners();

  initDrawer();
  initForgeryModal();
  initChatbot();

  window.initApplyModal((newBidder) => {
    state.activeBidderId = newBidder.id;
    window.renderBidderList(state, onSelectBidder);
    renderBidderDetail();
    window.showToast(`Bid submitted for "${newBidder.name}"! Starting live verification...`, 'success');
    window.runLiveVerificationModal(newBidder.id, () => renderBidderDetail());
  });

  window.initReportModal();

  function onSelectBidder(id) {
    state.activeBidderId = id;
    window.renderBidderList(state, onSelectBidder);
    renderBidderDetail();
  }

  function renderBidderDetail() {
    const bidder = window.GEM_DATA.bidders.find(b => b.id === state.activeBidderId);
    if (!bidder) return;

    const nameEl = document.getElementById('detailBidderName');
    const metaEl = document.getElementById('detailBidderMeta');
    const scoreValEl = document.getElementById('detailScoreValue');
    const riskBadgeEl = document.getElementById('detailRiskBadge');
    const recBadgeEl = document.getElementById('detailRecBadge');

    if (nameEl) nameEl.textContent = bidder.name;
    if (metaEl) {
      metaEl.innerHTML = `
        <span><strong class="text-slate-700">Entity:</strong> ${bidder.companyType}</span>
        <span class="mx-2 text-slate-300">•</span>
        <span><strong class="text-slate-700">CIN:</strong> ${bidder.cin}</span>
        <span class="mx-2 text-slate-300">•</span>
        <span><strong class="text-slate-700">PAN:</strong> ${bidder.pan}</span>
        <span class="mx-2 text-slate-300">•</span>
        <span><strong class="text-slate-700">Bid Quote:</strong> <span class="font-semibold text-blue-900">${bidder.bidQuote}</span></span>
      `;
    }

    if (scoreValEl) {
      scoreValEl.textContent = `${bidder.complianceScore}/100`;
      scoreValEl.className = `text-2xl font-black ${bidder.complianceScore >= 80 ? 'text-emerald-700' : bidder.complianceScore >= 60 ? 'text-amber-700' : 'text-rose-700'}`;
    }

    if (riskBadgeEl) {
      riskBadgeEl.textContent = `${bidder.riskLevel} RISK`;
      riskBadgeEl.className = `text-xs font-bold px-3 py-1 rounded-full ${bidder.riskLevel === 'LOW' ? 'badge-low-risk' : bidder.riskLevel === 'MEDIUM' ? 'badge-med-risk' : 'badge-critical-risk'}`;
    }

    if (recBadgeEl) {
      recBadgeEl.textContent = `REC: ${bidder.recommendation.replace('_', ' ')}`;
      recBadgeEl.className = `text-xs font-semibold px-3 py-1 rounded-full ${bidder.recommendation === 'QUALIFY' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : bidder.recommendation === 'SEEK_CLARIFICATION' ? 'bg-amber-50 text-amber-800 border border-amber-300' : 'bg-rose-50 text-rose-800 border border-rose-300'}`;
    }

    renderTabContent(bidder);
  }

  function renderTabContent(bidder) {
    const c = document.getElementById('tabContentContainer');
    if (!c) return;

    if (state.activeTab === 'cross-check') c.innerHTML = window.generateCrossCheckHTML(bidder);
    else if (state.activeTab === 'collusion') renderCollusionTab(c, bidder);
    else if (state.activeTab === 'xai') renderXAITab(c, bidder);
    else if (state.activeTab === 'lifecycle') renderLifecycleTab(c);
    else if (state.activeTab === 'documents') {
      c.innerHTML = window.generateDocumentsHTML(bidder);
      document.querySelectorAll('.view-doc-btn').forEach(btn => {
        btn.onclick = () => window.openDocumentModal(bidder, bidder.documents[parseInt(btn.getAttribute('data-doc-idx'), 10)]);
      });
    } else if (state.activeTab === 'checklist') c.innerHTML = window.generateChecklistHTML(bidder);
    else if (state.activeTab === 'decision') {
      c.innerHTML = window.generateDecisionHTML(bidder);
      attachDecisionButtons(bidder);
    } else if (state.activeTab === 'audit') c.innerHTML = window.generateAuditTrailHTML(bidder);
  }

  function attachDecisionButtons(bidder) {
    const remarksInput = document.getElementById('officerRemarksInput');
    const updateDecision = (status, defaultRemarks, toastMsg, toastType) => {
      const remarks = remarksInput?.value.trim() || defaultRemarks;
      const ts = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST';
      bidder.officerDecision = { status, decidedBy: "Shri R. K. Sharma (TEC Chairman)", timestamp: ts, remarks };
      bidder.auditTrail.push({ time: ts, action: `OFFICER_${status}`, actor: "Shri R. K. Sharma (TEC Chairman)", payloadHash: Math.random().toString(36).substring(2), details: `Determination: ${status}. Remarks: ${remarks}` });
      window.renderBidderList(state, onSelectBidder);
      renderBidderDetail();
      window.showToast(toastMsg, toastType);
    };

    const map = [
      { id: 'btnApproveQualify', s: 'APPROVED', r: 'Bidder technically qualified.', m: `Bidder "${bidder.name}" QUALIFIED!`, t: 'success' },
      { id: 'btnDisqualify', s: 'DISQUALIFIED', r: 'Disqualified under procurement rules.', m: `Bidder "${bidder.name}" DISQUALIFIED.`, t: 'danger' },
      { id: 'btnSeekClarification', s: 'PENDING_CLARIFICATION', r: 'Notice issued under GeM 4.3.', m: `Representation notice issued for "${bidder.name}".`, t: 'warning' }
    ];
    map.forEach(({ id, s, r, m, t }) => {
      const btn = document.getElementById(id);
      if (btn) btn.onclick = () => updateDecision(s, r, m, t);
    });
  }

  function attachEventListeners() {
    const searchInput = document.getElementById('bidderSearch');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.searchQuery = e.target.value.trim();
        window.renderBidderList(state, onSelectBidder);
      };
    }

    document.querySelectorAll('.risk-filter-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.risk-filter-btn').forEach(b => {
          b.classList.remove('bg-blue-900', 'text-white', 'font-bold');
          b.classList.add('bg-white', 'text-slate-700');
        });
        btn.classList.remove('bg-white', 'text-slate-700');
        btn.classList.add('bg-blue-900', 'text-white', 'font-bold');
        state.filterRisk = btn.getAttribute('data-risk');
        window.renderBidderList(state, onSelectBidder);
      };
    });

    const bindTabs = () => {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.activeTab = btn.getAttribute('data-tab');
          const bidder = window.GEM_DATA.bidders.find(b => b.id === state.activeBidderId);
          if (bidder) renderTabContent(bidder);
        };
      });
    };
    bindTabs();

    window.addEventListener('switch-tab', (e) => {
      const tabTarget = e.detail?.tabId?.replace('tab-', '');
      const btn = document.querySelector(`.tab-btn[data-tab="${tabTarget}"]`);
      if (btn) btn.click();
    });

    const simBtn = document.getElementById('btnStartSimulation');
    if (simBtn) simBtn.onclick = () => window.runLiveVerificationModal(state.activeBidderId, () => renderBidderDetail());

    const prefaceBtn = document.getElementById('prefaceToggleBtn');
    const prefaceDetails = document.getElementById('prefaceDetails');
    if (prefaceBtn && prefaceDetails) {
      prefaceBtn.onclick = () => {
        prefaceDetails.classList.toggle('hidden');
        prefaceBtn.innerHTML = prefaceDetails.classList.contains('hidden')
          ? `<i class="fa-solid fa-circle-info mr-1.5"></i> Why VECTA? (The Paperwork Crisis)`
          : `<i class="fa-solid fa-chevron-up mr-1.5"></i> Hide Paperwork Crisis Analysis`;
      };
    }
  }
});

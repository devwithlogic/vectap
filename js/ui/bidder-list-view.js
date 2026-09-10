/**
 * VECTA: Bidder Cards Directory View
 */

window.renderBidderList = function(state, onSelectBidder) {
  const bidderListEl = document.getElementById('bidderList');
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

  document.querySelectorAll('.bidder-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-bidder-id');
      if (onSelectBidder) onSelectBidder(id);
    });
  });
};

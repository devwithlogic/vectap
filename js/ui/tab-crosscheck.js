/**
 * VECTA: Tab 1 - AI Cross-Checks & Multi-Portal Discrepancies View
 */

window.generateCrossCheckHTML = function(bidder) {
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

  // 12 Connected Portals Status Cards
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

    const confScore = p.id === 'gst' ? 98 : p.id === 'udyam' ? 99 : p.id === 'epfo' ? 92 : p.id === 'maf' ? 34 : 96;
    const confClass = confScore >= 90 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : confScore >= 70 ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-rose-700 bg-rose-50 border-rose-200';

    return `
      <div class="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <i class="fa-solid ${p.icon} text-blue-900 text-sm"></i>
            <span class="font-semibold text-slate-800 text-xs">${p.name}</span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}">
            <i class="fa-solid ${statusIcon} mr-1 text-[9px]"></i>${v.status}
          </span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed font-sans">${v.details}</p>
        
        <!-- USP 6: Confidence Score & Freshness Telemetry -->
        <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span class="confidence-pill ${confClass}">
            <i class="fa-solid fa-gauge-high"></i> ${confScore}% Confidence
          </span>
          <span class="text-slate-400 font-mono"><i class="fa-solid fa-clock-rotate-left mr-1"></i>${p.latencyMs}ms</span>
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
};

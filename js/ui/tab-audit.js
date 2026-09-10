/**
 * VECTA: Tab 5 - Immutable Cryptographic Audit Trail View
 */

window.generateAuditTrailHTML = function(bidder) {
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
};

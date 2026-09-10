/**
 * VECTA: Tab 4 - Procurement Officer Statutory Decision Workspace
 */

window.generateDecisionHTML = function(bidder) {
  const isApproved = bidder.officerDecision?.status === 'APPROVED';
  const isDisqualified = bidder.officerDecision?.status === 'DISQUALIFIED';

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
};

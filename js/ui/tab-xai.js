// USP 2: Explainable AI (XAI) Scoring Breakdown Controller
export function renderXAITab(container, bidder) {
  const xaiMap = window.GEM_XAI_DATA || {};
  const data = xaiMap[bidder.id] || xaiMap['B001'];
  if (!container || !data) return;

  const factorRows = data.factors.map(f => {
    const isPass = f.status === 'PASS';
    const isFail = f.status === 'FAIL';
    const bgClass = isPass ? 'bg-emerald-50 border-emerald-200' : isFail ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200';
    const deltaText = f.delta === 0 ? '0 pts' : `${f.delta} pts`;
    const deltaBadge = f.delta === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';

    return `
      <div class="p-3.5 rounded-xl border ${bgClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div class="space-y-1 flex-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800">${f.name}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded font-bold ${deltaBadge}">${deltaText}</span>
          </div>
          <p class="text-[11px] text-slate-600 flex items-center gap-1">
            <i class="fa-solid fa-scale-balanced text-blue-900"></i>
            <span><strong>Regulatory Clause:</strong> ${f.citation}</span>
          </p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-center">
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${isPass ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}">
            ${f.status}
          </span>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-4 rounded-xl border border-blue-800/40 shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-lg bg-blue-900/80 border border-blue-500 flex items-center justify-center text-amber-400">
              <i class="fa-solid fa-brain text-base"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Explainable AI (XAI) Compliance Waterfall</h3>
              <p class="text-[11px] text-blue-200">Transparent point-by-point deduction justification for CAG & Government Audits</p>
            </div>
          </div>
          <div class="bg-blue-900/60 px-3.5 py-1.5 rounded-lg border border-blue-700/50 text-right">
            <span class="text-[10px] text-blue-200 uppercase font-bold block">Final Explained Score</span>
            <span class="text-lg font-black font-mono text-amber-300">${data.finalScore} / 100</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div class="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
          <span class="font-bold text-slate-800">Scoring Factor & Attribution Rationale</span>
          <span class="text-slate-500">Base Score: 100 Points</span>
        </div>
        <div class="space-y-2.5">
          ${factorRows}
        </div>
      </div>

      <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <i class="fa-solid fa-shield-halved text-blue-900 text-sm mt-0.5"></i>
        <div>
          <span class="font-bold text-slate-800 block mb-0.5">Audit-Proof Transparency Commitment</span>
          <p class="text-[11px] leading-relaxed">
            Every point deducted maps directly to General Financial Rules (GFR) 2017, Public Procurement Order (PPO) 2017, or GeM General Terms and Conditions. Black-box algorithmic decisions are completely eliminated.
          </p>
        </div>
      </div>
    </div>
  `;
}

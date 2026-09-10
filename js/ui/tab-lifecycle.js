// USP 4: Post-Award Continuous Monitoring Lifecycle View
export function renderLifecycleTab(container) {
  const data = window.GEM_LIFECYCLE_DATA;
  if (!container || !data || !data.length) return;
  const contract = data[0];

  const checkpointRows = contract.checkpoints.map(cp => `
    <div class="lifecycle-step ${cp.alert ? 'warning' : 'active'} pb-4">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-slate-800">${cp.period}</span>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded ${cp.alert ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
          ${cp.gstStatus === 'ACTIVE' ? 'GSTR-3B OK' : 'GSTR-3B DEFAULTED'}
        </span>
      </div>
      <p class="text-[11px] text-slate-600 mt-1">${cp.incident}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-amber-950 via-slate-900 to-blue-950 text-white p-4 rounded-xl border border-amber-800/40 shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-lg bg-amber-900/80 border border-amber-500 flex items-center justify-center text-amber-300">
              <i class="fa-solid fa-timeline text-base"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Post-Award Contract Continuous Monitoring</h3>
              <p class="text-[11px] text-amber-200">Periodic automated statutory health checks for active awarded vendors</p>
            </div>
          </div>
          <span class="bg-rose-900 text-rose-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-600">
            ACTION REQUIRED: CLAUSE 19(a)
          </span>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-bold block">Contract Ref</span>
            <span class="font-mono font-bold text-slate-800">${contract.contractId}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-bold block">Awardee Vendor</span>
            <span class="font-bold text-slate-800">${contract.vendorName}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 uppercase font-bold block">Award Value</span>
            <span class="font-mono font-bold text-amber-600">${contract.awardedValue}</span>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-clock-rotate-left text-blue-900"></i> Milestone Audit Log
          </h4>
          <div class="border-l-2 border-slate-200 ml-2 space-y-3">
            ${checkpointRows}
          </div>
        </div>

        <div class="bg-rose-50 border border-rose-200 p-3.5 rounded-xl flex items-center justify-between gap-3">
          <div>
            <span class="text-rose-800 font-bold block mb-0.5">Automated Alert: Vendor Default Detected</span>
            <p class="text-rose-700 text-[11px]">${contract.recommendedAction}</p>
          </div>
          <button id="btnFreezeSecurity" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs transition whitespace-nowrap shadow-sm">
            Freeze PBG (GeM Cl. 19)
          </button>
        </div>
      </div>
    </div>
  `;

  const btnFreeze = document.getElementById('btnFreezeSecurity');
  if (btnFreeze) {
    btnFreeze.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Performance Bank Guarantee (PBG) Freeze Notice Issued via GeM Portal API!", type: "warning" }
      }));
    });
  }
}

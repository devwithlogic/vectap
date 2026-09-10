// USP 1: Collusion & Bidder Cartel Network Radar View
export function renderCollusionTab(container, bidder) {
  const data = window.GEM_COLLUSION_DATA;
  if (!container || !data) return;

  container.innerHTML = `
    <div class="space-y-4">
      <div class="bg-gradient-to-r from-rose-950 via-slate-900 to-blue-950 text-white p-4 rounded-xl border border-rose-800/40 shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-lg bg-rose-900/80 border border-rose-500 flex items-center justify-center text-rose-300">
              <i class="fa-solid fa-circle-nodes text-base"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-white">AI Bidder Cartel & Collusion Radar</h3>
                <span class="bg-rose-900 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-600">
                  CARTEL RISK: ${data.ringRiskScore}%
                </span>
              </div>
              <p class="text-[11px] text-rose-200">${data.regulatoryBreach}</p>
            </div>
          </div>
          <button id="btnTriggerCCINotice" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-gavel"></i>
            <span>Draft CCI Sec 3(3) Referral</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-8 cartel-canvas-container p-4 min-h-[340px] flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs text-slate-300">
            <span class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-project-diagram text-amber-400"></i> Relational Cluster Graph</span>
            <span class="text-[11px] text-slate-400">Nodes: 4 Bidders, 1 Director, 1 IP Subnet</span>
          </div>

          <svg class="w-full h-64 my-auto" viewBox="0 0 560 300">
            <line x1="380" y1="120" x2="460" y2="180" stroke="#EF4444" stroke-width="2.5" class="cartel-edge-danger" />
            <line x1="440" y1="260" x2="460" y2="180" stroke="#EF4444" stroke-width="2.5" class="cartel-edge-danger" />
            <line x1="380" y1="120" x2="340" y2="210" stroke="#EF4444" stroke-width="2.5" class="cartel-edge-danger" />
            <line x1="440" y1="260" x2="340" y2="210" stroke="#EF4444" stroke-width="2.5" class="cartel-edge-danger" />
            <line x1="380" y1="120" x2="260" y2="80" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="3 3" />

            <circle cx="120" cy="160" r="18" fill="#065F46" stroke="#10B981" stroke-width="2" class="cartel-node" />
            <text x="120" y="195" text-anchor="middle" fill="#CBD5E1" font-size="10" font-weight="bold">Bharat Cloud</text>

            <circle cx="140" cy="260" r="16" fill="#065F46" stroke="#10B981" stroke-width="2" class="cartel-node" />
            <text x="140" y="290" text-anchor="middle" fill="#CBD5E1" font-size="10" font-weight="bold">Shreshtha MSE</text>

            <circle cx="380" cy="120" r="20" fill="#92400E" stroke="#F59E0B" stroke-width="2.5" class="cartel-node" />
            <text x="380" y="95" text-anchor="middle" fill="#FDE68A" font-size="10" font-weight="bold">Apex Infra</text>

            <circle cx="440" cy="260" r="20" fill="#7F1D1D" stroke="#EF4444" stroke-width="2.5" class="cartel-node" />
            <text x="440" y="295" text-anchor="middle" fill="#FECACA" font-size="10" font-weight="bold">Horizon Telematics</text>

            <rect x="425" y="165" width="70" height="28" rx="6" fill="#881337" stroke="#F43F5E" stroke-width="2" />
            <text x="460" y="183" text-anchor="middle" fill="#FFF" font-size="9" font-weight="bold">DIN 08492011</text>

            <rect x="300" y="195" width="80" height="26" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="2" />
            <text x="340" y="212" text-anchor="middle" fill="#FDE68A" font-size="9" font-mono font-weight="bold">103.21.58.14</text>
          </svg>

          <div class="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 flex justify-between items-center">
            <span class="text-rose-400 font-bold"><i class="fa-solid fa-triangle-exclamation"></i> Direct Collusion Detected between Apex Infra & Horizon Telematics</span>
            <span class="text-slate-500">Graph Distance: 1 Degree (Shared DIN & IP)</span>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-3">
          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-1">Nexus Evidence #1</span>
            <h4 class="font-bold text-slate-800 mb-1">Common Director (MCA21 Cross-Match)</h4>
            <p class="text-slate-600 text-[11px] leading-relaxed">
              <strong>Shri Ramesh K. Verma (DIN 08492011)</strong> serves as Director in Apex Infra and holds 48% equity in Horizon Telematics as per RoC returns.
            </p>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span class="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-1">Nexus Evidence #2</span>
            <h4 class="font-bold text-slate-800 mb-1">Identical IPv4 & Timestamp Proximity</h4>
            <p class="text-slate-600 text-[11px] leading-relaxed">
              Both technical bids were uploaded from IP <code>103.21.58.14</code> (New Delhi) within <strong>14 minutes 22 seconds</strong> of each other.
            </p>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span class="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">Anti-Corruption Mandate</span>
            <p class="text-slate-600 text-[11px] leading-relaxed">
              Section 3(3) of Competition Act 2002 prohibits bid-rigging and collusive bidding. Both firms can be simultaneously barred under GeM GTC.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const btnCCI = document.getElementById('btnTriggerCCINotice');
  if (btnCCI) {
    btnCCI.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Competition Commission of India (CCI) Section 3 Referral Draft Generated!", type: "warning" }
      }));
    });
  }
}

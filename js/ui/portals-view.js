/**
 * VECTA: Portals Status Ribbon View
 */

window.renderPortalRibbon = function() {
  const portalRibbonEl = document.getElementById('portalRibbon');
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
};

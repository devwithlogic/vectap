/**
 * VECTA: Tab 3 - Statutory & Tender Compliance Checklist View
 */

window.generateChecklistHTML = function(bidder) {
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
};

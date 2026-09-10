/**
 * VECTA: Tab 2 - Document Inspection & DigiLocker OCR View
 */

window.generateDocumentsHTML = function(bidder) {
  return `
    <div>
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-stone-700">Submitted Bid Certificates & DigiLocker Verifications</h4>
          <p class="text-xs text-stone-500 mt-0.5">Automated OCR extraction, SHA-256 hash comparison, and DigiLocker PKI digital signature checks.</p>
        </div>
        <span class="text-xs bg-rust-50 text-rust-700 border border-rust-200 font-semibold px-2.5 py-1 rounded-lg">
          <i class="fa-solid fa-shield-check mr-1.5"></i>NeGD DigiLocker Gateway
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${bidder.documents.map((doc, idx) => `
          <div class="p-4 rounded-xl border border-stone-200 bg-white hover:shadow-md transition">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-rust-50 border border-rust-200 flex items-center justify-center text-rust-700 font-bold text-sm">
                  <i class="fa-solid fa-file-invoice"></i>
                </div>
                <div>
                  <h5 class="font-semibold text-stone-900 text-xs">${doc.name}</h5>
                  <p class="text-[11px] text-stone-500 font-mono">Issuer: ${doc.issuer}</p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'DISCREPANCY' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
                ${doc.status}
              </span>
            </div>

            <div class="mt-3 bg-stone-50 p-2.5 rounded-lg border border-stone-100 text-[11px] text-stone-600 space-y-1">
              <div class="flex justify-between">
                <span>Document Type:</span>
                <span class="font-medium text-stone-800">${doc.docType}</span>
              </div>
              <div class="flex justify-between">
                <span>Date of Issue:</span>
                <span class="font-mono">${doc.date}</span>
              </div>
              <div class="flex justify-between">
                <span>Digital Hash Integrity:</span>
                <span class="${doc.hashMatch ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-bold'}">
                  ${doc.hashMatch ? '<i class="fa-solid fa-check-double mr-1"></i>Matches Issuer Ledger' : '<i class="fa-solid fa-xmark mr-1"></i>Hash Tampered / Mismatch'}
                </span>
              </div>
            </div>

            <div class="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
              <span class="text-[11px] text-stone-400 font-mono">${doc.size}</span>
              <button class="view-doc-btn text-xs font-semibold text-rust-700 hover:text-rust-900 flex items-center gap-1" data-doc-idx="${idx}">
                <i class="fa-regular fa-eye"></i> View OCR & PKI Seal
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

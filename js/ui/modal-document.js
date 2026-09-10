/**
 * VECTA: Document & DigiLocker PKI Modal Controller
 */

window.openDocumentModal = function(bidder, doc) {
  const documentModal = document.getElementById('documentModal');
  const contentEl = document.getElementById('documentModalContent');
  if (!documentModal || !contentEl) return;

  contentEl.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between border-b border-stone-200 pb-4 mb-5">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-rust-100 text-rust-800 flex items-center justify-center text-xl font-bold">
            <i class="fa-solid fa-file-shield"></i>
          </div>
          <div>
            <h3 class="font-bold text-base text-stone-900">${doc.name}</h3>
            <p class="text-xs text-stone-500 font-mono">Bidder: ${bidder.name} | Category: ${doc.docType}</p>
          </div>
        </div>
        <button id="closeDocModalBtn" class="text-stone-400 hover:text-stone-700 text-xl font-bold">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <!-- OCR Extracted Fields -->
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-rust-800 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-brain"></i> AI OCR Extracted Fields
          </h4>
          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">Document Issuer:</span>
              <span class="text-stone-900 font-bold">${doc.issuer}</span>
            </div>
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">Issue Date:</span>
              <span class="text-stone-900">${doc.date}</span>
            </div>
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">Document Size:</span>
              <span class="text-stone-900">${doc.size}</span>
            </div>
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">OCR Confidence:</span>
              <span class="text-emerald-700 font-bold">99.4% Validated</span>
            </div>
            <div class="flex justify-between pt-1">
              <span class="text-stone-500">Classification:</span>
              <span class="text-rust-700 font-bold">${doc.docType}</span>
            </div>
          </div>
        </div>

        <!-- Digital Seal & Cryptographic Verification -->
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <h4 class="text-xs font-bold uppercase tracking-wider text-rust-800 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-signature"></i> DigiLocker PKI Seal
          </h4>
          <div class="space-y-2 text-xs font-mono">
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">PKI Verification:</span>
              <span class="${doc.hashMatch ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}">
                ${doc.hashMatch ? 'VERIFIED VALID' : 'FAILED / COMPROMISED'}
              </span>
            </div>
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">Algorithm:</span>
              <span class="text-stone-900">RSA-2048 / SHA-256</span>
            </div>
            <div class="flex justify-between border-b border-stone-200 pb-1.5">
              <span class="text-stone-500">Timestamp Authority:</span>
              <span class="text-stone-900">National Informatics Centre (NIC-CA)</span>
            </div>
            <div class="pt-1">
              <span class="text-stone-500 text-[10px] block">SHA-256 Document Checksum:</span>
              <span class="text-[10px] text-stone-700 break-all select-all font-mono">
                ${doc.hashMatch ? '9e382b4a39c85a32b84a39e8c5b8fdfbf7eaddcf25201f3e34326e5d59a63a29' : '0000000000000000000000000000000000000000000000000000000000000000'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-rust-50 border border-rust-200 text-xs text-rust-900 flex items-center justify-between">
        <span><i class="fa-solid fa-lock mr-2"></i>Verified against Government Master Repository on 08-Sep-2026.</span>
        <button id="btnDownloadOriginalDoc" class="font-bold text-rust-800 hover:text-rust-950 underline">Download Original e-Signed PDF</button>
      </div>
    </div>
  `;

  documentModal.classList.remove('hidden');
  documentModal.classList.add('flex');

  document.getElementById('closeDocModalBtn').onclick = () => {
    documentModal.classList.add('hidden');
    documentModal.classList.remove('flex');
  };

  document.getElementById('btnDownloadOriginalDoc').onclick = () => {
    window.showToast(`Downloading e-Signed ${doc.name}...`, 'info');
  };
};

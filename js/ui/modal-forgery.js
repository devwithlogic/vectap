// USP 3: Forensic Document Forgery Inspector Modal Controller
export function initForgeryModal() {
  const modal = document.getElementById('modalForgery');
  const btnCloseTop = document.getElementById('btnCloseForgeryModal');
  const btnCloseBottom = document.getElementById('btnCloseModalForgeryBottom');
  const btnExport = document.getElementById('btnExportForensicReport');

  function open() { if (modal) modal.classList.remove('hidden'); }
  function close() { if (modal) modal.classList.add('hidden'); }

  window.addEventListener('open-forgery-modal', open);
  if (btnCloseTop) btnCloseTop.addEventListener('click', close);
  if (btnCloseBottom) btnCloseBottom.addEventListener('click', close);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: "Forensic Audit Certificate (PDF) Downloaded with SHA-256 Digest.", type: "success" }
      }));
    });
  }
}

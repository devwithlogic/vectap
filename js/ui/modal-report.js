/**
 * VECTA: TEC Evaluation Report Modal Controller
 */

window.initReportModal = function() {
  const btnExportTEC = document.getElementById('btnExportTEC');
  const reportModal = document.getElementById('reportModal');
  if (!btnExportTEC || !reportModal) return;

  btnExportTEC.onclick = () => {
    const reportContent = document.getElementById('reportModalContent');
    if (reportContent && window.reportService) {
      reportContent.innerHTML = window.reportService.generateTECSummaryHTML();
    }
    
    reportModal.classList.remove('hidden');
    reportModal.classList.add('flex');

    const closeBtn = document.getElementById('closeReportModalBtn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        reportModal.classList.add('hidden');
        reportModal.classList.remove('flex');
      };
    }

    const printBtn = document.getElementById('btnPrintReportBtn');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }
  };
};

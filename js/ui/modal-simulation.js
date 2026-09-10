/**
 * VECTA: Live Multi-Portal Verification Modal Controller
 */

window.runLiveVerificationModal = function(bidderId, onFinish) {
  const simulationModal = document.getElementById('simulationModal');
  if (!simulationModal) return;
  const bidder = window.GEM_DATA.bidders.find(b => b.id === bidderId);
  if (!bidder) return;

  simulationModal.classList.remove('hidden');
  simulationModal.classList.add('flex');

  const progressBar = document.getElementById('simProgressBar');
  const progressPercent = document.getElementById('simProgressPercent');
  const currentStage = document.getElementById('simCurrentStage');
  const logConsole = document.getElementById('simLogConsole');
  const simCloseBtn = document.getElementById('simCloseBtn');

  if (logConsole) logConsole.innerHTML = '';
  if (simCloseBtn) {
    simCloseBtn.disabled = true;
    simCloseBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  window.simulationService.simulateLiveVerification(bidderId, (event) => {
    if (progressBar) progressBar.style.width = `${event.percent}%`;
    if (progressPercent) progressPercent.textContent = `${event.percent}%`;
    if (currentStage) currentStage.textContent = event.stage;

    if (logConsole) {
      const logLine = document.createElement('div');
      logLine.className = 'text-xs font-mono py-1 border-b border-stone-800 flex items-start gap-2';
      logLine.innerHTML = `
        <span class="text-rust-400 select-none">></span>
        <span class="text-stone-300">${event.log}</span>
      `;
      logConsole.appendChild(logLine);
      logConsole.scrollTop = logConsole.scrollHeight;
    }

    if (event.percent === 100) {
      if (simCloseBtn) {
        simCloseBtn.disabled = false;
        simCloseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
      window.showToast(`Live multi-portal verification complete for ${bidder.name}`, 'success');
    }
  });

  if (simCloseBtn) {
    simCloseBtn.onclick = () => {
      simulationModal.classList.add('hidden');
      simulationModal.classList.remove('flex');
      if (onFinish) onFinish();
    };
  }
};

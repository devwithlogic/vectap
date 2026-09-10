/**
 * VECTA: Toast Notification Component
 */

window.showToast = function(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-800 text-white' 
    : type === 'danger' ? 'bg-rose-800 text-white' 
    : type === 'warning' ? 'bg-amber-800 text-white' 
    : 'bg-rust-800 text-white';

  const icon = type === 'success' ? 'fa-circle-check' 
    : type === 'danger' ? 'fa-ban' 
    : type === 'warning' ? 'fa-triangle-exclamation' 
    : 'fa-circle-info';

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-xs font-medium ${bgClass} transition-all transform duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-sm"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Animate out & destroy
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

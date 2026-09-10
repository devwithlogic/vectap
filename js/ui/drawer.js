// Offcanvas 3-Dot Drawer Controller (USP Navigation & Tools)
export function initDrawer() {
  const btnOpen = document.getElementById('btnOpenDrawer');
  const btnClose = document.getElementById('btnCloseDrawer');
  const drawer = document.getElementById('offcanvasDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }

  if (btnOpen) btnOpen.addEventListener('click', openDrawer);
  if (btnClose) btnClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  const linkMap = [
    { id: 'drawerNavCollusion', tab: 'tab-collusion' },
    { id: 'drawerNavXAI', tab: 'tab-xai' },
    { id: 'drawerNavForgery', action: () => window.dispatchEvent(new CustomEvent('open-forgery-modal')) },
    { id: 'drawerNavLifecycle', tab: 'tab-lifecycle' },
    { id: 'drawerNavZeroUpload', action: () => window.dispatchEvent(new CustomEvent('open-apply-modal', { detail: { zeroUpload: true } })) },
    { id: 'drawerNavChatbot', action: () => window.dispatchEvent(new CustomEvent('open-chatbot')) }
  ];

  linkMap.forEach(({ id, tab, action }) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      closeDrawer();
      if (tab) {
        window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tabId: tab } }));
      } else if (action) {
        action();
      }
    });
  });

  const btnAudit = document.getElementById('drawerBtnRunAudit');
  if (btnAudit) {
    btnAudit.addEventListener('click', () => {
      closeDrawer();
      window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tabId: 'tab-collusion' } }));
    });
  }
}

// USP 7: Multilingual MSME Bidder Chatbot Controller
export function initChatbot() {
  const launcher = document.getElementById('btnChatbotLauncher');
  const modal = document.getElementById('chatbotModal');
  const btnClose = document.getElementById('btnCloseChatbot');
  const langSelect = document.getElementById('chatbotLangSelect');
  const msgContainer = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatInput');
  const btnSend = document.getElementById('btnSendChat');
  const promptBtns = document.querySelectorAll('.chat-prompt-btn');

  let currentLang = 'hi';

  function open() { if (modal) modal.classList.add('open'); }
  function close() { if (modal) modal.classList.remove('open'); }

  if (launcher) launcher.addEventListener('click', () => {
    if (modal.classList.contains('open')) close(); else open();
  });
  if (btnClose) btnClose.addEventListener('click', close);
  window.addEventListener('open-chatbot', open);

  function appendMsg(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user';
    bubble.innerHTML = text.replace(/\n/g, '<br/>');
    msgContainer.appendChild(bubble);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function handlePrompt(promptKey) {
    const kb = window.GEM_CHATBOT_DATA?.[currentLang] || window.GEM_CHATBOT_DATA?.en;
    if (!kb) return;
    const resp = kb[promptKey] || "मैं इस विषय में सहायता कर सकता हूँ।";
    appendMsg('bot', resp);
  }

  promptBtns.forEach(b => {
    b.addEventListener('click', () => {
      const p = b.getAttribute('data-prompt');
      appendMsg('user', b.innerText.trim());
      setTimeout(() => handlePrompt(p), 400);
    });
  });

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      const kb = window.GEM_CHATBOT_DATA?.[currentLang] || window.GEM_CHATBOT_DATA?.en;
      appendMsg('bot', kb.welcome);
    });
  }

  function sendText() {
    const val = input.value.trim();
    if (!val) return;
    appendMsg('user', val);
    input.value = '';
    setTimeout(() => {
      appendMsg('bot', currentLang === 'hi'
        ? "आपकी क्वेरी का विश्लेषण किया गया: कृपया MII क्लॉज 14(b) के लिए वैध CA प्रमाणपत्र और अद्यतन GSTR-3B रसीद संलग्न करें।"
        : "Query analyzed: Please attach valid CA local content certificate for Clause 14(b) and filed GSTR-3B receipt.");
    }, 500);
  }

  if (btnSend) btnSend.addEventListener('click', sendText);
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendText();
    });
  }
}

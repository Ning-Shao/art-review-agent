export function renderChatPanel() {

  return "<section class=\"chat-card\" id=\"chat\" aria-label=\"AI对话\">\n          <h2 class=\"panel-title\">AI 对话</h2>\n          <div class=\"messages\">\n            <div class=\"message ai\">可以继续从评委视角、赛事匹配度、作品说明优化三个方向追问。</div>\n            <div class=\"message user\">请按评委视角指出最可能扣分的地方。</div>\n          </div>\n\t          <div class=\"prompt-row\">\n\t            <input aria-label=\"输入问题\" placeholder=\"输入问题，例如：能否帮我重写作品说明？\">\n\t            <button class=\"send\" type=\"button\">发送</button>\n\t          </div>\n          <div class=\"context-toggle\">\n            <label for=\"keepImageContext\">\n              <input id=\"keepImageContext\" type=\"checkbox\">\n              保持图片上下文（消耗更多Token）\n            </label>\n          </div>\n        </section>";

}

export function bindChatPanel() {
  const card = document.getElementById('chat');
  const input = card && card.querySelector('.prompt-row input');
  const send = card && card.querySelector('.send');
  const messages = card && card.querySelector('.messages');
  function submitMessage() {
    const text = input && input.value.trim();
    if (!text || !messages) return;
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = text;
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai';
    aiMessage.textContent = '已收到问题。当前版本先保留模拟对话，后续会接入真实 AI 评审服务。';
    messages.append(userMessage, aiMessage);
    input.value = '';
  }
  if (send) send.addEventListener('click', submitMessage);
  if (input) input.addEventListener('keydown', (event) => { if (event.key === 'Enter') submitMessage(); });
}

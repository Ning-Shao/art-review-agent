import { DOM_IDS } from '../ids.js';

export function renderSettingsModal() {
  return "<div class=\"settings-modal\" id=\"settingsModal\" hidden>\n" +
    "    <div class=\"settings-dialog login-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"settingsTitle\">\n" +
    "      <div class=\"login-window-bar\">\n" +
    "        <div class=\"login-window-brand\">\n" +
    "          <span class=\"login-window-logo\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span></span>\n" +
    "          <span>米兰设计周 中国高校设计作品展</span>\n" +
    "        </div>\n" +
    "        <button class=\"settings-close login-close\" id=\"settingsClose\" type=\"button\" aria-label=\"关闭登录窗口\">×</button>\n" +
    "      </div>\n" +
    "      <div class=\"login-visual\" aria-hidden=\"true\"><img src=\"./assets/bg1-odMAJqKZ.jpg\" alt=\"\"></div>\n" +
    "      <div class=\"login-body\">\n" +
    "        <h2 class=\"sr-only\" id=\"settingsTitle\">米兰设计周 中国高校设计作品展 账号登录</h2>\n" +
    "        <div class=\"login-choice-list\" aria-label=\"米兰大赛账号操作\">\n" +
    "          <a class=\"login-choice primary\" href=\"https://milan-aap.org.cn/#/designer/login\" target=\"_blank\" rel=\"noopener noreferrer\"><span class=\"login-choice-icon\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span></span><span>米兰设计周 中国高校设计作品展 账号登录</span></a>\n" +
    "          <p class=\"login-subtitle\">还没有账号？<a class=\"login-register-link\" href=\"https://milan-aap.org.cn/#/designer/register\" target=\"_blank\" rel=\"noopener noreferrer\">点击注册 ↗</a></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>";
}

export function bindSettingsModal() {
  const settingsToggle = document.getElementById(DOM_IDS.settingsToggle);
  const settingsModal = document.getElementById(DOM_IDS.settingsModal);
  const settingsClose = document.getElementById(DOM_IDS.settingsClose);
  function openSettings() {
    if (!settingsModal) return;
    settingsModal.hidden = false;
    const firstAction = settingsModal.querySelector('button, a');
    if (firstAction) firstAction.focus();
  }
  function closeSettings() {
    if (settingsModal) settingsModal.hidden = true;
  }
  if (settingsToggle) settingsToggle.addEventListener('click', openSettings);
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);
  if (settingsModal) settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) closeSettings(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && settingsModal && !settingsModal.hidden) closeSettings(); });
}

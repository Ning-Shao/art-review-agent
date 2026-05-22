import { DOM_IDS } from '../ids.js';

export function renderSettingsModal() {
  return "<div class=\"settings-modal\" id=\"settingsModal\" hidden>\n" +
    "    <div class=\"settings-dialog login-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"settingsTitle\">\n" +
    "      <button class=\"settings-close login-close\" id=\"settingsClose\" type=\"button\" aria-label=\"关闭登录窗口\">×</button>\n" +
    "      <div class=\"login-body\">\n" +
    "        <h2 id=\"settingsTitle\">米兰大赛账号</h2>\n" +
    "        <div class=\"login-choice-list\" aria-label=\"米兰大赛账号操作\">\n" +
    "          <button class=\"login-choice primary\" type=\"button\">用米兰大赛账号登录</button>\n" +
    "          <a class=\"login-choice secondary\" href=\"https://milan-aap.org.cn/#/designer/register\" target=\"_blank\" rel=\"noopener noreferrer\">创建米兰大赛账号</a>\n" +
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
  const loginChoice = settingsModal && settingsModal.querySelector('.login-choice.primary');
  if (loginChoice) {
    const originalLabel = loginChoice.textContent;
    loginChoice.addEventListener('click', () => {
      loginChoice.textContent = '演示版暂未接入真实登录';
      window.setTimeout(() => { loginChoice.textContent = originalLabel; }, 1400);
    });
  }
  if (settingsModal) settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) closeSettings(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && settingsModal && !settingsModal.hidden) closeSettings(); });
}

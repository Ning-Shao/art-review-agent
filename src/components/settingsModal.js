import { DOM_IDS } from '../ids.js';

export function renderSettingsModal() {
  return "<div class=\"settings-modal\" id=\"settingsModal\" hidden>\n" +
    "    <div class=\"settings-dialog login-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"settingsTitle\">\n" +
    "      <button class=\"settings-close login-close\" id=\"settingsClose\" type=\"button\" aria-label=\"关闭登录窗口\">×</button>\n" +
    "      <div class=\"login-visual\" aria-hidden=\"true\"><img src=\"./assets/bg1-odMAJqKZ.jpg\" alt=\"\"></div>\n" +
    "      <div class=\"login-body\">\n" +
    "        <h2 id=\"settingsTitle\">注册 / 登录</h2>\n" +
    "        <p class=\"login-subtitle\">您可以直接输入手机号和密码登录，或使用赛事平台账号进入。</p>\n" +
    "        <button class=\"milan-login-option\" type=\"button\">已有米兰设计周-中国高校设计学科师生优秀作品展账号？，点击以此登录</button>\n" +
    "        <div class=\"login-form\" aria-label=\"参赛者登录表单\">\n" +
    "          <label class=\"login-field\" for=\"loginSeason\"><span class=\"required\">*</span><b>赛季</b><select id=\"loginSeason\" aria-label=\"赛季\"><option>本届</option><option>往届</option></select></label>\n" +
    "          <p class=\"season-tip\">如需查看往届数据，请下拉切换赛季</p>\n" +
    "          <label class=\"login-field\" for=\"loginPhone\"><span class=\"required\">*</span><b>手机号</b><input id=\"loginPhone\" type=\"text\" inputmode=\"tel\" autocomplete=\"tel\"></label>\n" +
    "          <label class=\"login-field\" for=\"loginPassword\"><span class=\"required\">*</span><b>密码</b><input id=\"loginPassword\" type=\"password\" autocomplete=\"current-password\"></label>\n" +
    "          <label class=\"login-field captcha-field\" for=\"loginCaptcha\"><span class=\"required\">*</span><b>验证码</b><input id=\"loginCaptcha\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\"><span class=\"captcha-code\" aria-label=\"验证码 0349\">0349</span></label>\n" +
    "          <button class=\"login-submit\" type=\"button\">登录</button>\n" +
    "          <button class=\"login-register\" type=\"button\">注册</button>\n" +
    "        </div>\n" +
    "        <div class=\"login-links\">\n" +
    "          <span>忘记密码?</span>\n" +
    "          <button type=\"button\">找回密码</button>\n" +
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
    const firstInput = settingsModal.querySelector('input, select');
    if (firstInput) firstInput.focus();
  }
  function closeSettings() {
    if (settingsModal) settingsModal.hidden = true;
  }
  if (settingsToggle) settingsToggle.addEventListener('click', openSettings);
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);
  if (settingsModal) settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) closeSettings(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && settingsModal && !settingsModal.hidden) closeSettings(); });
}

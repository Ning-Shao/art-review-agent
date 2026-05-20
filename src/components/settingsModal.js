import { DOM_IDS } from '../ids.js';

export function renderSettingsModal() {

  return "<div class=\"settings-modal\" id=\"settingsModal\" hidden>\n\t    <div class=\"settings-dialog login-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"settingsTitle\">\n\t      <button class=\"settings-close login-close\" id=\"settingsClose\" type=\"button\" aria-label=\"关闭登录窗口\">×</button>\n\t      <div class=\"login-body\">\n\t        <div class=\"login-icon\" aria-hidden=\"true\">\n\t          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t            <path d=\"M20 21a8 8 0 0 0-16 0\"></path>\n\t            <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>\n\t          </svg>\n\t        </div>\n\t        <h2 id=\"settingsTitle\">用户登录</h2>\n\t        <div class=\"login-form\" aria-label=\"用户登录表单\">\n\t          <label for=\"loginUsername\">用户名 <span>*</span></label>\n\t          <input id=\"loginUsername\" type=\"text\" autocomplete=\"username\" placeholder=\"请输入用户名\">\n\t          <label for=\"loginPassword\">密码 <span>*</span></label>\n\t          <input id=\"loginPassword\" type=\"password\" autocomplete=\"current-password\" placeholder=\"请输入密码\">\n\t          <label class=\"remember-login\" for=\"rememberLogin\"><input id=\"rememberLogin\" type=\"checkbox\"> 记住我</label>\n\t          <button class=\"login-submit\" type=\"button\">登录</button>\n\t        </div>\n\t        <div class=\"login-links\">\n\t          <button type=\"button\">注册账号</button>\n\t          <button type=\"button\">忘记密码？</button>\n\t        </div>\n\t      </div>\n\t    </div>\n\t  </div>";

}

export function bindSettingsModal() {
  const settingsToggle = document.getElementById(DOM_IDS.settingsToggle);
  const settingsModal = document.getElementById(DOM_IDS.settingsModal);
  const settingsClose = document.getElementById(DOM_IDS.settingsClose);
  function openSettings() {
    if (!settingsModal) return;
    settingsModal.hidden = false;
    const firstInput = settingsModal.querySelector('input');
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

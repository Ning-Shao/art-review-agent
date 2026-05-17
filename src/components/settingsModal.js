import { DOM_IDS } from '../ids.js';

export function renderSettingsModal() {

  return "<div class=\"settings-modal\" id=\"settingsModal\" hidden>\n\t    <div class=\"settings-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"settingsTitle\">\n\t      <div class=\"settings-head\">\n\t        <h2 id=\"settingsTitle\">设置中心</h2>\n\t        <button class=\"settings-close\" id=\"settingsClose\" type=\"button\" aria-label=\"关闭设置\">×</button>\n\t      </div>\n\t      <div class=\"settings-body\">\n\t        <div class=\"settings-item\">\n\t          <div class=\"settings-item-icon\" aria-hidden=\"true\">U</div>\n\t          <div><strong>用户资料</strong><span>姓名、头像、学校、专业和作品身份信息。</span></div>\n\t        </div>\n\t        <div class=\"settings-item\">\n\t          <div class=\"settings-item-icon\" aria-hidden=\"true\">S</div>\n\t          <div><strong>设置</strong><span>通知、文件上传、历史记录和隐私选项。</span></div>\n\t        </div>\n\t        <div class=\"settings-item\">\n\t          <div class=\"settings-item-icon\" aria-hidden=\"true\">P</div>\n\t          <div><strong>偏好</strong><span>默认评审模式、报告长度、评分展示和界面主题。</span></div>\n\t        </div>\n\t        <div class=\"settings-item\">\n\t          <div class=\"settings-item-icon\" aria-hidden=\"true\">L</div>\n\t          <div><strong>语言</strong><span>中文、English 和后续多语言界面。</span></div>\n\t        </div>\n\t        <div class=\"settings-item\">\n\t          <div class=\"settings-item-icon\" aria-hidden=\"true\">↔</div>\n\t          <div><strong>登录 / 退出</strong><span>账户登录、会话切换和安全退出。</span></div>\n\t        </div>\n\t      </div>\n\t    </div>\n\t  </div>";

}

export function bindSettingsModal() {
  const settingsToggle = document.getElementById(DOM_IDS.settingsToggle);
  const settingsModal = document.getElementById(DOM_IDS.settingsModal);
  const settingsClose = document.getElementById(DOM_IDS.settingsClose);
  function openSettings() { settingsModal.hidden = false; }
  function closeSettings() { settingsModal.hidden = true; }
  if (settingsToggle) settingsToggle.addEventListener('click', openSettings);
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);
  if (settingsModal) settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) closeSettings(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && settingsModal && !settingsModal.hidden) closeSettings(); });
}

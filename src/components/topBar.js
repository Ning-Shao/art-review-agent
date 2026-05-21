import { DOM_IDS } from '../ids.js';
import { getNextTheme, persistTheme } from '../state/theme.js';

export function renderTopBar() {

  return "<header class=\"topbar\">\n        <div class=\"brand\">\n          <h1 class=\"brand-title text-logo\" aria-label=\"智能预评审\">智能预评审</h1>\n        </div>\n        <div class=\"top-actions\">\n          <button class=\"auth-button\" id=\"settingsToggle\" type=\"button\" aria-haspopup=\"dialog\" aria-controls=\"settingsModal\">注册/登录</button>\n        </div>\n        <button class=\"mode-toggle\" id=\"themeToggle\" type=\"button\" aria-label=\"切换日间夜间模式\">\n          <span aria-hidden=\"true\">◐</span>\n          <span id=\"themeToggleText\">夜间模式</span>\n        </button>\n      </header>";

}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const isNight = theme === 'night';
  const toggle = document.getElementById(DOM_IDS.themeToggle);
  const toggleText = document.getElementById(DOM_IDS.themeToggleText);
  if (toggleText) toggleText.textContent = isNight ? '日间模式' : '夜间模式';
  if (toggle) toggle.setAttribute('aria-label', isNight ? '切换日间模式' : '切换夜间模式');
}

export function bindTopBar(store) {
  applyTheme(store.theme);
  const toggle = document.getElementById(DOM_IDS.themeToggle);
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    store.theme = getNextTheme(document.body.dataset.theme);
    applyTheme(store.theme);
    persistTheme(store.theme);
  });
}

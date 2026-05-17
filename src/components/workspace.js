import { DOM_IDS } from '../ids.js';
import { renderChatPanel } from './chatPanel.js';
import { renderFileUpload } from './fileUpload.js';
import { renderReportPanel } from './reportPanel.js';
import { renderWorkForm } from './workForm.js';

export function renderWorkspace() {
  return "<main class=\"workspace\">\n        <p class=\"breadcrumb\" id=\"breadcrumb\">视觉传达 / 海报设计 / 米兰设计周 / 城市更新主题赛道</p>\n\n        <img class=\"poster\" src=\"assets/urban-renewal-poster.png\" alt=\"米兰时装周城市更新主题海报\">\n        <p class=\"skin-note\">此处为赛道皮肤占位图：不同赛道会显示不同图片；普通作业显示网站默认皮肤。皮肤商店下载能力为后续规划，当前不开发。</p>\n\n        <section class=\"work-grid\" aria-label=\"作品信息和上传\">\n" + renderWorkForm() + '\n' + renderFileUpload() + "\n        </section>\n\n" + renderReportPanel() + "\n\n" + renderChatPanel() + "\n        <footer class=\"site-footer\" id=\"siteFooter\">\n\t          <div class=\"footer-links\">\n\t            <a href=\"https://jojoslab.com\">联系我们</a>\n\t            <a href=\"mailto:ningshao@example.com?subject=技术支持\">技术支持</a>\n\t            <button id=\"backToTop\" type=\"button\">回到顶端</button>\n\t          </div>\n\t          <p class=\"footer-copy\">@2026 jojo | designed with love</p>\n\t        </footer>\n      </main>";
}

export function bindWorkspace(outlineController) {
  const workspace = document.querySelector('.workspace');
  const backToTop = document.getElementById(DOM_IDS.backToTop);
  if (backToTop) backToTop.addEventListener('click', () => {
    if (workspace) workspace.scrollTo({ top: 0, behavior: 'smooth' });
    if (outlineController && outlineController.setActiveOutline) outlineController.setActiveOutline('#basic-info');
  });
}

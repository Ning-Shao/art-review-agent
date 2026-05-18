import { DOM_IDS } from '../ids.js';
import { renderChatPanel } from './chatPanel.js';
import { renderFileUpload } from './fileUpload.js';
import { renderReportPanel } from './reportPanel.js';
import { renderWorkForm } from './workForm.js';

export function renderWorkspace() {
  return "<main class=\"workspace\">\n        <section class=\"product-hero\" aria-labelledby=\"productHeroTitle\">\n          <div class=\"hero-copy\">\n            <span class=\"hero-kicker\">Mock AI 静态演示版</span>\n            <h2 id=\"productHeroTitle\">大赛 AI 预评审台 <span>AI Art Review Desk</span></h2>\n            <p>面向艺术设计竞赛作品的 AI 预评审 Demo，用于快速组织参赛语境、作品材料和可读的预评审报告。</p>\n            <ol class=\"hero-flow\" aria-label=\"核心流程\">\n              <li>选择竞赛节点</li>\n              <li>上传作品</li>\n              <li>生成预评审报告</li>\n              <li>查看历史记录</li>\n            </ol>\n          </div>\n          <aside class=\"demo-note\" aria-label=\"演示说明\">\n            <strong>演示说明</strong>\n            <p>当前版本不会调用真实大模型 API，报告内容来自本地 Mock 数据，适合用于页面流程、交互和静态部署演示。</p>\n          </aside>\n        </section>\n\n        <p class=\"breadcrumb\" id=\"breadcrumb\">视觉传达 / 海报设计 / 米兰设计周 / 城市更新主题赛道</p>\n\n        <img class=\"poster\" src=\"assets/urban-renewal-poster.png\" alt=\"米兰时装周城市更新主题海报\">\n        <p class=\"skin-note\">此处为赛道皮肤占位图：不同赛道会显示不同图片；普通作业显示网站默认皮肤。皮肤商店下载能力为后续规划，当前不开发。</p>\n\n        <section class=\"work-grid\" aria-label=\"作品信息和上传\">\n" + renderWorkForm() + '\n' + renderFileUpload() + "\n        </section>\n\n" + renderReportPanel() + "\n\n" + renderChatPanel() + "\n        <footer class=\"site-footer\" id=\"siteFooter\">\n\t          <div class=\"footer-links\">\n\t            <a href=\"https://jojoslab.com\">联系我们</a>\n\t            <a href=\"mailto:ningshao@example.com?subject=技术支持\">技术支持</a>\n\t            <button id=\"backToTop\" type=\"button\">回到顶端</button>\n\t          </div>\n\t          <p class=\"footer-copy\">@2026 jojo | designed with love</p>\n\t        </footer>\n      </main>";
}

export function bindWorkspace(outlineController) {
  const workspace = document.querySelector('.workspace');
  const backToTop = document.getElementById(DOM_IDS.backToTop);
  if (backToTop) backToTop.addEventListener('click', () => {
    if (workspace) workspace.scrollTo({ top: 0, behavior: 'smooth' });
    if (outlineController && outlineController.setActiveOutline) outlineController.setActiveOutline('#basic-info');
  });
}

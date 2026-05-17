import { generateMockReview } from '../services/aiReviewService.mock.js';

export function renderWorkForm() {

  return "<div class=\"panel\">\n            <h2 class=\"panel-title\">作品信息</h2>\n            <p class=\"panel-copy\">表单只承载作品元数据，不再替代评价体系导航。</p>\n            <div class=\"field-grid\">\n              <div class=\"field\">\n                <label for=\"title\">作品名称</label>\n                <input id=\"title\" value=\"城市更新海报方案\">\n              </div>\n              <div class=\"field\">\n                <label for=\"mode\">评测类型</label>\n                <input id=\"mode\" value=\"赛前预评审\">\n              </div>\n              <div class=\"field\">\n                <label for=\"category\">类别 / 赛事</label>\n                <input id=\"category\" value=\"视觉传达 / 米兰\">\n              </div>\n              <div class=\"field\">\n                <label for=\"track\">赛道 / 命题</label>\n                <input id=\"track\" value=\"城市更新主题\">\n              </div>\n              <div class=\"field full\">\n                <label for=\"desc\">作品说明</label>\n                <textarea id=\"desc\">以社区公共空间再生为主题，通过黑白灰图形层级表达城市更新中的公共记忆、空间秩序与视觉传播策略。</textarea>\n              </div>\n            </div>\n            <button class=\"cta\" type=\"button\">生成预评审报告</button>\n          </div>";

}

function temporarilyLabel(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => { button.textContent = original; }, 1400);
}

function getWorkFormValues(store) {
  return {
    title: document.getElementById('title')?.value.trim(),
    mode: document.getElementById('mode')?.value.trim(),
    category: document.getElementById('category')?.value.trim(),
    track: document.getElementById('track')?.value.trim(),
    description: document.getElementById('desc')?.value.trim(),
    breadcrumb: store.selectedBreadcrumb,
    mediaNode: store.selectedBreadcrumb.includes('媒体分类节点')
      ? store.selectedBreadcrumb.replace('媒体分类节点 / ', '')
      : '海报 / 品牌设计 / 视觉传达',
  };
}

export function bindWorkForm(store, handlers = {}) {
  const button = document.querySelector('.cta');
  if (!button) return;
  button.addEventListener('click', async () => {
    const report = await generateMockReview(getWorkFormValues(store));
    if (handlers.onReportGenerated) handlers.onReportGenerated(report);
    temporarilyLabel(button, '已生成报告');
  });
}

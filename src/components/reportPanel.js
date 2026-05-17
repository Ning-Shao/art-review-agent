import { DOM_IDS } from '../ids.js';
import { downloadTextFile } from '../utils/file.js';

export function renderReportPanel() {

  return "<section class=\"report-section\" aria-label=\"正式预评审报告\">\n          <div class=\"section-head\">\n            <div>\n              <h2>正式预评审报告</h2>\n              <p>面向老师、学生和参赛提交场景整理成可阅读、分享和下载的文本报告。</p>\n            </div>\n            <div class=\"score\" aria-label=\"综合分 78\"><span>78</span></div>\n          </div>\n\n          <div class=\"report-actions\" aria-label=\"报告操作\">\n            <div class=\"report-action-group\">\n              <button class=\"report-action\" id=\"shareReport\" type=\"button\" aria-expanded=\"false\" aria-controls=\"sharePanel\">分享</button>\n              <div class=\"share-panel\" id=\"sharePanel\" hidden>\n                <label for=\"shareLink\">可复制链接</label>\n                <div class=\"share-row\">\n                  <input id=\"shareLink\" readonly value=\"\">\n                  <button id=\"copyShareLink\" type=\"button\">复制</button>\n                </div>\n              </div>\n            </div>\n            <div class=\"report-action-group\">\n              <button class=\"report-action\" id=\"downloadReport\" type=\"button\" aria-expanded=\"false\" aria-controls=\"downloadMenu\">下载</button>\n              <div class=\"action-menu\" id=\"downloadMenu\" hidden>\n                <button id=\"downloadPdf\" type=\"button\">下载 PDF</button>\n                <button id=\"downloadMarkdown\" type=\"button\">下载 Markdown</button>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"formal-report\" id=\"formalReport\">\n            <h3>城市更新海报方案｜AI 预评审文本报告</h3>\n            <section id=\"basic-info\">\n              <h4>作品基本信息</h4>\n              <div class=\"info-table\">\n                <div><strong>作品名称</strong>城市更新海报方案</div>\n                <div><strong>评测类型</strong>赛前预评审</div>\n                <div><strong>竞赛节点</strong>米兰设计周 / 视觉传达类</div>\n                <div><strong>媒体节点</strong>海报 / 品牌设计 / 视觉传达</div>\n              </div>\n            </section>\n            <section id=\"overall-review\">\n              <h4>整体评价</h4>\n              <p>作品围绕城市更新与公共空间再生展开，画面使用较克制的黑白灰图形秩序表达社区记忆、空间更新与公众参与之间的关系。整体方向与视觉传达类竞赛命题具备较高相关性，但目前还需要把概念表达进一步转化为明确的调研证据、视觉策略和落地场景。</p>\n            </section>\n            <section id=\"dimension-analysis\">\n              <h4>评分维度分析</h4>\n              <ul>\n                <li>主题理解：能够抓住城市更新的公共性和社会议题，但问题定义还可以更具体。</li>\n                <li>视觉表达：构图清晰，图形语言具备识别度，但材料之间的叙事连续性仍需加强。</li>\n                <li>过程呈现：当前过程材料偏少，建议补充调研、草图、信息架构和方案迭代证据。</li>\n                <li>竞赛适配：与米兰设计周视觉传达类方向基本匹配，需要强化国际化表达和社会价值阐释。</li>\n              </ul>\n            </section>\n            <section id=\"strengths\">\n              <h4>当前优势</h4>\n              <p>作品主题具有现实议题基础，视觉风格统一，主画面具备快速识别能力。相较于普通形式练习，该方案已经具备“问题意识”和“竞赛叙事”的雏形，适合继续向正式参赛材料推进。</p>\n            </section>\n            <section id=\"problems\">\n              <h4>主要问题</h4>\n              <p>当前最大风险是作品说明偏概念化，评委难以从现有材料中看到调研依据、目标人群、传播场景和视觉选择之间的因果关系。如果只保留抽象表达，作品容易被判断为形式完整但论证不足。</p>\n            </section>\n            <section id=\"revision-suggestions\">\n              <h4>修改建议</h4>\n              <ul>\n                <li>将作品说明调整为“问题背景、设计策略、视觉执行、预期影响”的顺序。</li>\n                <li>补充 3 到 5 张过程图，说明从城市观察到视觉方案的形成路径。</li>\n                <li>为每张上传材料标注对应评审维度，减少评委理解成本。</li>\n                <li>增加应用场景图，例如街区公告、公共展板、社交媒体传播或活动导视。</li>\n              </ul>\n            </section>\n            <section id=\"competition-fit\">\n              <h4>参赛方向匹配度</h4>\n              <p>建议优先匹配“米兰设计周 / 视觉传达类”，备选方向为“全国大学生设计创新实践大赛 / A 类赛道”。如果后续补充空间改造或公共装置方案，也可以扩展到环境空间类节点。</p>\n            </section>\n            <section id=\"summary\">\n              <h4>总结</h4>\n              <p>该作品已经具备参赛前评审的基本潜力。下一步应从“好看的海报”推进到“有证据、有场景、有公共价值的设计方案”，让视觉表达、研究过程和竞赛标准形成更稳定的对应关系。</p>\n            </section>\n          </div>\n        </section>";

}

function temporarilyLabel(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => { button.textContent = original; }, 1400);
}

function getReportMarkdown(formalReport) {
  const title = (formalReport.querySelector('h3') && formalReport.querySelector('h3').textContent.trim()) || 'AI 预评审文本报告';
  const sections = Array.from(formalReport.querySelectorAll('section')).map((section) => {
    const heading = section.querySelector('h4') && section.querySelector('h4').textContent.trim();
    const blocks = Array.from(section.children).filter((child) => child.tagName !== 'H4').map((child) => child.textContent.trim().replace(/\s+/g, ' ')).filter(Boolean).join('\n\n');
    return '## ' + heading + '\n\n' + blocks;
  });
  return '# ' + title + '\n\n' + sections.join('\n\n');
}

function getShareUrl() {
  const url = new URL(window.location.href);
  url.hash = 'formalReport';
  return url.toString();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function renderList(items) {
  return '<ul>' + items.map((item) => '<li>' + escapeHTML(item) + '</li>').join('') + '</ul>';
}

export function updateReportPanel(report) {
  const score = document.querySelector('.score');
  const scoreText = score && score.querySelector('span');
  const formalReport = document.getElementById(DOM_IDS.formalReport);
  if (!formalReport) return;

  if (score) {
    score.setAttribute('aria-label', '综合分 ' + report.score);
    score.style.background = 'conic-gradient(var(--accent) 0 ' + report.score + '%, #e6e6e6 ' + report.score + '% 100%)';
  }
  if (scoreText) scoreText.textContent = String(report.score);

  formalReport.innerHTML =
    '<h3>' + escapeHTML(report.title) + '</h3>' +
    '<section id="basic-info">' +
      '<h4>作品基本信息</h4>' +
      '<div class="info-table">' +
        '<div><strong>作品名称</strong>' + escapeHTML(report.work.title) + '</div>' +
        '<div><strong>评测类型</strong>' + escapeHTML(report.work.mode) + '</div>' +
        '<div><strong>竞赛节点</strong>' + escapeHTML(report.work.breadcrumb) + '</div>' +
        '<div><strong>媒体节点</strong>' + escapeHTML(report.work.mediaNode) + '</div>' +
      '</div>' +
    '</section>' +
    '<section id="overall-review"><h4>整体评价</h4><p>' + escapeHTML(report.overall) + '</p></section>' +
    '<section id="dimension-analysis"><h4>评分维度分析</h4>' + renderList(report.dimensions) + '</section>' +
    '<section id="strengths"><h4>当前优势</h4><p>' + escapeHTML(report.strengths) + '</p></section>' +
    '<section id="problems"><h4>主要问题</h4><p>' + escapeHTML(report.problems) + '</p></section>' +
    '<section id="revision-suggestions"><h4>修改建议</h4>' + renderList(report.suggestions) + '</section>' +
    '<section id="competition-fit"><h4>参赛方向匹配度</h4><p>' + escapeHTML(report.competitionFit) + '</p></section>' +
    '<section id="summary"><h4>总结</h4><p>' + escapeHTML(report.summary) + '</p></section>';
}

export function bindReportPanel() {
  const formalReport = document.getElementById(DOM_IDS.formalReport);
  const shareReport = document.getElementById(DOM_IDS.shareReport);
  const sharePanel = document.getElementById(DOM_IDS.sharePanel);
  const shareLink = document.getElementById(DOM_IDS.shareLink);
  const copyShareLink = document.getElementById(DOM_IDS.copyShareLink);
  const downloadReport = document.getElementById(DOM_IDS.downloadReport);
  const downloadMenu = document.getElementById(DOM_IDS.downloadMenu);
  const downloadPdf = document.getElementById(DOM_IDS.downloadPdf);
  const downloadMarkdown = document.getElementById(DOM_IDS.downloadMarkdown);

  function closeReportMenus() {
    if (sharePanel) sharePanel.hidden = true;
    if (downloadMenu) downloadMenu.hidden = true;
    if (shareReport) shareReport.setAttribute('aria-expanded', 'false');
    if (downloadReport) downloadReport.setAttribute('aria-expanded', 'false');
  }

  if (shareReport) shareReport.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = sharePanel.hidden;
    closeReportMenus();
    sharePanel.hidden = !willOpen;
    shareReport.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) { shareLink.value = getShareUrl(); shareLink.select(); }
  });
  if (copyShareLink) copyShareLink.addEventListener('click', async () => {
    shareLink.value = getShareUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(shareLink.value);
    temporarilyLabel(copyShareLink, '已复制');
  });
  if (downloadReport) downloadReport.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = downloadMenu.hidden;
    closeReportMenus();
    downloadMenu.hidden = !willOpen;
    downloadReport.setAttribute('aria-expanded', String(willOpen));
  });
  if (downloadPdf) downloadPdf.addEventListener('click', () => { closeReportMenus(); window.print(); });
  if (downloadMarkdown) downloadMarkdown.addEventListener('click', () => { closeReportMenus(); downloadTextFile('ai-art-review-report.md', getReportMarkdown(formalReport), 'text/markdown;charset=utf-8'); });
  document.addEventListener('click', (event) => { if (!event.target.closest('.report-action-group')) closeReportMenus(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeReportMenus(); });
}

import { DOM_IDS } from '../ids.js';
import { mockReportTemplate } from '../data/mockReport.js';
import { downloadTextFile } from '../utils/file.js';

export function renderReportPanel() {
  return "<section class=\"report-section\" aria-label=\"正式预评审报告\">\n          <div class=\"section-head\">\n            <div>\n              <h2>正式预评审报告</h2>\n              <p>面向老师、学生和参赛提交场景整理成可阅读、分享和下载的文本报告。</p>\n            </div>\n            <div class=\"score\" aria-label=\"综合分 " + mockReportTemplate.score + "\"><span>" + mockReportTemplate.score + "</span></div>\n          </div>\n\n          <div class=\"report-actions\" aria-label=\"报告操作\">\n            <div class=\"report-action-group\">\n              <button class=\"report-action\" id=\"shareReport\" type=\"button\" aria-expanded=\"false\" aria-controls=\"sharePanel\">分享</button>\n              <div class=\"share-panel\" id=\"sharePanel\" hidden>\n                <label for=\"shareLink\">可复制链接</label>\n                <div class=\"share-row\">\n                  <input id=\"shareLink\" readonly value=\"\">\n                  <button id=\"copyShareLink\" type=\"button\">复制</button>\n                </div>\n              </div>\n            </div>\n            <div class=\"report-action-group\">\n              <button class=\"report-action\" id=\"downloadReport\" type=\"button\" aria-expanded=\"false\" aria-controls=\"downloadMenu\">下载</button>\n              <div class=\"action-menu\" id=\"downloadMenu\" hidden>\n                <button id=\"downloadPdf\" type=\"button\">下载 PDF</button>\n                <button id=\"downloadMarkdown\" type=\"button\">下载 Markdown</button>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"formal-report\" id=\"formalReport\">" + renderFormalReport(mockReportTemplate) + "</div>\n        </section>";

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

function renderTextList(items) {
  return '<ul>' + items.map((item) => '<li>' + escapeHTML(item) + '</li>').join('') + '</ul>';
}

function renderInfoGrid(items) {
  return '<div class="info-table">' + items.map((item) => (
    '<div><strong>' + escapeHTML(item.label) + '</strong>' + escapeHTML(item.value) + '</div>'
  )).join('') + '</div>';
}

function renderDimensionScores(dimensions) {
  return '<div class="dimension-score-list">' + dimensions.map((dimension) => {
    if (typeof dimension === 'string') {
      return '<div class="dimension-score"><strong>' + escapeHTML(dimension) + '</strong></div>';
    }
    return '<div class="dimension-score">' +
      '<div class="dimension-score-head">' +
        '<strong>' + escapeHTML(dimension.label) + '</strong>' +
        '<span>' + escapeHTML(dimension.score) + '</span>' +
      '</div>' +
      '<p>' + escapeHTML(dimension.comment) + '</p>' +
    '</div>';
  }).join('') + '</div>';
}

function getFeedbackList(report, key, fallback) {
  if (report.feedback && Array.isArray(report.feedback[key])) return report.feedback[key];
  const value = report[key] || fallback || '';
  return Array.isArray(value) ? value : [value].filter(Boolean);
}

function renderFormalReport(report) {
  const overview = report.overview || {};
  const work = report.work || {};
  return '<h3>' + escapeHTML(report.title) + '</h3>' +
    '<section id="work-overview">' +
      '<h4>作品概览</h4>' +
      renderInfoGrid([
        { label: '作品类型', value: overview.workType || work.mediaNode || '艺术设计类综合作品' },
        { label: '主题方向', value: overview.themeDirection || work.track || '开放命题' },
        { label: '适合竞赛类别', value: overview.competitionCategory || work.breadcrumb || '艺术设计创新实践类竞赛' },
        { label: '当前完成度判断', value: overview.completion || '中等完成度：建议补充过程材料后再提交。' },
      ]) +
    '</section>' +
    '<section id="basic-info">' +
      '<h4>作品基本信息</h4>' +
      renderInfoGrid([
        { label: '作品名称', value: work.title || '未命名作品' },
        { label: '评测类型', value: work.mode || '赛前预评审' },
        { label: '竞赛节点', value: work.breadcrumb || '未选择' },
        { label: '媒体节点', value: work.mediaNode || '未选择' },
      ]) +
    '</section>' +
    '<section id="total-score">' +
      '<h4>总评分</h4>' +
      '<div class="score-summary">' +
        '<strong>' + escapeHTML(report.score) + '<span>/100</span></strong>' +
        '<div><b>' + escapeHTML(report.grade || '可进入初审') + '</b><p>' + escapeHTML(report.gradeAdvice || '') + '</p></div>' +
      '</div>' +
    '</section>' +
    '<section id="overall-review"><h4>整体评价</h4><p>' + escapeHTML(report.overall) + '</p></section>' +
    '<section id="dimension-analysis"><h4>维度评分</h4>' + renderDimensionScores(report.dimensions || []) + '</section>' +
    '<section id="strengths"><h4>主要优点</h4>' + renderTextList(getFeedbackList(report, 'strengths')) + '</section>' +
    '<section id="problems"><h4>主要问题</h4>' + renderTextList(getFeedbackList(report, 'problems')) + '</section>' +
    '<section id="revision-suggestions"><h4>修改建议</h4>' + renderTextList(getFeedbackList(report, 'suggestions', report.suggestions)) + '</section>' +
    '<section id="submission-checklist"><h4>提交前检查清单</h4>' + renderTextList(getFeedbackList(report, 'checklist')) + '</section>' +
    '<section id="competition-fit"><h4>参赛方向匹配度</h4><p>' + escapeHTML(report.competitionFit) + '</p></section>' +
    '<section id="summary"><h4>总结</h4><p>' + escapeHTML(report.summary) + '</p></section>';
}

export function updateReportPanel(report) {
  const score = document.querySelector('.score');
  const scoreText = score && score.querySelector('span');
  const formalReport = document.getElementById(DOM_IDS.formalReport);
  if (!formalReport) return;

  if (score) {
    score.setAttribute('aria-label', '综合分 ' + report.score + '，' + (report.grade || ''));
    score.style.background = 'conic-gradient(var(--accent) 0 ' + report.score + '%, #e6e6e6 ' + report.score + '% 100%)';
  }
  if (scoreText) scoreText.textContent = String(report.score);

  formalReport.innerHTML = renderFormalReport(report);
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

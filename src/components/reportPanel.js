import { DOM_IDS } from '../ids.js';
import { downloadTextFile } from '../utils/file.js';

export function renderReportPanel() {
  return "<section class=\"report-section\" aria-label=\"正式预评审报告\" hidden>\n          <div class=\"section-head\">\n            <div>\n              <h2>正式预评审报告</h2>\n              <p>面向老师、学生和参赛提交场景整理成可阅读、分享和下载的文本报告。</p>\n            </div>\n          </div>\n\n          <div class=\"formal-report\" id=\"formalReport\"></div>\n        </section>";
}

function temporarilyLabel(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => { button.textContent = original; }, 1400);
}

function getReportMarkdown(formalReport) {
  if (!formalReport) return '# AI 预评审文本报告\n';
  const title = (formalReport.querySelector('h3') && formalReport.querySelector('h3').textContent.trim()) || 'AI 预评审文本报告';
  const lines = Array.from(formalReport.querySelectorAll('.report-flow > li')).map((item) => '- ' + item.textContent.trim().replace(/\s+/g, ' '));
  return '# ' + title + '\n\n' + lines.join('\n');
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

function getFeedbackList(report, key, fallback) {
  if (report.feedback && Array.isArray(report.feedback[key])) return report.feedback[key];
  const value = report[key] || fallback || '';
  return Array.isArray(value) ? value : [value].filter(Boolean);
}

function renderReportActions() {
  return '<div class="report-actions" aria-label="报告操作">' +
    '<div class="report-action-group">' +
      '<button class="report-action" id="shareReport" type="button" aria-expanded="false" aria-controls="sharePanel">分享</button>' +
      '<div class="share-panel" id="sharePanel" hidden>' +
        '<label for="shareLink">可复制链接</label>' +
        '<div class="share-row">' +
          '<input id="shareLink" readonly value="">' +
          '<button id="copyShareLink" type="button">复制</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="report-action-group">' +
      '<button class="report-action" id="downloadReport" type="button" aria-expanded="false" aria-controls="downloadMenu">下载</button>' +
      '<div class="action-menu" id="downloadMenu" hidden>' +
        '<button id="downloadPdf" type="button">下载 PDF</button>' +
        '<button id="downloadMarkdown" type="button">下载 Markdown</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderInlineList(items) {
  const safeItems = Array.isArray(items) ? items : [];
  return '<ul>' + safeItems.map((item) => '<li>' + escapeHTML(item) + '</li>').join('') + '</ul>';
}

function getDimensionScore(dimension) {
  if (!dimension || typeof dimension === 'string') return 0;
  const score = Number(dimension.score);
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(20, Math.round(score / 5)));
}

function renderDimensionFlow(dimensions) {
  return '<ul class="dimension-flow">' + (dimensions || []).map((dimension) => {
    const label = typeof dimension === 'string' ? dimension : dimension.label;
    const comment = typeof dimension === 'string' ? '' : dimension.comment;
    return '<li><strong>' + escapeHTML(label) + '：</strong>' +
      '<ul>' +
        '<li>分数：' + getDimensionScore(dimension) + '</li>' +
        '<li>满分：20</li>' +
        '<li>评语：' + escapeHTML(comment || '需结合提交材料进一步细化评审判断。') + '</li>' +
      '</ul>' +
    '</li>';
  }).join('') + '</ul>';
}

function renderFormalReport(report) {
  const overview = report.overview || {};
  const work = report.work || {};
  const strengths = getFeedbackList(report, 'strengths');
  const problems = getFeedbackList(report, 'problems');
  const suggestions = getFeedbackList(report, 'suggestions', report.suggestions);
  const checklist = getFeedbackList(report, 'checklist');
  return '<div class="report-text-head">' +
      '<h3>' + escapeHTML(report.title || 'AI 预评审文本报告') + '</h3>' +
      renderReportActions() +
    '</div>' +
    '<ul class="report-flow">' +
      '<li><strong>名称：</strong>' + escapeHTML(work.title || '未命名作品') + '</li>' +
      '<li><strong>作品概览：</strong>' +
        '<ul>' +
          '<li>作品类型：' + escapeHTML(overview.workType || work.mediaNode || '艺术设计类综合作品') + '</li>' +
          '<li>主题方向：' + escapeHTML(overview.themeDirection || work.track || '开放命题') + '</li>' +
          '<li>适合竞赛类别：' + escapeHTML(overview.competitionCategory || work.breadcrumb || '艺术设计创新实践类竞赛') + '</li>' +
          '<li>当前完成度判断：' + escapeHTML(overview.completion || '中等完成度：建议补充过程材料后再提交。') + '</li>' +
        '</ul>' +
      '</li>' +
      '<li><strong>总体观察：</strong>' + escapeHTML(report.overall || report.summary || '') + '</li>' +
      '<li><strong>分类评价：</strong>' + renderDimensionFlow(report.dimensions || []) + '</li>' +
      '<li><strong>总得分：</strong>' + escapeHTML(report.score) + '</li>' +
      '<li><strong>满分：</strong>100</li>' +
      '<li><strong>等级判断：</strong>' + escapeHTML(report.grade || '可进入初审') + '</li>' +
      '<li><strong>总体评价：</strong>' + escapeHTML(report.gradeAdvice || report.summary || '') + '</li>' +
      '<li><strong>竞赛适配：</strong>' + escapeHTML(report.competitionFit || '') + '</li>' +
      '<li><strong>主要优点：</strong>' + renderInlineList(strengths) + '</li>' +
      '<li><strong>主要问题：</strong>' + renderInlineList(problems) + '</li>' +
      '<li><strong>修改建议：</strong>' + renderInlineList(suggestions) + '</li>' +
      '<li><strong>提交前检查清单：</strong>' + renderInlineList(checklist) + '</li>' +
    '</ul>';
}

export function updateReportPanel(report) {
  const formalReport = document.getElementById(DOM_IDS.formalReport);
  if (!formalReport) return;
  const reportSection = formalReport.closest('.report-section');
  if (reportSection) reportSection.hidden = false;
  formalReport.innerHTML = renderFormalReport(report);
}

export function bindReportPanel() {
  function closeReportMenus() {
    const shareReport = document.getElementById(DOM_IDS.shareReport);
    const sharePanel = document.getElementById(DOM_IDS.sharePanel);
    const downloadReport = document.getElementById(DOM_IDS.downloadReport);
    const downloadMenu = document.getElementById(DOM_IDS.downloadMenu);
    if (sharePanel) sharePanel.hidden = true;
    if (downloadMenu) downloadMenu.hidden = true;
    if (shareReport) shareReport.setAttribute('aria-expanded', 'false');
    if (downloadReport) downloadReport.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('#' + DOM_IDS.shareReport)) {
      const shareReport = document.getElementById(DOM_IDS.shareReport);
      const sharePanel = document.getElementById(DOM_IDS.sharePanel);
      const shareLink = document.getElementById(DOM_IDS.shareLink);
      if (!shareReport || !sharePanel || !shareLink) return;
      event.stopPropagation();
      const willOpen = sharePanel.hidden;
      closeReportMenus();
      sharePanel.hidden = !willOpen;
      shareReport.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) { shareLink.value = getShareUrl(); shareLink.select(); }
      return;
    }

    if (target.closest('#' + DOM_IDS.copyShareLink)) {
      const copyShareLink = document.getElementById(DOM_IDS.copyShareLink);
      const shareLink = document.getElementById(DOM_IDS.shareLink);
      if (!copyShareLink || !shareLink) return;
      shareLink.value = getShareUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(shareLink.value);
      temporarilyLabel(copyShareLink, '已复制');
      return;
    }

    if (target.closest('#' + DOM_IDS.downloadReport)) {
      const downloadReport = document.getElementById(DOM_IDS.downloadReport);
      const downloadMenu = document.getElementById(DOM_IDS.downloadMenu);
      if (!downloadReport || !downloadMenu) return;
      event.stopPropagation();
      const willOpen = downloadMenu.hidden;
      closeReportMenus();
      downloadMenu.hidden = !willOpen;
      downloadReport.setAttribute('aria-expanded', String(willOpen));
      return;
    }

    if (target.closest('#' + DOM_IDS.downloadPdf)) {
      closeReportMenus();
      window.print();
      return;
    }

    if (target.closest('#' + DOM_IDS.downloadMarkdown)) {
      const formalReport = document.getElementById(DOM_IDS.formalReport);
      closeReportMenus();
      downloadTextFile('ai-art-review-report.md', getReportMarkdown(formalReport), 'text/markdown;charset=utf-8');
      return;
    }

    if (!target.closest('.report-action-group')) closeReportMenus();
  });

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeReportMenus(); });
}

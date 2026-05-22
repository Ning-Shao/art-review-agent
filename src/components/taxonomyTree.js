import { DOM_IDS } from '../ids.js';
import {
  formatRuralRevitalizationContext,
  ruralRevitalizationTrack,
} from '../data/competitionRequirements.js';

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

function renderDirectionButtons() {
  return ruralRevitalizationTrack.directions.map((direction, index) => (
    '<li><button class="context-child direction-child' + (index === 0 ? ' active' : '') + '" type="button" data-project-type="competition" data-requirement-id="' + direction.id + '" data-breadcrumb="固定赛事 / 米兰设计周-高校设计作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / ' + escapeHTML(direction.label) + '"><span class="chev"></span><span class="node-text">' + escapeHTML(direction.label) + '</span></button></li>'
  )).join('');
}

export function renderTaxonomyTree() {
  const defaultDirection = ruralRevitalizationTrack.directions[0];
  return "<aside class=\"left-rail review-context-rail\" aria-label=\"评审对象与要求\">\n" +
    "        <div class=\"left-collapsed-tools\" aria-label=\"折叠后的评审对象与要求区\">\n" +
    "          <button class=\"left-collapse-card\" id=\"expandLeft\" type=\"button\" aria-label=\"展开评审对象与要求\">›</button>\n" +
    "        </div>\n" +
    "        <div class=\"context-accordion\">\n" +
    "          <section class=\"context-group\" aria-label=\"竞赛项目\">\n" +
    "            <div class=\"context-group-head\"><h3>竞赛项目</h3><button class=\"left-collapse-card\" id=\"collapseLeft\" type=\"button\" aria-label=\"收起评审对象与要求\">‹</button></div>\n" +
    "            <button class=\"context-node active\" type=\"button\" data-context-target=\"milanContext\" data-project-type=\"competition\" data-requirement-id=\"" + defaultDirection.id + "\" data-breadcrumb=\"固定赛事 / 米兰设计周-高校设计作品展\">\n" +
    "              <span class=\"chev\">▾</span><span class=\"node-text\">米兰设计周-高校设计作品展</span><span class=\"badge\">竞赛</span>\n" +
    "            </button>\n" +
    "            <div class=\"context-detail\" id=\"milanContext\">\n" +
    "              <ul class=\"context-tree\" aria-label=\"米兰设计周赛事层级\">\n" +
    "                <li>\n" +
    "                  <button class=\"context-child active\" type=\"button\" data-project-type=\"competition\" data-requirement-id=\"" + defaultDirection.id + "\" data-breadcrumb=\"固定赛事 / 米兰设计周-高校设计作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道\"><span class=\"chev\">▾</span><span class=\"node-text\">" + escapeHTML(ruralRevitalizationTrack.label) + "</span><span class=\"badge\">赛道</span></button>\n" +
    "                  <ul class=\"direction-list\">\n" + renderDirectionButtons() + "\n                  </ul>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "            <button class=\"context-node disabled-node\" type=\"button\" disabled aria-disabled=\"true\" data-project-type=\"competition\" data-breadcrumb=\"固定赛事 / 全国大学生设计创新实践大赛\">\n" +
    "              <span class=\"chev\">▸</span><span class=\"node-text\">全国大学生设计创新实践大赛</span><span class=\"badge\">竞赛</span>\n" +
    "            </button>\n" +
    "            <button class=\"context-node\" type=\"button\" data-context-target=\"moreCompetitionContext\" data-project-type=\"more-competition\" data-breadcrumb=\"更多赛事\">\n" +
    "              <span class=\"chev\">▸</span><span class=\"node-text\">更多赛事</span><span class=\"badge\">可填写</span>\n" +
    "            </button>\n" +
    "            <div class=\"context-detail\" id=\"moreCompetitionContext\" hidden>\n" +
    "              <label class=\"context-field\" for=\"moreCompetitionName\"><span>赛事名称</span><input id=\"moreCompetitionName\" type=\"text\" placeholder=\"请输入赛事名称\"></label>\n" +
    "              <label class=\"context-field\" for=\"moreCompetitionTheme\"><span>赛事主题</span><input id=\"moreCompetitionTheme\" type=\"text\" placeholder=\"请输入赛事主题\"></label>\n" +
    "              <label class=\"context-field\" for=\"moreCompetitionCategory\"><span>参赛类别</span><input id=\"moreCompetitionCategory\" type=\"text\" placeholder=\"请输入参赛类别\"></label>\n" +
    "              <label class=\"context-field\" for=\"competitionRequirement\"><span>作品要求</span><textarea id=\"competitionRequirement\" placeholder=\"粘贴作品要求、提交材料要求或赛事章程摘要。\"></textarea></label>\n" +
    "            </div>\n" +
    "          </section>\n" +
    "          <section class=\"context-group\" aria-label=\"自定义项目\">\n" +
    "            <h3>自定义项目</h3>\n" +
    "            <button class=\"context-node\" type=\"button\" data-context-target=\"customContext\" data-project-type=\"custom\" data-breadcrumb=\"自定义项目\">\n" +
    "              <span class=\"chev\">▸</span><span class=\"node-text\">自定义项目</span><span class=\"badge\">标签 + 填写</span>\n" +
    "            </button>\n" +
    "            <div class=\"context-detail\" id=\"customContext\" hidden>\n" +
    "              <div class=\"context-field\"><span>项目类型</span><div class=\"tag-group\" role=\"group\" aria-label=\"自定义项目类型\">\n" +
    "                <button class=\"tag-button active\" type=\"button\" data-context-tag=\"课程作业\">课程作业</button>\n" +
    "                <button class=\"tag-button\" type=\"button\" data-context-tag=\"毕业设计\">毕业设计</button>\n" +
    "                <button class=\"tag-button\" type=\"button\" data-context-tag=\"项目实践\">项目实践</button>\n" +
    "                <button class=\"tag-button\" type=\"button\" data-context-tag=\"作品集\">作品集</button>\n" +
    "                <button class=\"tag-button\" type=\"button\" data-context-tag=\"其他\">其他</button>\n" +
    "              </div></div>\n" +
    "              <label class=\"context-field\" for=\"projectName\"><span>项目名称</span><input id=\"projectName\" type=\"text\" placeholder=\"请输入项目名称\"></label>\n" +
    "              <label class=\"context-field\" for=\"assignmentRequirement\"><span>项目要求</span><textarea id=\"assignmentRequirement\" placeholder=\"填写课程作业、毕业设计或项目实践的要求。\"></textarea></label>\n" +
    "              <label class=\"context-field\" for=\"reviewContext\"><span>补充说明</span><textarea id=\"reviewContext\" placeholder=\"补充目标观众、课程背景、希望重点关注的扣分点。\"></textarea></label>\n" +
    "            </div>\n" +
    "          </section>\n" +
    "        </div>\n" +
    "      </aside>";
}

function updateContext(store, breadcrumb, detail = {}) {
  store.selectedProjectType = detail.projectType || store.selectedProjectType || 'competition';
  store.selectedProjectTag = detail.projectTag || '';
  store.selectedRequirementId = detail.requirementId || '';
  store.selectedRequirementContext = detail.requirementId ? formatRuralRevitalizationContext(detail.requirementId) : (detail.requirementContext || '');
  store.selectedBreadcrumb = detail.breadcrumb || store.selectedBreadcrumb;
  if (breadcrumb) breadcrumb.textContent = store.selectedBreadcrumb;
  document.dispatchEvent(new CustomEvent('projectContextChange', {
    detail: {
      projectType: store.selectedProjectType,
      breadcrumb: store.selectedBreadcrumb,
      projectTag: store.selectedProjectTag,
      requirementId: store.selectedRequirementId,
    },
  }));
}

function setActiveContext(button, store, breadcrumb) {
  const targetId = button.dataset.contextTarget;
  const targetDetail = targetId ? document.getElementById(targetId) : null;
  const shouldExpand = !targetDetail || targetDetail.hidden;
  document.querySelectorAll('.context-node').forEach((node) => {
    const isActive = node === button;
    node.classList.toggle('active', isActive);
    const indicator = node.querySelector('.chev');
    if (indicator) indicator.textContent = isActive && shouldExpand ? '▾' : '▸';
  });
  document.querySelectorAll('.context-detail').forEach((detail) => {
    detail.hidden = detail.id !== targetId || !shouldExpand;
  });
  updateContext(store, breadcrumb, {
    projectType: button.dataset.projectType || 'competition',
    requirementId: button.dataset.requirementId || '',
    breadcrumb: button.dataset.breadcrumb || button.textContent.trim(),
  });
}

export function bindTaxonomyTree(store) {
  const breadcrumb = document.getElementById(DOM_IDS.breadcrumb);
  const shell = document.getElementById(DOM_IDS.shell);
  const workspace = document.querySelector('.workspace');
  const collapseLeft = document.getElementById(DOM_IDS.collapseLeft);
  const expandLeft = document.getElementById(DOM_IDS.expandLeft);
  store.selectedRequirementId = ruralRevitalizationTrack.directions[0].id;
  store.selectedRequirementContext = formatRuralRevitalizationContext(store.selectedRequirementId);
  const mobileRailQuery = window.matchMedia('(max-width: 860px)');

  function isMobileRailLocked() {
    return mobileRailQuery.matches;
  }

  function updateShellColumns() {
    if (!shell || !workspace) return;
    const rootStyle = getComputedStyle(document.documentElement);
    const openLeft = rootStyle.getPropertyValue('--left-w').trim() || '300px';
    const openRight = rootStyle.getPropertyValue('--right-w').trim() || '196px';
    const rightCollapsed = shell.classList.contains('right-collapsed');
    const right = rightCollapsed ? '44px' : openRight;
    const rightOffset = rightCollapsed ? Number.parseFloat(openRight) - 44 : 0;
    const baseWorkspaceWidth = shell.getBoundingClientRect().width - Number.parseFloat(openLeft) - Number.parseFloat(openRight);
    shell.style.gridTemplateColumns = openLeft + ' minmax(0, 1fr) ' + right;
    workspace.style.left = '';
    workspace.style.width = rightOffset ? baseWorkspaceWidth + rightOffset + 'px' : '';
    shell.classList.toggle('left-narrow', Number.parseFloat(openLeft) <= 72);
  }

  function setLeftCollapsed(collapsed) {
    if (isMobileRailLocked()) return;
    const rootStyle = getComputedStyle(document.documentElement);
    const leftMaxWidth = Number.parseFloat(rootStyle.getPropertyValue('--left-max-w')) || 300;
    document.documentElement.style.setProperty('--left-w', (collapsed ? 44 : leftMaxWidth) + 'px');
    updateShellColumns();
  }

  if (collapseLeft) collapseLeft.addEventListener('click', () => setLeftCollapsed(true));
  if (expandLeft) expandLeft.addEventListener('click', () => setLeftCollapsed(false));

  document.querySelectorAll('.context-node').forEach((button) => {
    const nodeText = button.querySelector('.node-text');
    const label = nodeText?.textContent.trim();
    if (label) {
      button.setAttribute('title', label);
      nodeText.setAttribute('title', label);
    }
    if (button.disabled) return;
    button.addEventListener('click', () => setActiveContext(button, store, breadcrumb));
  });
  document.querySelectorAll('.context-child').forEach((button) => {
    const nodeText = button.querySelector('.node-text');
    const label = nodeText?.textContent.trim();
    if (label) {
      button.setAttribute('title', label);
      nodeText.setAttribute('title', label);
    }
    button.addEventListener('click', () => {
      document.querySelectorAll('.context-child').forEach((node) => node.classList.remove('active'));
      button.classList.add('active');
      const directionList = button.closest('li')?.querySelector(':scope > .direction-list');
      const indicator = button.querySelector('.chev');
      if (directionList) {
        const shouldExpand = directionList.hidden;
        directionList.hidden = !shouldExpand;
        if (indicator) indicator.textContent = shouldExpand ? '▾' : '▸';
      }
      const requirementId = button.dataset.requirementId || store.selectedRequirementId;
      updateContext(store, breadcrumb, {
        projectType: button.dataset.projectType || 'competition',
        requirementId,
        breadcrumb: button.dataset.breadcrumb || label,
      });
    });
  });
  document.querySelectorAll('.tag-button').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('.tag-group');
      if (group) group.querySelectorAll('.tag-button').forEach((node) => node.classList.remove('active'));
      button.classList.add('active');
      if (button.dataset.contextTag) {
        updateContext(store, breadcrumb, {
          projectType: 'custom',
          projectTag: button.dataset.contextTag,
          breadcrumb: '自定义项目 / ' + button.dataset.contextTag,
          requirementContext: '',
        });
      }
    });
  });
}

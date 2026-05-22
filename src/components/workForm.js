import { generateMockReview } from '../services/aiReviewService.mock.js';

let descriptionFiles = [];

export function renderWorkForm() {

  return "<div class=\"panel work-form-panel\">\n            <h2 class=\"panel-title\">作品说明</h2>\n            <div class=\"field-grid\" id=\"workFieldGrid\"></div>\n          </div>";

}

function temporarilyLabel(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => { button.textContent = original; }, 1400);
}

function renderFieldGrid(projectType) {
  return '<div class="field full">' +
      '<label class="sr-only" for="desc">作品说明</label>' +
      '<textarea id="desc" placeholder="输入或粘贴作品说明、创作背景、设计目标、过程摘要等。"></textarea>' +
      '<div class="requirement-upload">' +
        '<button class="requirement-upload-button" id="descriptionFileButton" type="button">上传说明文档</button>' +
        '<span>支持 Word / PDF / TXT</span>' +
        '<input id="descriptionFileInput" type="file" accept=".doc,.docx,.pdf,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain" multiple hidden>' +
      '</div>' +
      '<ul class="requirement-file-list" id="descriptionFileList" aria-live="polite"></ul>' +
    '</div>';
}

function getContextText(store) {
  return store.selectedBreadcrumb || '';
}

function getUploadContextText(uploads) {
  const roleLabels = {
    cover: '作品封面 / 主展示图',
    gallery: '作品图集 / 辅助展示图',
  };
  if (!uploads.length) return '';
  return '作品文件标签：' + uploads.map((item, index) => {
    const label = roleLabels[item.role] || (index === 0 ? '默认历史封面' : '未标记');
    return item.name + '（' + label + '）';
  }).join('；');
}

function getWorkFormValues(store) {
  const contextText = getContextText(store);
  const description = document.getElementById('desc')?.value.trim();
  const projectName = document.getElementById('projectName')?.value.trim();
  const moreCompetitionName = document.getElementById('moreCompetitionName')?.value.trim();
  const moreCompetitionTheme = document.getElementById('moreCompetitionTheme')?.value.trim();
  const moreCompetitionCategory = document.getElementById('moreCompetitionCategory')?.value.trim();
  const competitionRequirement = document.getElementById('competitionRequirement')?.value.trim();
  const assignmentRequirement = document.getElementById('assignmentRequirement')?.value.trim();
  const reviewContext = document.getElementById('reviewContext')?.value.trim();
  const descriptionFileText = descriptionFiles.length ? '说明文档：' + descriptionFiles.map((file) => file.name).join('、') : '';
  const uploadContextText = getUploadContextText(store.uploads || []);
  const contextBlocks = [
    description,
    descriptionFileText,
    uploadContextText,
    store.selectedRequirementContext ? '当前设计方向赛事要求：' + store.selectedRequirementContext : '',
    moreCompetitionName ? '赛事名称：' + moreCompetitionName : '',
    moreCompetitionTheme ? '赛事主题：' + moreCompetitionTheme : '',
    moreCompetitionCategory ? '参赛类别：' + moreCompetitionCategory : '',
    competitionRequirement ? '赛事要求：' + competitionRequirement : '',
    projectName ? '项目名称：' + projectName : '',
    assignmentRequirement ? '项目要求：' + assignmentRequirement : '',
    store.selectedProjectTag ? '项目类型标签：' + store.selectedProjectTag : '',
    reviewContext ? '评审上下文：' + reviewContext : '',
  ];
  return {
    title: projectName || moreCompetitionName || '未命名作品',
    mode: store.selectedProjectType === 'custom' || store.selectedProjectType === 'personal' ? '自定义项目预评审' : '竞赛项目预评审',
    category: contextText.split(' / ')[0] || '竞赛项目',
    track: contextText.split(' / ').slice(1).join(' / ') || contextText,
    theme: moreCompetitionTheme || store.selectedProjectTag || '',
    description: contextBlocks.filter(Boolean).join('\n'),
    breadcrumb: contextText,
    mediaNode: contextText,
  };
}

function renderDescriptionFiles() {
  const list = document.getElementById('descriptionFileList');
  if (!list) return;
  list.innerHTML = descriptionFiles.length
    ? descriptionFiles.map((file) => '<li>' + file.name + '</li>').join('')
    : '<li class="empty">尚未上传说明文档</li>';
}

function bindDescriptionUpload() {
  const input = document.getElementById('descriptionFileInput');
  const button = document.getElementById('descriptionFileButton');
  if (!input || !button) return;
  button.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    descriptionFiles = Array.from(input.files || []).map((file) => ({ name: file.name }));
    renderDescriptionFiles();
    input.value = '';
  });
  renderDescriptionFiles();
}

function updateWorkFields(projectType) {
  const fieldGrid = document.getElementById('workFieldGrid');
  if (!fieldGrid) return;
  const currentValues = {
    desc: document.getElementById('desc')?.value,
  };
  fieldGrid.innerHTML = renderFieldGrid(projectType);
  if (currentValues.desc) document.getElementById('desc').value = currentValues.desc;
  bindDescriptionUpload();
}

export function bindWorkForm(store, handlers = {}) {
  updateWorkFields(store.selectedProjectType || 'competition');
  document.addEventListener('projectContextChange', (event) => {
    updateWorkFields(event.detail && event.detail.projectType ? event.detail.projectType : 'competition');
  });

  const button = document.querySelector('.cta');
  if (!button) return;
  button.addEventListener('click', async () => {
    if (!store.uploads.length) {
      temporarilyLabel(button, '请先上传作品');
      return;
    }
    const report = await generateMockReview(getWorkFormValues(store));
    if (handlers.onReportGenerated) handlers.onReportGenerated(report);
    temporarilyLabel(button, '已生成报告');
  });
}

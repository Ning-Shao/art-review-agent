import { generateMockReview } from '../services/aiReviewService.mock.js';

export function renderWorkForm() {

  return "<div class=\"panel\">\n            <h2 class=\"panel-title\">作品信息</h2>\n            <p class=\"panel-copy\">根据左侧项目类型填写作品信息。</p>\n            <div class=\"field-grid\" id=\"workFieldGrid\"></div>\n            <button class=\"cta\" type=\"button\">生成预评审报告</button>\n          </div>";

}

function temporarilyLabel(button, label) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => { button.textContent = original; }, 1400);
}

function renderFieldGrid(projectType) {
  const shouldShowRequirement = projectType === 'personal';
  return '<div class="field full">' +
      '<label for="title">作品名称</label>' +
      '<input id="title" value="土特产宣传海报设计">' +
    '</div>' +
    '<div class="field full">' +
      '<label for="desc">作品说明</label>' +
      '<textarea id="desc">围绕地方土特产的品牌传播与视觉表达，完成一组面向公益赛道提交的设计方案。</textarea>' +
    '</div>' +
    (shouldShowRequirement
      ? '<div class="field full">' +
          '<label for="requirement">作品要求</label>' +
          '<textarea id="requirement">请填写课程、毕业设计或实践项目对主题、格式、成果数量、提交规范等方面的具体要求。</textarea>' +
        '</div>'
      : '');
}

function getContextText(store) {
  return store.selectedBreadcrumb || '';
}

function getWorkFormValues(store) {
  const contextText = getContextText(store);
  const title = document.getElementById('title')?.value.trim();
  const description = document.getElementById('desc')?.value.trim();
  const requirement = document.getElementById('requirement')?.value.trim();
  return {
    title,
    mode: store.selectedProjectType === 'personal' ? '个人项目预评审' : '竞赛项目预评审',
    category: contextText.split(' / ')[0] || '竞赛项目',
    track: contextText.split(' / ').slice(1).join(' / ') || contextText,
    theme: '',
    description: [description, requirement ? '作品要求：' + requirement : ''].filter(Boolean).join('\n'),
    breadcrumb: contextText,
    mediaNode: contextText,
  };
}

function updateWorkFields(projectType) {
  const fieldGrid = document.getElementById('workFieldGrid');
  if (!fieldGrid) return;
  const currentValues = {
    title: document.getElementById('title')?.value,
    desc: document.getElementById('desc')?.value,
    requirement: document.getElementById('requirement')?.value,
  };
  fieldGrid.innerHTML = renderFieldGrid(projectType);
  if (currentValues.title) document.getElementById('title').value = currentValues.title;
  if (currentValues.desc) document.getElementById('desc').value = currentValues.desc;
  if (projectType === 'personal' && currentValues.requirement) {
    document.getElementById('requirement').value = currentValues.requirement;
  }
}

export function bindWorkForm(store, handlers = {}) {
  updateWorkFields(store.selectedProjectType || 'competition');
  document.addEventListener('projectContextChange', (event) => {
    updateWorkFields(event.detail && event.detail.projectType ? event.detail.projectType : 'competition');
  });

  const button = document.querySelector('.cta');
  if (!button) return;
  button.addEventListener('click', async () => {
    const report = await generateMockReview(getWorkFormValues(store));
    if (handlers.onReportGenerated) handlers.onReportGenerated(report);
    temporarilyLabel(button, '已生成报告');
  });
}

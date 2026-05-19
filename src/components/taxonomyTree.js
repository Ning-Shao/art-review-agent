import { DOM_IDS } from '../ids.js';

export function renderTaxonomyTree() {

  return "<aside class=\"left-rail\" aria-label=\"项目类型\">\n\t        <div class=\"left-head\">\n\t          <h2 class=\"rail-title\">项目类型</h2>\n\t        </div>\n\t        <ul class=\"tree\">\n\t          <li><span class=\"node-section-label\">竞赛项目</span></li>\n\t          <li>\n\t            <button class=\"active\" type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道\"><span class=\"chev\">▾</span><span class=\"node-text\">第四届“设计赋能‘土特产’，助力乡村振兴”公益赛道</span><span class=\"badge\">竞赛</span></button>\n\t            <ul>\n\t              <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向一：土特产宣传海报设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向一：土特产宣传海报设计</span></button></li>\n\t              <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向二：土特产包装设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向二：土特产包装设计</span></button></li>\n\t              <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向三：土特产区域公共品牌设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向三：土特产区域公共品牌设计</span></button></li>\n\t              <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向四：土特产产品创意设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向四：土特产产品创意设计</span></button></li>\n\t              <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向五：土特产短视频创作\"><span class=\"chev\"></span><span class=\"node-text\">设计方向五：土特产短视频创作</span></button></li>\n\t            </ul>\n\t          </li>\n\t          <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展\"><span class=\"chev\"></span><span class=\"node-text\">米兰设计周中国高校设计学科师生优秀作品展</span><span class=\"badge\">竞赛</span></button></li>\n\t          <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 全国大学生设计创新实践大赛\"><span class=\"chev\"></span><span class=\"node-text\">全国大学生设计创新实践大赛</span><span class=\"badge\">竞赛</span></button></li>\n\t          <li><span class=\"node-section-label\">个人项目</span></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 毕业设计\"><span class=\"chev\"></span><span class=\"node-text\">毕业设计</span></button></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 课程作业\"><span class=\"chev\"></span><span class=\"node-text\">课程作业</span></button></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 实践项目\"><span class=\"chev\"></span><span class=\"node-text\">实践项目</span></button></li>\n\t        </ul>\n\t      </aside>";

}

export function bindTaxonomyTree(store) {
  const breadcrumb = document.getElementById(DOM_IDS.breadcrumb);
  document.querySelectorAll('.tree button').forEach((button) => {
    const nodeText = button.querySelector('.node-text');
    const label = nodeText && nodeText.textContent.trim();
    if (label) button.setAttribute('title', label);
    button.addEventListener('click', () => {
      const item = button.closest('li');
      const childList = item && item.querySelector(':scope > ul');
      if (childList) {
        item.classList.toggle('collapsed');
        const indicator = button.querySelector('.chev');
        if (indicator) indicator.textContent = item.classList.contains('collapsed') ? '▸' : '▾';
      }
      document.querySelectorAll('.tree button').forEach((node) => node.classList.remove('active'));
      button.classList.add('active');
      store.selectedProjectType = button.dataset.projectType || store.selectedProjectType || 'competition';
      store.selectedBreadcrumb = button.dataset.breadcrumb || (button.querySelector('.node-text') && button.querySelector('.node-text').textContent.trim()) || store.selectedBreadcrumb;
      if (breadcrumb) breadcrumb.textContent = store.selectedBreadcrumb;
      document.dispatchEvent(new CustomEvent('projectContextChange', {
        detail: {
          projectType: store.selectedProjectType,
          breadcrumb: store.selectedBreadcrumb,
        },
      }));
    });
  });
}

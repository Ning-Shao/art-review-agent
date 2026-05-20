import { DOM_IDS } from '../ids.js';

export function renderTaxonomyTree() {

  return "<aside class=\"left-rail\" aria-label=\"项目类型\">\n\t        <div class=\"left-head\">\n\t          <h2 class=\"rail-title\">项目类型</h2>\n\t        </div>\n\t        <ul class=\"tree\">\n\t          <li><span class=\"node-section-label\">竞赛项目</span></li>\n\t          <li>\n\t            <button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展\"><span class=\"chev\">▾</span><span class=\"node-text\">米兰设计周中国高校设计学科师生优秀作品展</span><span class=\"badge\">竞赛</span></button>\n\t            <ul>\n\t              <li>\n\t                <button class=\"active\" type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道\"><span class=\"chev\">▾</span><span class=\"node-text\">第四届“设计赋能‘土特产’，助力乡村振兴”公益赛道</span><span class=\"badge\">赛道</span></button>\n\t                <ul>\n\t                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向一：土特产宣传海报设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向一：土特产宣传海报设计</span></button></li>\n\t                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向二：土特产包装设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向二：土特产包装设计</span></button></li>\n\t                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向三：土特产区域公共品牌设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向三：土特产区域公共品牌设计</span></button></li>\n\t                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向四：土特产产品创意设计\"><span class=\"chev\"></span><span class=\"node-text\">设计方向四：土特产产品创意设计</span></button></li>\n\t                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 设计方向五：土特产短视频创作\"><span class=\"chev\"></span><span class=\"node-text\">设计方向五：土特产短视频创作</span></button></li>\n\t                </ul>\n\t              </li>\n\t            </ul>\n\t          </li>\n\t          <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 全国大学生设计创新实践大赛\"><span class=\"chev\"></span><span class=\"node-text\">全国大学生设计创新实践大赛</span><span class=\"badge\">竞赛</span></button></li>\n\t          <li><span class=\"node-section-label\">个人项目</span></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 毕业设计\"><span class=\"chev\"></span><span class=\"node-text\">毕业设计</span></button></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 课程作业\"><span class=\"chev\"></span><span class=\"node-text\">课程作业</span></button></li>\n\t          <li><button type=\"button\" data-project-type=\"personal\" data-breadcrumb=\"个人项目 / 实践项目\"><span class=\"chev\"></span><span class=\"node-text\">实践项目</span></button></li>\n\t        </ul>\n\t        <button class=\"settings-launch\" id=\"settingsToggle\" type=\"button\" aria-haspopup=\"dialog\" aria-controls=\"settingsModal\" aria-label=\"打开用户登录\">\n\t          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n\t            <path d=\"M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z\"></path>\n\t            <path d=\"M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2.05 2.05 0 0 1-2.9 2.9l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2.05 2.05 0 0 1-4.1 0v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2.05 2.05 0 0 1-2.9-2.9l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2.05 2.05 0 0 1 0-4.1h.1A1.7 1.7 0 0 0 4.66 8.8a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2.05 2.05 0 0 1 2.9-2.9l.06.06a1.7 1.7 0 0 0 1.87.34A1.7 1.7 0 0 0 10.12 2.8V3a2.05 2.05 0 0 1 4.1 0v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2.05 2.05 0 0 1 2.9 2.9l-.06.06a1.7 1.7 0 0 0-.34 1.87 1.7 1.7 0 0 0 1.56 1.03H21a2.05 2.05 0 0 1 0 4.1h-.1A1.7 1.7 0 0 0 19.4 15Z\"></path>\n\t          </svg>\n\t        </button>\n\t      </aside>";

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

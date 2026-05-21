import { DOM_IDS } from '../ids.js';

export function renderTaxonomyTree() {
  return "<aside class=\"left-rail\" aria-label=\"项目类型\">\n" +
    "        <div class=\"left-head\">\n" +
    "          <h2 class=\"rail-title\">项目类型</h2>\n" +
    "        </div>\n" +
    "        <ul class=\"tree\">\n" +
    "          <li><span class=\"node-section-label\">竞赛项目</span></li>\n" +
    "          <li>\n" +
    "            <button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展\"><span class=\"chev\">▾</span><span class=\"node-text\">米兰设计周中国高校设计学科师生优秀作品展</span><span class=\"badge\">竞赛</span></button>\n" +
    "            <ul>\n" +
    "              <li>\n" +
    "                <button class=\"active\" type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道\"><span class=\"chev\">▾</span><span class=\"node-text\">第四届“设计赋能‘土特产’，助力乡村振兴”公益赛道</span><span class=\"badge\">赛道</span></button>\n" +
    "                <ul>\n" +
    "                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 土特产宣传海报设计\"><span class=\"chev\"></span><span class=\"node-text\">土特产宣传海报设计</span></button></li>\n" +
    "                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 土特产包装设计\"><span class=\"chev\"></span><span class=\"node-text\">土特产包装设计</span></button></li>\n" +
    "                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 土特产区域公共品牌设计\"><span class=\"chev\"></span><span class=\"node-text\">土特产区域公共品牌设计</span></button></li>\n" +
    "                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 土特产产品创意设计\"><span class=\"chev\"></span><span class=\"node-text\">土特产产品创意设计</span></button></li>\n" +
    "                  <li><button type=\"button\" data-project-type=\"competition\" data-breadcrumb=\"竞赛项目 / 米兰设计周中国高校设计学科师生优秀作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道 / 土特产短视频创作\"><span class=\"chev\"></span><span class=\"node-text\">土特产短视频创作</span></button></li>\n" +
    "                </ul>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "          <li><button class=\"disabled-node\" type=\"button\" disabled aria-disabled=\"true\"><span class=\"chev\"></span><span class=\"node-text\">全国大学生设计创新实践大赛</span><span class=\"badge\">竞赛</span></button></li>\n" +
    "          <li><button class=\"disabled-node\" type=\"button\" disabled aria-disabled=\"true\"><span class=\"chev\"></span><span class=\"node-text\">更多赛事，敬请期待</span></button></li>\n" +
    "          <li><span class=\"node-section-label\">自定义项目</span></li>\n" +
    "          <li><button type=\"button\" data-project-type=\"custom\" data-breadcrumb=\"自定义项目 / 课程作业\"><span class=\"chev\"></span><span class=\"node-text\">课程作业</span></button></li>\n" +
    "          <li><button type=\"button\" data-project-type=\"custom\" data-breadcrumb=\"自定义项目 / 项目实践\"><span class=\"chev\"></span><span class=\"node-text\">项目实践</span></button></li>\n" +
    "          <li><button type=\"button\" data-project-type=\"custom\" data-breadcrumb=\"自定义项目 / 毕业设计\"><span class=\"chev\"></span><span class=\"node-text\">毕业设计</span></button></li>\n" +
    "        </ul>\n" +
    "      </aside>";
}

export function bindTaxonomyTree(store) {
  const breadcrumb = document.getElementById(DOM_IDS.breadcrumb);
  document.querySelectorAll('.tree button').forEach((button) => {
    const nodeText = button.querySelector('.node-text');
    const label = nodeText && nodeText.textContent.trim();
    if (label) button.setAttribute('title', label);
    if (button.disabled || button.getAttribute('aria-disabled') === 'true') return;
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

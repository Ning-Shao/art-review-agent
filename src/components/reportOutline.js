export function renderReportOutline() {
  return "<section class=\"right-block\">\n          <h2 class=\"rail-title\">当前报告</h2>\n          <nav aria-label=\"当前报告目录\">\n            <ul class=\"outline-list\">\n              <li><a class=\"active\" href=\"#work-overview\">作品概览</a></li>\n              <li><a href=\"#total-score\">总评分</a></li>\n              <li><a href=\"#dimension-analysis\">维度评分</a></li>\n              <li><a href=\"#strengths\">主要优点</a></li>\n              <li><a href=\"#problems\">主要问题</a></li>\n              <li><a href=\"#revision-suggestions\">修改建议</a></li>\n              <li><a href=\"#submission-checklist\">提交前检查</a></li>\n              <li><a href=\"#competition-fit\">竞赛适配</a></li>\n              <li><a href=\"#chat\">AI 对话</a></li>\n            </ul>\n          </nav>\n        </section>";

}

export function bindReportOutline() {
  const workspace = document.querySelector('.workspace');
  const outlineLinks = Array.from(document.querySelectorAll('.outline-list a'));
  function setActiveOutline(hash) {
    outlineLinks.forEach((link) => { link.classList.toggle('active', link.getAttribute('href') === hash); });
  }
  outlineLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const hash = link.getAttribute('href');
      const target = document.querySelector(hash);
      if (target && workspace) workspace.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
      setActiveOutline(hash);
    });
  });
  const observedSections = outlineLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  function syncOutlineWithScroll() {
    if (!workspace) return;
    const workspaceTop = workspace.getBoundingClientRect().top;
    const anchorLine = workspaceTop + workspace.clientHeight * 0.28;
    let current = observedSections[0];
    observedSections.forEach((section) => { if (section.getBoundingClientRect().top <= anchorLine) current = section; });
    if (current) setActiveOutline('#' + current.id);
  }
  if (workspace) workspace.addEventListener('scroll', syncOutlineWithScroll, { passive: true });
  window.addEventListener('resize', syncOutlineWithScroll);
  syncOutlineWithScroll();
  return { setActiveOutline };
}

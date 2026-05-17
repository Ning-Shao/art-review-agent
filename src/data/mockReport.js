export const mockReportTemplate = {
  score: 78,
  dimensions: [
    '主题理解：能够抓住城市更新的公共性和社会议题，但问题定义还可以更具体。',
    '视觉表达：构图清晰，图形语言具备识别度，但材料之间的叙事连续性仍需加强。',
    '过程呈现：当前过程材料偏少，建议补充调研、草图、信息架构和方案迭代证据。',
    '竞赛适配：与米兰设计周视觉传达类方向基本匹配，需要强化国际化表达和社会价值阐释。',
  ],
  strengths:
    '作品主题具有现实议题基础，视觉风格统一，主画面具备快速识别能力。相较于普通形式练习，该方案已经具备“问题意识”和“竞赛叙事”的雏形，适合继续向正式参赛材料推进。',
  problems:
    '当前最大风险是作品说明偏概念化，评委难以从现有材料中看到调研依据、目标人群、传播场景和视觉选择之间的因果关系。如果只保留抽象表达，作品容易被判断为形式完整但论证不足。',
  suggestions: [
    '将作品说明调整为“问题背景、设计策略、视觉执行、预期影响”的顺序。',
    '补充 3 到 5 张过程图，说明从城市观察到视觉方案的形成路径。',
    '为每张上传材料标注对应评审维度，减少评委理解成本。',
    '增加应用场景图，例如街区公告、公共展板、社交媒体传播或活动导视。',
  ],
  competitionFit:
    '建议优先匹配“米兰设计周 / 视觉传达类”，备选方向为“全国大学生设计创新实践大赛 / A 类赛道”。如果后续补充空间改造或公共装置方案，也可以扩展到环境空间类节点。',
  summary:
    '该作品已经具备参赛前评审的基本潜力。下一步应从“好看的海报”推进到“有证据、有场景、有公共价值的设计方案”，让视觉表达、研究过程和竞赛标准形成更稳定的对应关系。',
};

export function buildMockReport(work) {
  const title = work.title || '未命名作品';
  const mode = work.mode || '赛前预评审';
  const category = work.category || '视觉传达 / 米兰';
  const track = work.track || '城市更新主题';

  return {
    ...mockReportTemplate,
    id: 'report-' + Date.now(),
    generatedAt: new Date().toISOString(),
    title: title + '｜AI 预评审文本报告',
    work: {
      title,
      mode,
      category,
      track,
      description: work.description || '',
      breadcrumb: work.breadcrumb || '米兰设计周 / 视觉传达类',
      mediaNode: work.mediaNode || '海报 / 品牌设计 / 视觉传达',
    },
    overall:
      title +
      '围绕' +
      track +
      '展开，当前材料已经呈现出较清晰的设计方向。Mock 评审会从主题理解、视觉表达、过程证据和竞赛适配四个角度给出预评审意见，帮助作品从概念草案推进到更完整的参赛材料。',
  };
}

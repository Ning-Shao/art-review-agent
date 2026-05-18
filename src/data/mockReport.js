const DEFAULT_WORK = {
  title: '城市更新海报方案',
  mode: '赛前预评审',
  category: '视觉传达 / 米兰',
  track: '城市更新主题',
  description: '以社区公共空间再生为主题，通过黑白灰图形层级表达城市更新中的公共记忆、空间秩序与视觉传播策略。',
  breadcrumb: '视觉传达 / 海报设计 / 米兰设计周 / 城市更新主题赛道',
  mediaNode: '海报 / 品牌设计 / 视觉传达',
};

const SCORE_LEVELS = [
  { min: 88, label: '优秀', advice: '可以作为正式参赛材料继续打磨，重点检查呈现细节和提交规范。' },
  { min: 76, label: '可进入初审', advice: '具备进入初审的基础条件，建议补齐论证链条后提交。' },
  { min: 62, label: '需要明显修改', advice: '方向基本成立，但还需要集中修正概念、材料或表达上的短板。' },
  { min: 0, label: '不建议直接提交', advice: '当前材料支撑不足，建议先完成方案重构和过程补证。' },
];

function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreLevel(score) {
  return SCORE_LEVELS.find((level) => score >= level.min) || SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

function normalizeWork(work = {}) {
  return {
    title: work.title || DEFAULT_WORK.title,
    mode: work.mode || DEFAULT_WORK.mode,
    category: work.category || DEFAULT_WORK.category,
    track: work.track || DEFAULT_WORK.track,
    description: work.description || DEFAULT_WORK.description,
    breadcrumb: work.breadcrumb || DEFAULT_WORK.breadcrumb,
    mediaNode: work.mediaNode || DEFAULT_WORK.mediaNode,
  };
}

function inferWorkType(work) {
  const source = [work.mediaNode, work.category, work.breadcrumb].join(' / ');
  if (source.includes('包装')) return '包装与品牌系统设计';
  if (source.includes('空间') || source.includes('装置')) return '空间、展陈或公共艺术方案';
  if (source.includes('插画')) return '插画与视觉叙事作品';
  if (source.includes('品牌')) return '品牌视觉与传播系统';
  if (source.includes('海报')) return '视觉传达类海报作品';
  return '艺术设计类综合作品';
}

function inferThemeDirection(work) {
  const source = (work.track + ' ' + work.description).trim();
  if (source.includes('城市更新')) return '城市更新、公共空间再生与社区记忆';
  if (source.includes('非遗') || source.includes('传统')) return '传统文化转译与当代表达';
  if (source.includes('环保') || source.includes('可持续')) return '可持续设计与社会倡议';
  if (source.includes('品牌')) return '品牌识别、传播策略与用户认知';
  return work.track || '开放命题下的视觉表达与设计研究';
}

function inferCompetitionCategory(work, workType) {
  if (work.breadcrumb.includes('米兰')) return '米兰设计周相关视觉传达、主题海报或设计实践赛道';
  if (work.category.includes('视觉传达')) return '视觉传达类、品牌传播类或社会创新设计类竞赛';
  if (workType.includes('空间')) return '环境空间、公共艺术或综合设计实践类竞赛';
  return '艺术设计创新实践类竞赛';
}

function getCompletionJudgement(work) {
  const descriptionLength = work.description.length;
  if (descriptionLength >= 80) return '中高完成度：核心主题和视觉方向已经成型，提交前应补强过程证据与应用场景。';
  if (descriptionLength >= 35) return '中等完成度：概念方向可辨识，但论证、材料层级和评审证据仍需补充。';
  return '早期草案：目前更适合内部讨论，不建议直接作为正式参赛材料提交。';
}

function scoreByWork(work) {
  const descriptionLength = work.description.length;
  const depthBonus = descriptionLength >= 80 ? 4 : descriptionLength >= 35 ? 1 : -4;
  const hasCompetitionNode = work.breadcrumb.includes('米兰') || work.category.includes('竞赛') || work.category.includes('米兰');
  const hasMediaNode = work.mediaNode && work.mediaNode !== DEFAULT_WORK.mediaNode ? 2 : 0;

  const dimensions = [
    {
      label: '主题契合度',
      score: clampScore(82 + depthBonus),
      comment: '选题能够回应竞赛中对社会议题、公共价值和设计介入路径的期待，但需要把问题对象、受众和场景边界写得更明确。',
    },
    {
      label: '视觉表现',
      score: clampScore(79 + hasMediaNode),
      comment: '画面秩序和图形识别度具备基础优势，建议继续统一字体层级、版面留白和主视觉在不同载体上的延展规则。',
    },
    {
      label: '创新性',
      score: clampScore(75 + Math.max(0, depthBonus)),
      comment: '创意方向不是单纯形式装饰，已经尝试将议题转化为视觉策略；下一步需要提出更鲜明的原创方法或互动机制。',
    },
    {
      label: '叙事完整度',
      score: clampScore(72 + depthBonus),
      comment: '目前能看出“问题到视觉”的雏形，但从调研发现、设计判断到成品呈现之间还缺少连续证据，容易让评委觉得论证跳跃。',
    },
    {
      label: '竞赛适配度',
      score: clampScore(80 + (hasCompetitionNode ? 3 : 0)),
      comment: '与当前赛道的专业方向基本匹配，若补充国际化语境、社会影响和落地展示方式，会更接近正式初审材料标准。',
    },
  ];

  const total = clampScore(
    dimensions.reduce((sum, item) => sum + item.score, 0) / dimensions.length
  );

  return { total, dimensions, level: getScoreLevel(total) };
}

function buildFeedback(work, overview, score) {
  return {
    strengths: [
      '主题具有现实议题基础，能够从城市、社区或公共传播的角度提出设计回应，不停留在单纯形式练习。',
      '主视觉语言相对克制，黑白灰层级、图形秩序和版面重心有利于建立作品识别度。',
      '作品已经具备竞赛叙事的基本框架，适合继续向“调研依据、设计策略、应用场景”完整链条推进。',
    ],
    problems: [
      '作品说明仍偏概念化，评委很难从现有文本中直接判断问题来源、目标人群和视觉选择之间的因果关系。',
      '过程材料不足会削弱可信度，尤其缺少调研照片、草图推演、信息结构和方案迭代记录。',
      '应用场景还不够具体，当前更像单张视觉成果，尚未充分证明其在真实传播或公共环境中的使用价值。',
    ],
    suggestions: [
      '将作品说明改为“问题背景、调研发现、设计策略、视觉系统、场景应用、社会价值”的顺序，避免只讲抽象概念。',
      '补充 3 到 5 张过程图：现场观察、关键词提炼、草图方案、版式迭代和最终视觉规则各至少一张。',
      '为主视觉建立可复用规范，包括标题字级、辅助图形、色彩比例、图文网格和不同尺寸载体的适配方式。',
      '增加至少两个应用场景，例如街区公告栏、公共展板、活动导视、社交媒体封面或院校展览海报。',
      '在提交文本中明确作品适配的竞赛类别，突出“为什么这个方案适合该赛道”，不要只描述作品好看或完整。',
    ],
    checklist: [
      '作品名称、作者信息、院校信息和竞赛类别是否与报名系统完全一致。',
      '是否包含主视觉、细节页、过程页、应用页和 200 到 300 字以内的作品说明。',
      '所有图片是否达到赛事要求的尺寸、格式、分辨率和文件命名规范。',
      '是否删除了临时占位图、未授权素材、水印、错别字和版面边缘的低级错误。',
      '作品说明是否能在 30 秒内让评委看懂问题、方法、结果和价值。',
    ],
    closing:
      overview.workType +
      '目前的核心价值在于议题方向和视觉秩序已经成立。若按上述建议补齐过程证据和场景表达，整体更符合“' +
      score.level.label +
      '”层级的参赛演示要求。',
  };
}

export function buildMockReport(workInput) {
  const work = normalizeWork(workInput);
  const workType = inferWorkType(work);
  const themeDirection = inferThemeDirection(work);
  const competitionCategory = inferCompetitionCategory(work, workType);
  const completion = getCompletionJudgement(work);
  const score = scoreByWork(work);
  const overview = {
    workType,
    themeDirection,
    competitionCategory,
    completion,
  };
  const feedback = buildFeedback(work, overview, score);

  return {
    id: 'report-' + Date.now(),
    generatedAt: new Date().toISOString(),
    title: work.title + '｜AI 预评审文本报告',
    score: score.total,
    grade: score.level.label,
    gradeAdvice: score.level.advice,
    overview,
    dimensions: score.dimensions,
    feedback,
    work,
    overall:
      work.title +
      '围绕“' +
      themeDirection +
      '”展开，当前材料具备进入赛前评审讨论的基础。评审重点应放在主题与赛道的对应关系、视觉系统的完成度、过程证据的可信度以及提交材料能否在短时间内被评委准确理解。',
    strengths: feedback.strengths.join(' '),
    problems: feedback.problems.join(' '),
    suggestions: feedback.suggestions,
    competitionFit:
      '建议优先匹配' +
      competitionCategory +
      '。提交材料中应主动说明作品与该类别的评价标准之间的关系，尤其是社会议题、视觉策略、传播场景和最终呈现的对应性。',
    summary: feedback.closing,
  };
}

export const mockReportTemplate = buildMockReport(DEFAULT_WORK);

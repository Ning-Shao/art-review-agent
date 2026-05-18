import { defaultMockCase, findBestMockCase } from './mockCases.js';
import { clampScore, getScoreLevel, getTotalScore, reviewRubrics } from './reviewRubrics.js';

function getCaseAwareValue(value, mockCase, caseValue, defaultValues) {
  if (!value || (mockCase.id !== defaultMockCase.id && defaultValues.includes(value))) return caseValue;
  return value;
}

function normalizeWork(workInput = {}, mockCase = defaultMockCase) {
  return {
    caseId: workInput.caseId || mockCase.id,
    title: getCaseAwareValue(workInput.title, mockCase, mockCase.title, [defaultMockCase.title, '城市更新海报方案']),
    mode: workInput.mode || mockCase.mode,
    category: getCaseAwareValue(workInput.category, mockCase, mockCase.category, [defaultMockCase.category, '视觉传达 / 米兰']),
    track: getCaseAwareValue(workInput.track, mockCase, mockCase.track, [defaultMockCase.track, '城市更新主题']),
    theme: workInput.theme || mockCase.theme,
    description: getCaseAwareValue(workInput.description, mockCase, mockCase.description, [defaultMockCase.description]),
    breadcrumb: workInput.breadcrumb || mockCase.breadcrumb,
    mediaNode: workInput.mediaNode || mockCase.mediaNode,
  };
}

function tuneScoreProfile(mockCase, work) {
  const descriptionLength = work.description.length;
  const hasSelectedCompetition = work.breadcrumb && work.breadcrumb.includes('竞赛节点');
  const hasSelectedMedia = work.mediaNode && work.mediaNode !== mockCase.mediaNode;
  const descriptionDelta = descriptionLength >= 90 ? 2 : descriptionLength < 30 ? -5 : 0;
  const competitionDelta = hasSelectedCompetition ? 1 : -2;
  const mediaDelta = hasSelectedMedia ? 1 : 0;

  return Object.fromEntries(reviewRubrics.map((rubric) => {
    const base = mockCase.scoreProfile[rubric.key] || 72;
    const narrativePenalty = rubric.key === 'narrative' && descriptionLength < 45 ? -3 : 0;
    const competitionBonus = rubric.key === 'competitionFit' ? competitionDelta : 0;
    const visualBonus = rubric.key === 'visualExpression' ? mediaDelta : 0;
    return [rubric.key, clampScore(base + descriptionDelta + narrativePenalty + competitionBonus + visualBonus)];
  }));
}

function getDimensionComment(rubric, score, mockCase) {
  const high = score >= 84;
  const medium = score >= 76;
  const caseTheme = mockCase.theme;

  const comments = {
    themeFit: high
      ? '作品能够清楚回应“' + caseTheme + '”这一主题，议题边界和竞赛命题之间的关系比较明确。'
      : medium
        ? '主题方向成立，但仍需把问题对象、目标受众和设计介入点写得更具体。'
        : '主题和作品材料之间的对应关系偏弱，建议先重新梳理问题定义和参赛命题。',
    visualExpression: high
      ? '视觉系统具备较强识别度，版面层级、色彩或材料语言能够支撑作品气质。'
      : medium
        ? '视觉表达有基本秩序，但需要继续统一图形规则、信息层级和不同载体的延展方式。'
        : '视觉语言尚不稳定，主次关系、字体层级和材料呈现都需要重新校准。',
    innovation: high
      ? '作品不仅完成形式表达，也提出了较有辨识度的媒介方法或设计转换路径。'
      : medium
        ? '创意方向具备潜力，但原创方法还不够鲜明，容易被评为常规命题表达。'
        : '创新点表达不足，需要明确相较同类作品的新视角、新媒介或新使用方式。',
    narrative: high
      ? '从调研、概念、策略到最终呈现之间形成了较完整的评审阅读路径。'
      : medium
        ? '叙事链条基本可见，但过程证据和关键设计判断之间仍有跳跃。'
        : '当前材料缺少连续论证，评委难以理解作品从问题到结果的形成过程。',
    competitionFit: high
      ? '作品与目标赛道的评价重点匹配度较高，具备进入正式初审材料的基础。'
      : medium
        ? '参赛方向基本匹配，但需要进一步对齐竞赛类别、提交规范和评委阅读习惯。'
        : '竞赛适配风险较高，建议重新选择赛道或补充能支撑该赛道标准的材料。',
  };

  return comments[rubric.key] || rubric.focus;
}

function buildDimensionScores(scoreProfile, mockCase) {
  return reviewRubrics.map((rubric) => {
    const score = clampScore(scoreProfile[rubric.key]);
    return {
      label: rubric.label,
      score,
      comment: getDimensionComment(rubric, score, mockCase),
    };
  });
}

function buildFeedback(mockCase, level) {
  return {
    strengths: mockCase.strengths,
    problems: mockCase.weaknesses,
    suggestions: mockCase.suggestions,
    checklist: [
      '作品名称、作者信息、院校信息和竞赛类别是否与报名系统完全一致。',
      '是否包含主视觉、细节页、过程页、应用页和 200 到 300 字以内的作品说明。',
      '所有图片是否达到赛事要求的尺寸、格式、分辨率和文件命名规范。',
      '是否删除临时占位图、未授权素材、水印、错别字和版面边缘的低级错误。',
      '作品说明是否能在 30 秒内让评委看懂问题、方法、结果和价值。',
    ],
    closing:
      mockCase.title +
      '当前最需要处理的是“案例证据、设计策略和最终呈现”的对应关系。若能按建议补齐材料，整体会更接近“' +
      level.label +
      '”层级的参赛演示状态。',
  };
}

export function buildMockReport(workInput) {
  const mockCase = findBestMockCase(workInput);
  const work = normalizeWork(workInput, mockCase);
  const scoreProfile = tuneScoreProfile(mockCase, work);
  const totalScore = getTotalScore(scoreProfile);
  const level = getScoreLevel(totalScore);
  const feedback = buildFeedback(mockCase, level);

  return {
    id: 'report-' + Date.now(),
    generatedAt: new Date().toISOString(),
    sourceCaseId: mockCase.id,
    title: work.title + '｜AI 预评审文本报告',
    score: totalScore,
    grade: level.label,
    gradeAdvice: level.advice,
    scoreProfile,
    overview: {
      workType: mockCase.workType,
      themeDirection: work.theme,
      competitionCategory: mockCase.competitionFit,
      completion: mockCase.completion,
    },
    dimensions: buildDimensionScores(scoreProfile, mockCase),
    feedback,
    work,
    overall:
      work.title +
      '围绕“' +
      work.theme +
      '”展开，系统匹配到的模拟案例为“' +
      mockCase.title +
      '”。本次预评审会重点查看作品主题是否与竞赛语境一致、视觉或空间系统是否完整、过程材料是否能支撑最终方案，以及提交文本能否帮助评委快速判断作品价值。',
    strengths: feedback.strengths.join(' '),
    problems: feedback.problems.join(' '),
    suggestions: feedback.suggestions,
    competitionFit:
      '建议优先匹配' +
      mockCase.competitionFit +
      ' 当前选择节点为“' +
      work.breadcrumb +
      '”，提交材料中应主动说明作品与该类别评价标准之间的关系。',
    summary: feedback.closing,
  };
}

export const mockReportTemplate = buildMockReport({ caseId: defaultMockCase.id });

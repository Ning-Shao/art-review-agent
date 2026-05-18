export const scoreLevels = [
  { min: 88, label: '优秀', advice: '可以作为正式参赛材料继续打磨，重点检查呈现细节和提交规范。' },
  { min: 76, label: '可进入初审', advice: '具备进入初审的基础条件，建议补齐论证链条后提交。' },
  { min: 62, label: '需要明显修改', advice: '方向基本成立，但还需要集中修正概念、材料或表达上的短板。' },
  { min: 0, label: '不建议直接提交', advice: '当前材料支撑不足，建议先完成方案重构和过程补证。' },
];

export const reviewRubrics = [
  {
    key: 'themeFit',
    label: '主题契合度',
    focus: '作品是否准确回应竞赛命题、社会议题和目标受众。',
  },
  {
    key: 'visualExpression',
    label: '视觉表现',
    focus: '视觉系统、构图秩序、材料质感和信息层级是否清晰稳定。',
  },
  {
    key: 'innovation',
    label: '创新性',
    focus: '是否提出有辨识度的设计方法、媒介组合或问题解决路径。',
  },
  {
    key: 'narrative',
    label: '叙事完整度',
    focus: '从调研、概念、策略到成品呈现之间是否形成连续论证。',
  },
  {
    key: 'competitionFit',
    label: '竞赛适配度',
    focus: '作品材料是否符合赛道评价标准、提交语境和评委阅读习惯。',
  },
];

export function clampScore(score) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getScoreLevel(score) {
  return scoreLevels.find((level) => score >= level.min) || scoreLevels[scoreLevels.length - 1];
}

export function getTotalScore(scoreProfile) {
  const scores = reviewRubrics.map((rubric) => clampScore(scoreProfile[rubric.key] || 0));
  return clampScore(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

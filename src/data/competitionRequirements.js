export const sharedRuralRevitalizationSpecs = {
  title: '作品规格要求',
  sections: [
    {
      title: '作品文件',
      items: [
        '图片作品：单幅作品须 A3 幅面、纵向构图排版、JPG、RGB 或 CMYK，每个方案不超过 3 张。若为系列作品，请合并为 3 个文件上传；分辨率不低于 300dpi。',
        '若另附动态呈现作品，须为 GIF 格式、不小于 72dpi，节奏流畅不卡顿；单张图片不超过 10M。',
        '视频作品：高清及以上分辨率，不低于 1920*1080，编码格式 H.264、mp4；时间长度控制 15 秒以内，土特产短视频创作类别不超过 3 分钟，不超过 500M。',
        '视频不得自行设置水印或 LOGO，画面比例自定，可以配字幕，但不得以任何形式出现个人信息。',
      ],
    },
    {
      title: '展示海报',
      items: [
        '提交 1 张展示海报，将作品名称、效果图、细节图、结构示意图、外观尺寸、材质材料分析图及三视图等编排至统一模板中。',
        '视频类作品截取不少于 5 个作品画面进行排版至统一模板中。',
        '单幅 A3 幅面、竖式、300dpi、JPG、RGB/CMYK，文件不超过 10MB。',
      ],
    },
    {
      title: '备注',
      items: [
        '图片类作品，创作团队人数不超过 3 人，指导老师不超过 2 人。',
        '视频类作品，创作团队人数不超过 5 人，指导老师不超过 2 人。',
      ],
    },
  ],
};

export const ruralRevitalizationDirections = [
  {
    id: 'poster',
    label: '土特产宣传海报设计',
    requirementTitle: '设计要求',
    requirements: [
      '土特产地名和品名需醒目地呈现于画面中。',
      '土特产元素可充分发挥创意设计，还可以结合对应地区的非遗、人文等元素配合设计，突出地域风格和产品特色。',
    ],
  },
  {
    id: 'packaging',
    label: '土特产包装设计',
    requirementTitle: '设计要求',
    requirements: [
      '包装设计需要突出产品的特点，让消费者能够通过包装了解产品的特点。',
      '包装设计要体现出地方特色，让消费者通过包装就能感受到产品地域特色。',
      '包装材料的选用要符合产品特性的材料，同时也要考虑包装的实用性。',
      '具备品牌意识，通过包装提高产品和品牌知名度和美誉度。',
    ],
  },
  {
    id: 'regional-brand',
    label: '土特产区域公共品牌设计',
    requirementTitle: '设计要求',
    requirements: [
      '公共品牌设计要凸显出区域特色，通过视觉元素传达出产品的地理标志、文化背景和独特性。',
      '公共品牌设计要具有较高的识别度，有助于提高品牌知名度和影响力。',
      '能够传递品牌理念，如绿色、生态、传统、现代等，与产品特点和区域文化相契合。',
      '具有一定的持续性，适应市场需求变化和时代发展，保持品牌的活力和竞争力。',
      '具有一定的适应性，可在不同的场景、渠道和平台上展示出良好的视觉效果。',
      '具有一定的规范性，确保在不同尺寸、颜色和材质的包装上和不同媒介的宣传品上能够呈现出一致的品牌形象。',
    ],
  },
  {
    id: 'product-creative',
    label: '土特产产品创意设计',
    requirementTitle: '设计要求',
    requirements: [
      '深入挖掘产品设计创新对产业升级的推动作用，针对土特产产品本身的消费方式、生产工艺、用户体验、外观造型、衍生文化等开展创意设计。',
      '产品创意设计注重技术可行性，生产工艺和技术应能够支持产品创意设计的实现。',
    ],
  },
  {
    id: 'short-video',
    label: '土特产短视频创作',
    requirementTitle: '创作方向',
    directions: [
      '乡土情怀与文化传承：借鉴人文纪录片风格，聚焦于土特产背后的历史传承与地域文化，通过讲述老匠人的故事、传统手工艺展示，展现土特产的文化底蕴。',
      '制作过程揭秘：详细记录土特产从原材料采集到成品的全过程，强调手工制作的匠心独运，吸引观众对制作过程的好奇与尊重。',
      '乡村生活体验：“乡村 Vlog”形式，展现乡村生活的宁静美好与土特产生长的自然环境，通过体验式拍摄，让观众感受到土特产的“地道”与“新鲜”。',
      '创意故事演绎：利用微电影、微短剧形式，围绕土特产创作富有创意的故事情节，如通过土特产串联起的亲情、友情故事，或结合时下热点话题，提升视频的趣味性和传播力。',
      '知识科普与互动问答：“科普达人”的模式，以动画或微纪录片形式，介绍土特产的营养价值、食用方法等知识，同时设置互动环节，如问答、抽奖等，增强观众参与感。',
      '其他创作方向。',
    ],
    designRequirements: [
      '视频时长不超过 3 分钟，简洁明了地展示土特产的特色和魅力。',
    ],
  },
];

export const ruralRevitalizationTrack = {
  label: '第四届“设计赋能‘土特产’，助力乡村振兴”公益赛道',
  directions: ruralRevitalizationDirections,
  sharedSpecs: sharedRuralRevitalizationSpecs,
};

export function getRuralRevitalizationDirection(id) {
  return ruralRevitalizationDirections.find((direction) => direction.id === id) || ruralRevitalizationDirections[0];
}

export function formatRuralRevitalizationContext(directionId) {
  const direction = getRuralRevitalizationDirection(directionId);
  const ownRequirements = [
    ...(direction.requirements || []),
    ...(direction.directions || []),
    ...(direction.designRequirements || []),
  ];
  const sharedRequirements = sharedRuralRevitalizationSpecs.sections.flatMap((section) => (
    section.items.map((item) => section.title + '：' + item)
  ));
  return [
    '固定赛事：米兰设计周-高校设计作品展',
    '赛道：' + ruralRevitalizationTrack.label,
    '设计方向：' + direction.label,
    direction.requirementTitle + '：' + ownRequirements.join('；'),
    sharedRuralRevitalizationSpecs.title + '：' + sharedRequirements.join('；'),
  ].join('\n');
}

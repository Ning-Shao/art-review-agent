# AI Art Review Desk 产品功能盘点

> 范围说明：本文基于当前仓库的 `README.md`、`index.html`、`src/main.js`、`src/app.js`、`src/components`、`src/state`、`src/data`、`src/styles`、`public/assets` 盘点。没有把外部 PDF 中未在代码或 README 出现的需求写入“已实现功能”。

## 1. 当前项目的页面结构

当前项目是一个 Vite + 原生 HTML/CSS/JavaScript 的静态 Demo，没有 React、Vue 或后端服务。

页面挂载链路：

- `index.html`：提供 `<div id="app"></div>` 根节点，并通过 `<script type="module" src="./src/main.js"></script>` 加载入口。
- `src/main.js`：引入 `src/styles/index.css`，调用 `createApp(document.querySelector('#app'))`。
- `src/app.js`：创建全局 store，渲染页面骨架，绑定所有已接入组件事件。

页面主结构：

- 顶部栏：`src/components/topBar.js`
  - 品牌标题“智能预评审”
  - 搜索输入框
  - 日间 / 夜间模式切换
- 左侧分类导航：`src/components/taxonomyTree.js`
  - 竞赛项目
  - 第四届“设计赋能‘土特产’，助力乡村振兴”公益赛道及 5 个设计方向
  - 米兰设计周中国高校设计学科师生优秀作品展
  - 全国大学生设计创新实践大赛
  - 个人项目：毕业设计、课程作业、实践项目
- 中间工作区：`src/components/workspace.js`
  - 作品信息表单：`src/components/workForm.js`
  - 作品上传面板：`src/components/fileUpload.js`
  - 正式预评审报告：`src/components/reportPanel.js`
  - AI 对话面板：`src/components/chatPanel.js`
- 右侧历史栏：`src/components/rightRail.js` + `src/components/historyPanel.js`
  - 历史记录列表
  - 右侧栏折叠 / 展开
  - 历史记录更多菜单
- 弹层：
  - 文件预览弹层：`src/components/previewModal.js`
  - 历史记录菜单：`src/components/rightRail.js`

当前代码中存在但未接入主页面骨架的组件：

- `src/components/reportOutline.js`：报告目录组件，当前没有在 `src/app.js` 或 `src/components/rightRail.js` 中渲染或绑定。
- `src/components/settingsModal.js`：设置中心弹层，当前没有在 `src/app.js` 中渲染或绑定；`DOM_IDS` 和 CSS 中保留了设置相关 id / 样式。

## 2. 当前已有的核心功能

| 功能 | 当前实现状态 | 说明 |
| --- | --- | --- |
| 页面初始化 | 已实现 | Vite 入口加载 CSS 和 JS，`createApp` 渲染页面骨架并绑定事件。 |
| 分类导航 / 项目类型选择 | 已实现 | 左侧树形按钮切换竞赛项目或个人项目，更新 `store.selectedProjectType` 和 `store.selectedBreadcrumb`，并派发 `projectContextChange` 事件。 |
| 作品信息表单 | 已实现 | 竞赛项目显示作品名称、作品说明；个人项目额外显示作品要求。 |
| 示例上传文件列表 | 已实现 | 初始上传状态来自 `src/data/seedFiles.js`。 |
| 本地文件上传 | 已实现 | 支持文件选择、拖拽上传、多文件追加；图片生成 `blob:` 预览地址，非图片显示扩展名占位。 |
| 上传文件删除 | 已实现 | 删除指定文件；如果是本地 `blob:` 预览，会调用 `URL.revokeObjectURL`。 |
| 上传文件拖拽排序 | 已实现 | 文件列表项支持 drag / drop 排序。 |
| 文件预览弹层 | 已实现 | 双击缩略图打开预览；图片显示大图，非图片显示扩展名占位；支持关闭按钮、点击遮罩、Esc 关闭。 |
| Mock AI 预评审报告生成 | 已实现 | 点击“生成预评审报告”后，基于当前表单和分类上下文生成 Mock 报告。 |
| 报告面板更新 | 已实现 | 更新综合分、报告正文、维度评分、优点、问题、建议、检查清单、适配度和总结。 |
| 报告分享链接 | 已实现 | 生成当前页面 `#formalReport` 链接并支持复制。 |
| 报告下载入口 | 已实现 | “下载 PDF”实际调用 `window.print()`；“下载 Markdown”会把当前报告文本导出为 `.md` 文件。 |
| 历史记录静态展示 | 已实现 | 右侧初始显示 3 条静态历史记录。 |
| 新生成历史记录 | 已实现 | 每次生成报告后创建历史记录，插入右侧列表，并写入 `localStorage`。 |
| 历史记录重命名 / 查看 / 删除 | 已实现 | 更多菜单支持重命名、设为 active、删除；对持久化的新历史记录同步写回本地存储。静态种子记录不在 store 中，持久化行为待确认。 |
| 右侧历史栏折叠 | 已实现 | 右侧栏可折叠为窄栏，再展开。 |
| 日间 / 夜间主题 | 已实现 | 切换 `body[data-theme]`，主题偏好写入 `localStorage`。 |
| AI 对话面板 | 部分实现 | 可以输入并追加用户消息和固定模拟回复；没有真实 AI 请求，也没有结合当前报告上下文。 |
| 搜索框 | 仅 UI | 顶部搜索输入框当前未绑定搜索逻辑。 |
| 设置中心 | 未接入 | 组件和样式存在，但入口未渲染、绑定未执行。 |
| 报告目录 | 未接入 | 组件和滚动同步逻辑存在，但当前页面未渲染。 |

## 3. 每个功能对应的代码文件

| 功能 | 主要文件 | 相关文件 |
| --- | --- | --- |
| App 启动与页面组合 | `index.html`, `src/main.js`, `src/app.js` | `src/ids.js`, `src/styles/index.css` |
| 顶部栏与主题切换 | `src/components/topBar.js` | `src/state/theme.js`, `src/services/storageService.js`, `src/styles/layout.css`, `src/styles/tokens.css` |
| 分类导航 | `src/components/taxonomyTree.js` | `src/state/reviewStore.js`, `src/data/taxonomy.js`, `src/styles/layout.css` |
| 工作区布局 | `src/components/workspace.js` | `src/styles/layout.css`, `src/styles/components.css`, `src/styles/responsive.css` |
| 作品信息表单 | `src/components/workForm.js` | `src/services/aiReviewService.mock.js`, `src/data/mockReport.js`, `src/data/mockCases.js`, `src/data/reviewRubrics.js` |
| 上传列表与上传交互 | `src/components/fileUpload.js` | `src/state/uploads.js`, `src/data/seedFiles.js`, `src/components/previewModal.js`, `src/styles/components.css` |
| 文件预览 | `src/components/previewModal.js` | `src/state/uploads.js`, `src/ids.js`, `src/styles/components.css` |
| Mock 报告生成 | `src/services/aiReviewService.mock.js` | `src/data/mockReport.js`, `src/data/mockCases.js`, `src/data/reviewRubrics.js` |
| 报告展示、分享、下载 | `src/components/reportPanel.js` | `src/data/mockReport.js`, `src/utils/file.js`, `src/ids.js`, `src/styles/components.css` |
| AI 对话 | `src/components/chatPanel.js` | `src/styles/components.css` |
| 历史记录面板 | `src/components/historyPanel.js`, `src/components/rightRail.js` | `src/state/history.js`, `src/services/storageService.js`, `src/ids.js`, `src/styles/components.css` |
| 本地持久化 | `src/services/storageService.js` | `src/state/theme.js`, `src/state/history.js` |
| 评分维度 | `src/data/reviewRubrics.js` | `src/data/reviewCriteria.js`, `src/data/mockReport.js` |
| 静态资源 | `public/assets/*`, `public/favicon.svg` | `src/data/seedFiles.js`, `index.html` |
| 未接入设置弹层 | `src/components/settingsModal.js` | `src/ids.js`, `src/styles/components.css`, `src/styles/layout.css` |
| 未接入报告目录 | `src/components/reportOutline.js` | `src/styles/components.css` |

## 4. 当前使用的 mock 数据

### Mock 案例：`src/data/mockCases.js`

当前维护 5 个模拟作品案例：

- `urban-renewal-poster`：城市更新主题海报
- `heritage-packaging`：非遗文创包装设计
- `campus-public-space`：校园公共空间改造
- `ai-visual-narrative`：AI 辅助视觉叙事作品
- `brand-identity-system`：品牌视觉识别系统

每个案例包含的主要字段：

- `id`
- `title`
- `category`
- `theme`
- `workType`
- `mode`
- `track`
- `breadcrumb`
- `mediaNode`
- `description`
- `competitionFit`
- `completion`
- `strengths`
- `weaknesses`
- `suggestions`
- `scoreProfile`

匹配逻辑：

- `findBestMockCase(work)` 会优先使用显式 `caseId`。
- 如果没有 `caseId`，则把作品标题、分类、赛道、主题、描述、breadcrumb、mediaNode 拼成文本，与每个 mock case 的关键词做匹配。
- 匹配不到时回退到默认案例 `mockCases[0]`。

### Mock 报告模板与组装：`src/data/mockReport.js`

- `mockReportTemplate`：页面初始报告，来自默认案例。
- `buildMockReport(workInput)`：按当前输入匹配案例，生成报告对象。
- 报告包含：
  - `id`
  - `generatedAt`
  - `sourceCaseId`
  - `title`
  - `score`
  - `grade`
  - `gradeAdvice`
  - `scoreProfile`
  - `overview`
  - `dimensions`
  - `feedback`
  - `work`
  - `overall`
  - `strengths`
  - `problems`
  - `suggestions`
  - `competitionFit`
  - `summary`

### 评分规则：`src/data/reviewRubrics.js`

评分维度：

- 主题契合度：`themeFit`
- 视觉表现：`visualExpression`
- 创新性：`innovation`
- 叙事完整度：`narrative`
- 竞赛适配度：`competitionFit`

等级规则：

- 88 分及以上：优秀
- 76 分及以上：可进入初审
- 62 分及以上：需要明显修改
- 0 分及以上：不建议直接提交

总分算法：

- 对 5 个维度取整、限制到 0 到 100，再计算平均分。

### 示例上传文件：`src/data/seedFiles.js`

初始上传列表包含 3 个图片文件：

- `Cover_poster.png` -> `assets/cover-poster-thumb.png`
- `layout_detail.jpg` -> `assets/layout-detail-thumb.png`
- `acientbuilding.png` -> `assets/ancient-building-thumb.png`

### 其他数据文件

- `src/data/reviewCriteria.js`：从 `reviewRubrics` 派生评分维度 label，目前没有被主流程直接 import。
- `src/data/taxonomy.js`：只导出 `defaultBreadcrumb`，当前分类树实际内容写在 `src/components/taxonomyTree.js` 中，`taxonomy.js` 没有被主流程直接 import。

### 静态资源：`public/assets`

当前资源文件：

- `brand-wordmark-ink.png`：代码中未检索到直接引用，待确认是否为后续品牌图资源。
- `urban-renewal-poster.png`：代码中未检索到直接引用，待确认是否为后续示例图资源。
- `cover-poster-thumb.png`：被 `src/data/seedFiles.js` 引用。
- `layout-detail-thumb.png`：被 `src/data/seedFiles.js` 引用。
- `ancient-building-thumb.png`：被 `src/data/seedFiles.js` 引用。

## 5. 关键流程实现说明

### 上传流程

1. 页面初始化时，`createReviewStore()` 调用 `createUploadState()`，默认把 `src/data/seedFiles.js` 复制到 `store.uploads`。
2. `bindFileUpload(store, previewController)` 渲染当前 `store.uploads`。
3. 用户点击上传区域时，触发隐藏的 `<input type="file" multiple>`。
4. 用户拖拽文件到上传区域时，读取 `event.dataTransfer.files`。
5. `addUploadFiles(currentFiles, fileSet)` 把 `FileList` 转为上传项：
   - 图片文件：使用 `URL.createObjectURL(file)` 生成本地预览地址。
   - 非图片文件：`previewUrl` 为空，后续以扩展名占位显示。
6. 更新 `store.uploads` 后重新渲染文件列表。
7. 删除文件时，`removeUploadFile()` 会移除对应上传项；如果预览地址是 `blob:`，会释放 object URL。
8. 拖拽排序时，`reorderUploadFiles(currentFiles, sourceId, targetId)` 调整数组顺序并重新渲染。

待确认：

- README 写到“第一张图片作为历史记录缩略图”，但当前 `createHistoryCard(record)` 只渲染 CSS 渐变占位，没有读取上传列表第一张图。
- 当前上传文件仅保存在浏览器运行时内存中，没有写入 `localStorage`，刷新后会回到 `seedFiles`。

### 预览流程

1. `src/app.js` 先调用 `bindPreviewModal()`，得到 `previewController`。
2. `bindFileUpload(store, previewController)` 在每个文件缩略图按钮上绑定双击事件。
3. 双击缩略图时调用 `previewController.openPreview(item)`。
4. `openPreview(item)` 按文件类型显示：
   - `item.previewUrl` 存在：显示 `<img>`。
   - `item.previewUrl` 不存在：显示大号扩展名占位。
5. 弹层可通过关闭按钮、点击遮罩、Esc 关闭。

### 生成报告流程

1. 用户在作品表单点击“生成预评审报告”。
2. `src/components/workForm.js` 调用 `getWorkFormValues(store)` 读取：
   - 作品名称
   - 作品说明
   - 个人项目下的作品要求
   - 当前项目类型
   - 当前 breadcrumb
3. `generateMockReview(work)` 调用 `buildMockReport(work)`。
4. `buildMockReport()` 调用 `findBestMockCase(work)` 匹配 mock case。
5. `normalizeWork()` 合并用户输入和案例默认值。
6. `tuneScoreProfile()` 根据描述长度、竞赛节点、媒体节点做轻量分数调整。
7. `getTotalScore()` 计算总分，`getScoreLevel()` 计算等级。
8. 返回结构化 report。
9. `src/app.js` 的 `onReportGenerated(report)` 执行：
   - `createHistoryRecord(report)`
   - `updateReportPanel(report)`
   - `addHistoryRecord(store.history, record)`
   - `persistHistory(store.history)`
   - `addHistoryRecordToPanel(record)`

### 报告预览 / 分享 / 下载流程

1. 初始页面用 `mockReportTemplate` 渲染报告。
2. 生成新报告后，`updateReportPanel(report)` 替换 `#formalReport` 内容，并更新综合分圆环。
3. 点击“分享”：
   - 展开分享面板。
   - `getShareUrl()` 生成当前页面 URL，并把 hash 设置为 `#formalReport`。
   - 点击“复制”时调用 `navigator.clipboard.writeText()`。
4. 点击“下载”：
   - 展开下载菜单。
   - “下载 PDF”调用 `window.print()`，不是直接生成 PDF 文件。
   - “下载 Markdown”调用 `downloadTextFile()`，把当前报告 DOM 文本整理为 Markdown 并下载。

### 历史记录流程

1. 初始静态历史记录由 `src/components/historyPanel.js` 直接写在模板里。
2. 页面初始化时，`createReviewStore()` 读取 `localStorage` 中的 `ai-art-review-desk:review-history`。
3. `renderPersistedHistoryRecords(store.history)` 把本地保存的新记录插入右侧列表。
4. 生成报告后，`createHistoryRecord(report)` 创建轻量历史记录：
   - `id`
   - `title`
   - `meta`
   - `timeLabel`
5. `persistHistory(records)` 只保留前 12 条并写入 `localStorage`。
6. 历史记录更多菜单：
   - 重命名：修改 DOM 文本；如果记录存在于 `store.history`，同步持久化。
   - 查看：只切换 active 样式，不会恢复对应报告内容。
   - 删除：删除 DOM 节点；如果记录存在于 `store.history`，同步持久化。

待确认：

- 历史记录“查看”当前没有把旧报告重新加载到报告面板。
- 静态种子历史记录不在 `store.history` 中，重命名 / 删除后刷新会恢复。

### 分类导航流程

1. 左侧分类树由 `src/components/taxonomyTree.js` 静态模板渲染。
2. 点击带子节点的按钮时，切换当前节点的 `collapsed` 状态，并更新箭头。
3. 所有树按钮移除 active，当前按钮加 active。
4. 更新 store：
   - `store.selectedProjectType`
   - `store.selectedBreadcrumb`
5. 如果页面存在 `#breadcrumb`，则更新其文本；当前页面骨架没有渲染 `#breadcrumb`，因此这一步实际不会显示。
6. 派发 `projectContextChange` 自定义事件。
7. `workForm` 监听该事件：
   - 竞赛项目：显示作品名称、作品说明。
   - 个人项目：额外显示作品要求。

待确认：

- `src/data/taxonomy.js` 当前没有驱动分类树；分类数据仍硬编码在组件模板中。
- `#breadcrumb` 的样式和 id 已存在，但当前没有对应 DOM 节点。

## 6. 当前还没有实现、但从代码 / README 能看出的下一步规划

以下只列代码或 README 中能看到的规划、占位或未完成能力：

- 真实大模型 API 接入：README 明确说明当前不接入真实大模型 API，后续建议新增后端代理 `/api/reviews`，由后端读取 API key、校验输入、调用模型并返回结构化结果。
- Mock service 替换：README 建议后续把 `src/services/aiReviewService.mock.js` 替换为调用后端代理的 service。
- 搜索能力：顶部搜索框已有 UI，但没有事件绑定或搜索结果逻辑。
- AI 对话真实能力：当前只是模拟回复；从 README 和提示文案看，后续可能接入真实 AI 追问、作品说明改写、评委视角分析。具体范围待确认。
- 图片上下文开关：AI 对话中有“保持图片上下文（消耗更多Token）”复选框，但当前没有读取该状态或影响请求。
- 设置中心：`settingsModal.js` 和相关样式存在，内容包括用户资料、设置、偏好、语言、登录 / 退出，但当前未接入入口和实际业务逻辑。
- 报告目录：`reportOutline.js` 已写好滚动同步和锚点跳转逻辑，但当前未渲染。
- 分类数据抽离：`src/data/taxonomy.js` 只保留默认 breadcrumb，分类树仍硬编码在组件中；后续可能把分类导航改为数据驱动，待确认。
- 历史记录回访完整报告：当前“查看”只切换 active 样式，没有恢复旧报告正文；后续是否要保存完整 report 并回填报告面板，待确认。
- 历史记录缩略图：README 提到第一张图片作为历史记录缩略图，但当前历史卡片使用 CSS 渐变占位；是否要接入上传图缩略图待确认。
- 直接 PDF 生成：当前“下载 PDF”是浏览器打印入口，不是程序生成 PDF；是否需要真实 PDF 文件导出待确认。
- 品牌 / 示例大图资源使用：`brand-wordmark-ink.png` 和 `urban-renewal-poster.png` 当前未被代码引用，是否用于后续品牌头图或示例作品展示待确认。

## 7. 需要补充截图的位置清单

建议后续在本文或配套产品文档中补充以下截图：

1. 页面全局首屏：展示顶部栏、左侧分类导航、中间工作区、右侧历史栏。
2. 左侧分类导航展开状态：展示竞赛项目、公益赛道及 5 个设计方向。
3. 个人项目表单状态：点击“毕业设计 / 课程作业 / 实践项目”后，展示额外的“作品要求”字段。
4. 作品上传默认状态：展示 3 个 `seedFiles` 示例缩略图。
5. 拖拽上传 / 文件追加后状态：展示新增图片和非图片文件占位。
6. 文件拖拽排序状态：展示文件卡片移动前后的列表顺序。
7. 图片预览弹层：双击图片缩略图后的大图弹窗。
8. 非图片预览弹层：上传非图片文件后，展示扩展名占位预览。
9. 初始 Mock 报告：页面默认报告状态和综合分圆环。
10. 生成新报告后状态：表单输入变化后生成的新报告内容与分数。
11. 报告分享面板：展示可复制链接和复制按钮。
12. 报告下载菜单：展示“下载 PDF”和“下载 Markdown”两个入口。
13. Markdown 下载结果：下载出的 `ai-art-review-report.md` 文件内容截图或预览。
14. 打印 / PDF 浏览器预览：点击“下载 PDF”后的系统打印预览。
15. AI 对话面板：展示初始模拟对话、用户输入和固定模拟回复。
16. 图片上下文开关：展示复选框位置；功能状态标注为待确认。
17. 右侧历史记录默认状态：展示 3 条静态历史记录。
18. 生成报告后的新历史记录：展示新记录插入列表顶部。
19. 历史记录更多菜单：展示重命名、查看、删除操作。
20. 历史记录右侧栏折叠状态：展示折叠后的窄栏和展开按钮。
21. 日间主题：展示默认主题色。
22. 夜间主题：点击模式切换后的界面状态。
23. 移动端布局：窄屏下顶部栏、分类导航、工作区、历史记录的纵向布局。
24. 待接入设置中心：如果后续接入 `settingsModal.js`，补充设置中心弹层截图。
25. 待接入报告目录：如果后续接入 `reportOutline.js`，补充右侧报告目录和滚动同步截图。

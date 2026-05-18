# AI Art Review Desk

AI Art Review Desk 是一个面向艺术与设计作品的静态演示 Demo。当前版本用于展示作品上传、节点语境选择、Mock AI 预评审报告、历史记录和基础报告操作，不接入真实大模型 API，也不包含后端服务。

## 当前功能

- 竞赛项目、个人项目和竞赛方向选择
- 作品信息表单，竞赛项目显示作品名称和作品说明，个人项目额外显示作品要求
- 示例作品图与多文件上传列表
- 上传文件缩略图预览、删除和拖拽排序
- Mock AI 预评审报告生成
- 报告分数、正文、分享链接、Markdown 下载和打印下载入口
- 右侧历史记录
- 日间 / 夜间主题切换
- 主题和新生成的历史记录使用 `localStorage` 做本地持久化

## 技术栈

- 原生 HTML / CSS / JavaScript
- ES Modules
- Vite 作为本地开发服务器和静态构建工具
- 浏览器 `localStorage` 做轻量本地持久化

当前项目没有使用 React、Vue 或其他前端框架。

项目使用 Vite，因此入口脚本 [src/main.js](src/main.js) 可以直接 `import './styles/index.css'`。如果后续移除 Vite、改为纯静态原生 ES Modules，则需要把 CSS 改成在 [index.html](index.html) 中用 `<link>` 引入。

## 本地运行

请使用本地服务器运行，不要直接用 `file://` 打开 `index.html`。浏览器原生 ES Modules 和 Vite CSS 处理都需要 HTTP 服务环境。

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://127.0.0.1:5173/
```

其他检查命令：

```bash
npm run check
npm run build
npm run preview
npm test
```

## 项目结构

```text
ai-art-review-desk/
  index.html
  package.json
  public/
    favicon.svg
    assets/
      brand-wordmark-ink.png
      urban-renewal-poster.png
      cover-poster-thumb.png
      layout-detail-thumb.png
      ancient-building-thumb.png
  src/
    main.js
    app.js
    ids.js
    components/
      topBar.js
      taxonomyTree.js
      workspace.js
      workForm.js
      fileUpload.js
      reportPanel.js
      chatPanel.js
      rightRail.js
      historyPanel.js
      reportOutline.js
      previewModal.js
      settingsModal.js
    data/
      mockCases.js
      mockReport.js
      reviewRubrics.js
      reviewCriteria.js
      seedFiles.js
      taxonomy.js
    services/
      aiReviewService.mock.js
      storageService.js
    state/
      history.js
      reviewStore.js
      theme.js
      uploads.js
    styles/
      index.css
      tokens.css
      base.css
      layout.css
      components.css
      responsive.css
    utils/
      dom.js
      file.js
  docs/
    product/
    figma/
  tests/
    smoke.spec.js
```

## 静态部署

这是一个纯前端静态 Demo，可以部署到 GitHub Pages、Vercel、Netlify 或 Cloudflare Pages。

构建命令：

```bash
npm run build
```

输出目录：

```text
dist/
```

部署平台配置建议：

- Vercel: Framework Preset 选择 `Vite`，Build Command 使用 `npm run build`，Output Directory 使用 `dist`
- Netlify: Build Command 使用 `npm run build`，Publish Directory 使用 `dist`
- Cloudflare Pages: Build Command 使用 `npm run build`，Build output directory 使用 `dist`
- GitHub Pages: 先运行 `npm run build`，再发布 `dist/` 内容，或用 GitHub Actions 构建并部署 `dist/`

项目资源路径使用相对路径和 Vite `public/` 目录，不依赖本机绝对路径。[vite.config.js](vite.config.js) 已设置 `base: './'`，构建后的 JS/CSS 资源会使用相对路径，适合部署到 GitHub Pages 子路径。

## Mock AI 评审说明

当前评审逻辑保留在：

```text
src/services/aiReviewService.mock.js
src/data/mockCases.js
src/data/reviewRubrics.js
src/data/mockReport.js
```

点击“生成预评审报告”后，前端会读取当前作品表单、示例作品和节点语境，基于 Mock 数据生成报告，并更新报告面板与历史记录。当前没有真实网络请求，也没有真实大模型调用。

Mock 数据分为三层：

- `src/data/mockCases.js`：维护模拟作品案例。每个案例包含 `title`、`category`、`theme`、`competitionFit`、`strengths`、`weaknesses`、`suggestions` 和 `scoreProfile`。
- `src/data/reviewRubrics.js`：维护评分维度、等级判断和总分计算规则。
- `src/data/mockReport.js`：把当前表单、节点和匹配到的案例组装成正式报告。

扩展 Mock 案例时，在 `mockCases.js` 中新增一个对象即可。建议同时补齐 `id`、`workType`、`breadcrumb`、`mediaNode`、`description`、`completion` 和 5 个维度的 `scoreProfile`，这样示例作品下拉框、节点自动匹配、报告评分和历史记录都能继续跑通。

## 本地持久化状态

当前使用 `localStorage` 保存：

- 主题偏好
- 新生成的历史记录

示例种子历史记录是静态展示内容；新生成的历史记录会保存在当前浏览器。清除浏览器站点数据后，本地历史记录会被清空。

## 后续真实大模型 API 接入计划

真实大模型 API 不应直接写在前端，也不要把 API key 放进浏览器代码、`.env` 前端变量或静态托管产物里。

下一阶段如果要接入真实模型，建议新增一个后端代理层：

```text
client static app
  -> /api/reviews
serverless function or backend proxy
  -> model provider API
```

后端代理需要负责：

- 读取服务端环境变量中的 API key
- 校验和裁剪前端上传的作品信息
- 调用真实大模型 API
- 返回结构化评审结果给前端
- 做速率限制、错误处理和日志脱敏

前端届时只需要把 `src/services/aiReviewService.mock.js` 替换为调用后端代理的 service，不应直接访问模型供应商 API。

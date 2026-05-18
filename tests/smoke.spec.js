import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'src/main.js',
  'src/app.js',
  'src/components/topBar.js',
  'src/components/taxonomyTree.js',
  'src/components/workspace.js',
  'src/components/rightRail.js',
  'src/state/reviewStore.js',
  'src/services/aiReviewService.mock.js',
  'src/services/storageService.js',
  'src/data/mockCases.js',
  'src/data/reviewRubrics.js',
  'src/styles/index.css',
  'docs/product/product-brief.md',
  'tests/smoke.spec.js',
  'vite.config.js',
  'public/favicon.svg',
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required project file: ${file}`);
  }
}

const indexHtml = readFileSync('index.html', 'utf8');
if (!indexHtml.includes('<div id="app"></div>')) {
  throw new Error('index.html must expose the app mount point.');
}

if (!indexHtml.includes('rel="icon" href="./favicon.svg"')) {
  throw new Error('index.html should reference the static favicon with a relative path.');
}

if (indexHtml.includes('<style>') || !indexHtml.includes('type="module" src="./src/main.js"')) {
  throw new Error('index.html should only load the module entry, not inline the prototype code.');
}

const mainJs = readFileSync('src/main.js', 'utf8');
if (!mainJs.includes("import './styles/index.css';") || !mainJs.includes('createApp(')) {
  throw new Error('main.js should only load styles and start createApp.');
}

const appJs = readFileSync('src/app.js', 'utf8');
for (const moduleName of ['topBar', 'taxonomyTree', 'workspace', 'rightRail']) {
  if (!appJs.includes(`./components/${moduleName}.js`)) {
    throw new Error(`app.js must compose ${moduleName}.js`);
  }
}

const stylesIndex = readFileSync('src/styles/index.css', 'utf8');
for (const stylesheet of ['tokens.css', 'base.css', 'layout.css', 'components.css', 'responsive.css']) {
  if (!stylesIndex.includes(stylesheet)) {
    throw new Error(`styles/index.css must import ${stylesheet}`);
  }
}

const viteConfig = readFileSync('vite.config.js', 'utf8');
if (!viteConfig.includes("base: './'")) {
  throw new Error('vite.config.js should use a relative base for static subpath deployment.');
}

const mockCases = readFileSync('src/data/mockCases.js', 'utf8');
for (const caseTitle of ['城市更新主题海报', '非遗文创包装设计', '校园公共空间改造', 'AI 辅助视觉叙事作品', '品牌视觉识别系统']) {
  if (!mockCases.includes(caseTitle)) {
    throw new Error(`mockCases.js must include seed case: ${caseTitle}`);
  }
}

for (const field of ['title', 'category', 'theme', 'competitionFit', 'strengths', 'weaknesses', 'suggestions', 'scoreProfile']) {
  if (!mockCases.includes(field)) {
    throw new Error(`mockCases.js must include case field: ${field}`);
  }
}

const reviewRubrics = readFileSync('src/data/reviewRubrics.js', 'utf8');
for (const rubric of ['主题契合度', '视觉表现', '创新性', '叙事完整度', '竞赛适配度']) {
  if (!reviewRubrics.includes(rubric)) {
    throw new Error(`reviewRubrics.js must include rubric: ${rubric}`);
  }
}

if (existsSync('dist/index.html')) {
  const builtIndex = readFileSync('dist/index.html', 'utf8');
  if (builtIndex.includes('src="/assets/') || builtIndex.includes('href="/assets/')) {
    throw new Error('dist/index.html should not use root-relative /assets paths.');
  }
}

console.log('Smoke structure check passed.');

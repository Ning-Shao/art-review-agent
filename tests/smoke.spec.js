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

if (existsSync('dist/index.html')) {
  const builtIndex = readFileSync('dist/index.html', 'utf8');
  if (builtIndex.includes('src="/assets/') || builtIndex.includes('href="/assets/')) {
    throw new Error('dist/index.html should not use root-relative /assets paths.');
  }
}

console.log('Smoke structure check passed.');

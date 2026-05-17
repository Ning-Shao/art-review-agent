import { createReviewStore } from './state/reviewStore.js';
import { bindChatPanel } from './components/chatPanel.js';
import { bindFileUpload } from './components/fileUpload.js';
import { bindPreviewModal, renderPreviewModal } from './components/previewModal.js';
import { bindReportOutline } from './components/reportOutline.js';
import { bindReportPanel } from './components/reportPanel.js';
import { bindRightRail, renderHistoryMenu, renderRightRail } from './components/rightRail.js';
import { bindSettingsModal, renderSettingsModal } from './components/settingsModal.js';
import { bindTaxonomyTree, renderTaxonomyTree } from './components/taxonomyTree.js';
import { bindTopBar, renderTopBar } from './components/topBar.js';
import { bindWorkForm } from './components/workForm.js';
import { bindWorkspace, renderWorkspace } from './components/workspace.js';

function renderAppShell() {
  return '<div class="app">\n' + renderTopBar() + '\n    <div class="shell" id="shell">\n' + renderTaxonomyTree() + '\n' + renderWorkspace() + '\n' + renderRightRail() + '\n    </div>\n  </div>\n\n' + renderPreviewModal() + '\n' + renderHistoryMenu() + '\n' + renderSettingsModal();
}

export function createApp(root) {
  if (!root) throw new Error('Missing #app root element');
  const store = createReviewStore();
  root.innerHTML = renderAppShell();
  const previewController = bindPreviewModal();
  bindTopBar(store);
  bindTaxonomyTree(store);
  bindSettingsModal();
  bindWorkForm();
  bindFileUpload(store, previewController);
  bindReportPanel();
  bindChatPanel();
  bindRightRail();
  const outlineController = bindReportOutline();
  bindWorkspace(outlineController);
}

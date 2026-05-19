import { renderChatPanel } from './chatPanel.js';
import { renderFileUpload } from './fileUpload.js';
import { renderReportPanel } from './reportPanel.js';
import { renderWorkForm } from './workForm.js';

export function renderWorkspace() {
  return "<main class=\"workspace\">\n        <section class=\"work-grid\" aria-label=\"作品信息和上传\">\n" + renderWorkForm() + '\n' + renderFileUpload() + "\n        </section>\n\n" + renderReportPanel() + "\n\n" + renderChatPanel() + "\n      </main>";
}

export function bindWorkspace() {}

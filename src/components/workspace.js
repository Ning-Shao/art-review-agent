import { renderChatPanel } from './chatPanel.js';
import { renderFileUpload } from './fileUpload.js';
import { renderReportPanel } from './reportPanel.js';
import { renderWorkForm } from './workForm.js';

export function renderWorkspace() {
  return "<main class=\"workspace\">\n        <section class=\"work-grid\" aria-label=\"作品信息和上传\">\n" + renderFileUpload() + '\n' + renderWorkForm() + "\n        </section>\n        <div class=\"generate-row\"><button class=\"cta\" type=\"button\">生成预评审报告</button></div>\n\n" + renderReportPanel() + "\n\n" + renderChatPanel() + "\n      </main>";
}

export function bindWorkspace() {}

import { DOM_IDS } from '../ids.js';
import { getFileTypeLabel } from '../state/uploads.js';

export function renderPreviewModal() {

  return "<div class=\"preview-modal\" id=\"previewModal\" hidden>\n    <div class=\"preview-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"previewTitle\">\n      <div class=\"preview-head\">\n        <div class=\"preview-title\" id=\"previewTitle\">文件预览</div>\n        <button class=\"preview-close\" id=\"previewClose\" type=\"button\" aria-label=\"关闭预览\">×</button>\n      </div>\n      <div class=\"preview-body\" id=\"previewBody\"></div>\n    </div>\n  </div>";

}

export function bindPreviewModal() {
  const previewModal = document.getElementById(DOM_IDS.previewModal);
  const previewTitle = document.getElementById(DOM_IDS.previewTitle);
  const previewBody = document.getElementById(DOM_IDS.previewBody);
  const previewClose = document.getElementById(DOM_IDS.previewClose);
  function closePreview() {
    previewModal.hidden = true;
    previewBody.innerHTML = '';
  }
  function openPreview(item) {
    previewTitle.textContent = item.name;
    previewBody.innerHTML = '';
    if (item.previewUrl) {
      const img = document.createElement('img');
      img.src = item.previewUrl;
      img.alt = item.name;
      previewBody.appendChild(img);
    } else {
      const doc = document.createElement('div');
      doc.className = 'doc-preview-large';
      doc.textContent = getFileTypeLabel(item);
      previewBody.appendChild(doc);
    }
    previewModal.hidden = false;
  }
  if (previewClose) previewClose.addEventListener('click', closePreview);
  if (previewModal) previewModal.addEventListener('click', (event) => { if (event.target === previewModal) closePreview(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && previewModal && !previewModal.hidden) closePreview(); });
  return { openPreview, closePreview };
}

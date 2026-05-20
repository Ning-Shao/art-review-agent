import { DOM_IDS } from '../ids.js';
import { addUploadFiles, getExtension, removeUploadFile, reorderUploadFiles } from '../state/uploads.js';

export function renderFileUpload() {

  return "<div class=\"panel upload-panel\">\n            <div>\n              <h2 class=\"panel-title\">作品上传</h2>\n              <p class=\"panel-copy\">支持单图、多文件和过程材料。第一张图片作为历史记录缩略图。</p>\n            </div>\n            <div class=\"upload-drop\" id=\"uploadDrop\" role=\"button\" tabindex=\"0\" aria-label=\"上传作品图片或多文件材料\">\n              <div>\n                <strong>+</strong>\n                上传作品图片 / 多文件材料\n              </div>\n            </div>\n            <input id=\"fileInput\" type=\"file\" multiple hidden>\n            <p class=\"upload-meta\" id=\"uploadMeta\">已上传（双击缩略图放大）（拖拽调整排序）</p>\n            <ul class=\"file-list\" id=\"fileList\" aria-live=\"polite\"></ul>\n          </div>";

}

let draggedFileId = null;

export function bindFileUpload(store, previewController) {
  const uploadDrop = document.getElementById(DOM_IDS.uploadDrop);
  const fileInput = document.getElementById(DOM_IDS.fileInput);
  const fileList = document.getElementById(DOM_IDS.fileList);
  const uploadMeta = document.getElementById(DOM_IDS.uploadMeta);

  function renderFiles() {
    if (!fileList || !uploadMeta) return;
    fileList.innerHTML = '';
    uploadMeta.textContent = store.uploads.length ? '已上传（双击缩略图放大）（拖拽调整排序）' : '尚未上传文件';
    store.uploads.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'file-item';
      li.draggable = true;
      li.dataset.id = item.id;
      const previewButton = document.createElement('button');
      previewButton.className = 'file-preview';
      previewButton.type = 'button';
      previewButton.title = '双击预览';
      if (item.previewUrl) {
        const img = document.createElement('img');
        img.src = item.previewUrl;
        img.alt = item.name;
        previewButton.appendChild(img);
      } else {
        const docThumb = document.createElement('span');
        docThumb.className = 'doc-thumb';
        docThumb.textContent = getExtension(item.name);
        previewButton.appendChild(docThumb);
      }
      const name = document.createElement('span');
      name.className = 'file-name';
      name.textContent = item.name;
      previewButton.appendChild(name);
      previewButton.addEventListener('dblclick', () => previewController.openPreview(item));
      const remove = document.createElement('button');
      remove.className = 'delete-file';
      remove.type = 'button';
      remove.setAttribute('aria-label', '删除 ' + item.name);
      remove.textContent = '×';
      remove.addEventListener('click', () => { store.uploads = removeUploadFile(store.uploads, item.id); renderFiles(); });
      li.addEventListener('dragstart', () => { draggedFileId = item.id; li.classList.add('dragging'); });
      li.addEventListener('dragend', () => { draggedFileId = null; li.classList.remove('dragging'); document.querySelectorAll('.file-item.drop-target').forEach((node) => node.classList.remove('drop-target')); });
      li.addEventListener('dragover', (event) => { event.preventDefault(); if (draggedFileId !== item.id) li.classList.add('drop-target'); });
      li.addEventListener('dragleave', () => li.classList.remove('drop-target'));
      li.addEventListener('drop', (event) => { event.preventDefault(); li.classList.remove('drop-target'); if (!draggedFileId || draggedFileId === item.id) return; store.uploads = reorderUploadFiles(store.uploads, draggedFileId, item.id); renderFiles(); });
      li.append(previewButton, remove);
      fileList.appendChild(li);
    });
  }

  function addFiles(fileSet) {
    if (!fileSet || !fileSet.length) return;
    store.uploads = addUploadFiles(store.uploads, fileSet);
    if (fileInput) fileInput.value = '';
    renderFiles();
  }

  if (uploadDrop) {
    uploadDrop.addEventListener('click', () => fileInput && fileInput.click());
    uploadDrop.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (fileInput) fileInput.click(); } });
    uploadDrop.addEventListener('dragover', (event) => { event.preventDefault(); uploadDrop.classList.add('dragging'); });
    uploadDrop.addEventListener('dragleave', () => uploadDrop.classList.remove('dragging'));
    uploadDrop.addEventListener('drop', (event) => { event.preventDefault(); uploadDrop.classList.remove('dragging'); addFiles(event.dataTransfer.files); });
  }
  if (fileInput) fileInput.addEventListener('change', () => addFiles(fileInput.files));
  renderFiles();
}

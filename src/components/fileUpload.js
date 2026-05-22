import { DOM_IDS } from '../ids.js';
import {
  addUploadFiles,
  getFileTypeLabel,
  removeUploadFile,
  renameUploadFile,
  reorderUploadFiles,
  setUploadFileRole,
} from '../state/uploads.js';

const FILE_ROLE_OPTIONS = [
  { value: '', label: '未标记' },
  { value: 'cover', label: '作品封面 / 主展示图' },
  { value: 'gallery', label: '作品图集 / 辅助展示图' },
];

export function renderFileUpload() {

  return "<div class=\"panel upload-panel\">\n            <div>\n              <h2 class=\"panel-title\">作品文件</h2>\n              <p class=\"panel-copy\">上传作品图片、视频或说明文档。</p>\n            </div>\n            <div class=\"upload-drop\" id=\"uploadDrop\" role=\"button\" tabindex=\"0\" aria-label=\"上传作品文件\">\n              <div>\n                <strong>+</strong>\n                上传作品文件\n              </div>\n            </div>\n            <input id=\"fileInput\" type=\"file\" multiple hidden>\n            <p class=\"upload-meta\" id=\"uploadMeta\">已上传（图片可双击预览，非图片显示文件类型）（拖拽调整排序）</p>\n            <ul class=\"file-list\" id=\"fileList\" aria-live=\"polite\"></ul>\n          </div>";

}

let draggedFileId = null;
let editingFileId = null;

export function bindFileUpload(store, previewController) {
  const uploadDrop = document.getElementById(DOM_IDS.uploadDrop);
  const fileInput = document.getElementById(DOM_IDS.fileInput);
  const fileList = document.getElementById(DOM_IDS.fileList);
  const uploadMeta = document.getElementById(DOM_IDS.uploadMeta);

  function renderFiles() {
    if (!fileList || !uploadMeta) return;
    fileList.innerHTML = '';
    uploadMeta.textContent = store.uploads.length ? '已上传（图片可双击预览，非图片显示文件类型）（拖拽调整排序）' : '尚未上传文件';
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
        docThumb.textContent = getFileTypeLabel(item);
        previewButton.appendChild(docThumb);
      }
      const name = document.createElement('button');
      name.className = 'file-name';
      name.type = 'button';
      name.textContent = item.name;
      name.title = '双击重命名';
      name.addEventListener('dblclick', (event) => {
        event.preventDefault();
        event.stopPropagation();
        editingFileId = item.id;
        renderFiles();
      });
      previewButton.addEventListener('dblclick', () => previewController.openPreview(item));
      const controls = document.createElement('div');
      controls.className = 'file-controls';
      if (editingFileId === item.id) {
        const nameInput = document.createElement('input');
        nameInput.className = 'file-name-input';
        nameInput.type = 'text';
        nameInput.value = item.name;
        nameInput.setAttribute('aria-label', '重命名 ' + item.name);
        const commitRename = () => {
          store.uploads = renameUploadFile(store.uploads, item.id, nameInput.value);
          editingFileId = null;
          renderFiles();
        };
        nameInput.addEventListener('change', commitRename);
        nameInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commitRename();
          }
          if (event.key === 'Escape') {
            editingFileId = null;
            renderFiles();
          }
        });
        nameInput.addEventListener('blur', commitRename);
        controls.appendChild(nameInput);
        window.requestAnimationFrame(() => {
          nameInput.focus();
          nameInput.select();
        });
      }
      const roleSelect = document.createElement('select');
      roleSelect.className = 'file-role-select';
      roleSelect.setAttribute('aria-label', '选择文件标签');
      FILE_ROLE_OPTIONS.forEach((option) => {
        const optionNode = document.createElement('option');
        optionNode.value = option.value;
        optionNode.textContent = option.label;
        roleSelect.appendChild(optionNode);
      });
      roleSelect.value = item.role || '';
      roleSelect.addEventListener('change', () => {
        store.uploads = setUploadFileRole(store.uploads, item.id, roleSelect.value);
        renderFiles();
      });
      controls.appendChild(roleSelect);
      const remove = document.createElement('button');
      remove.className = 'delete-file';
      remove.type = 'button';
      remove.setAttribute('aria-label', '删除 ' + item.name);
      remove.textContent = '×';
      remove.addEventListener('click', () => { store.uploads = removeUploadFile(store.uploads, item.id); renderFiles(); });
      li.addEventListener('dragstart', (event) => {
        if (event.target.closest('input, select')) {
          event.preventDefault();
          return;
        }
        draggedFileId = item.id;
        li.classList.add('dragging');
      });
      li.addEventListener('dragend', () => { draggedFileId = null; li.classList.remove('dragging'); document.querySelectorAll('.file-item.drop-target').forEach((node) => node.classList.remove('drop-target')); });
      li.addEventListener('dragover', (event) => { event.preventDefault(); if (draggedFileId !== item.id) li.classList.add('drop-target'); });
      li.addEventListener('dragleave', () => li.classList.remove('drop-target'));
      li.addEventListener('drop', (event) => { event.preventDefault(); li.classList.remove('drop-target'); if (!draggedFileId || draggedFileId === item.id) return; store.uploads = reorderUploadFiles(store.uploads, draggedFileId, item.id); renderFiles(); });
      li.append(previewButton, name, controls, remove);
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

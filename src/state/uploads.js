export function createUploadState(initialFiles = []) {
  return initialFiles.map((item) => ({ ...item }));
}

export function getExtension(name) {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
}

export function addUploadFiles(currentFiles, fileSet) {
  const nextFiles = Array.from(fileSet).map((file) => ({
    id: Date.now() + '-' + Math.random().toString(16).slice(2),
    name: file.name,
    type: file.type,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
    role: '',
  }));
  return [...currentFiles, ...nextFiles];
}

export function removeUploadFile(currentFiles, id) {
  const target = currentFiles.find((item) => item.id === id);
  if (target && target.previewUrl && target.previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(target.previewUrl);
  }
  return currentFiles.filter((item) => item.id !== id);
}

export function reorderUploadFiles(currentFiles, sourceId, targetId) {
  const sourceIndex = currentFiles.findIndex((item) => item.id === sourceId);
  const targetIndex = currentFiles.findIndex((item) => item.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return currentFiles;
  const nextFiles = [...currentFiles];
  const movingItems = nextFiles.splice(sourceIndex, 1);
  nextFiles.splice(targetIndex, 0, movingItems[0]);
  return nextFiles;
}

export function renameUploadFile(currentFiles, id, name) {
  const nextName = name.trim();
  if (!nextName) return currentFiles;
  return currentFiles.map((item) => (
    item.id === id ? { ...item, name: nextName } : item
  ));
}

export function setUploadFileRole(currentFiles, id, role) {
  return currentFiles.map((item) => {
    if (role === 'cover' && item.id !== id) return { ...item, role: item.role === 'cover' ? '' : item.role };
    if (item.id === id) return { ...item, role };
    return item;
  });
}

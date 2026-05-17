import { getInitialTheme } from './theme.js';
import { createUploadState } from './uploads.js';
import { readPersistedHistory } from './history.js';

export function createReviewStore() {
  return {
    theme: getInitialTheme(),
    uploads: createUploadState(),
    history: readPersistedHistory(),
    selectedBreadcrumb: '视觉传达 / 海报设计 / 米兰设计周 / 城市更新主题赛道',
  };
}

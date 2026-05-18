import { getInitialTheme } from './theme.js';
import { createUploadState } from './uploads.js';
import { readPersistedHistory } from './history.js';

export function createReviewStore() {
  return {
    theme: getInitialTheme(),
    uploads: createUploadState(),
    history: readPersistedHistory(),
    selectedProjectType: 'competition',
    selectedBreadcrumb: '竞赛项目 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道',
  };
}

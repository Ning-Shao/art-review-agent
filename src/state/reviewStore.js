import { getInitialTheme } from './theme.js';
import { createUploadState } from './uploads.js';
import { readPersistedHistory } from './history.js';

export function createReviewStore() {
  return {
    theme: getInitialTheme(),
    uploads: createUploadState(),
    history: readPersistedHistory(),
    selectedProjectType: 'competition',
    selectedProjectTag: '',
    selectedRequirementId: '',
    selectedRequirementContext: '',
    selectedBreadcrumb: '固定赛事 / 米兰设计周-高校设计作品展 / 第四届‘设计赋能土特产，助力乡村振兴’公益赛道',
  };
}

import { readJSON, writeJSON } from '../services/storageService.js';

const HISTORY_KEY = 'review-history';

export function readPersistedHistory() {
  return readJSON(HISTORY_KEY, []);
}

export function persistHistory(records) {
  writeJSON(HISTORY_KEY, records.slice(0, 12));
}

export function createHistoryRecord(report) {
  const time = new Date(report.generatedAt);
  return {
    id: report.id,
    title: report.work.title,
    meta: report.work.category + ' / ' + report.work.track,
    timeLabel: Number.isNaN(time.getTime())
      ? '刚刚'
      : time.toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  };
}

export function addHistoryRecord(records, record) {
  return [record, ...records.filter((item) => item.id !== record.id)].slice(0, 12);
}

export function renameHistoryItem(card, nextName) {
  const title = card && card.querySelector('.history-info strong');
  if (title && nextName && nextName.trim()) title.textContent = nextName.trim();
}

export function activateHistoryItem(card) {
  document.querySelectorAll('.history-card').forEach((item) => item.classList.remove('active'));
  if (card) card.classList.add('active');
}

export function deleteHistoryItem(card) {
  if (card) card.remove();
}

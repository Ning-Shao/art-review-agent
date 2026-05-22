import { ACTIONS, DOM_IDS } from '../ids.js';
import { activateHistoryItem, deleteHistoryItem, persistHistory, renameHistoryItem } from '../state/history.js';
import { renderHistoryPanel } from './historyPanel.js';

export function renderRightRail() {
  return "<aside class=\"right-rail\" aria-label=\"历史记录\">\n        <div class=\"collapsed-tools\" aria-label=\"折叠后的历史记录栏\">\n          <button class=\"collapse-card\" id=\"expandRight\" type=\"button\" aria-label=\"展开历史记录\">‹</button>\n        </div>\n" + renderHistoryPanel() + "\n      </aside>";
}

export function renderHistoryMenu() {
  return "<div class=\"history-menu\" id=\"historyMenu\" hidden>\n\t    <button type=\"button\" data-action=\"rename\">重命名</button>\n\t    <button type=\"button\" data-action=\"view\">查看</button>\n\t    <button type=\"button\" data-action=\"delete\">删除</button>\n\t  </div>";
}

function createHistoryCard(record) {
  const li = document.createElement('li');
  li.className = 'history-card active';
  li.dataset.historyId = record.id;
  li.innerHTML =
    '<div class="history-thumb" aria-hidden="true"></div>' +
    '<div class="history-info">' +
      '<strong></strong>' +
      '<span></span>' +
    '</div>' +
    '<button class="more" type="button" aria-label="更多操作">...</button>';
  li.querySelector('strong').textContent = record.title;
  const thumb = li.querySelector('.history-thumb');
  if (thumb && record.coverUrl) {
    const img = document.createElement('img');
    img.src = record.coverUrl;
    img.alt = record.coverAlt || record.title;
    img.addEventListener('error', () => img.remove());
    thumb.appendChild(img);
  }
  const spans = li.querySelectorAll('.history-info span');
  spans[0].textContent = record.timeLabel;
  return li;
}

export function addHistoryRecordToPanel(record) {
  const historyList = document.getElementById(DOM_IDS.historyList);
  if (!historyList) return;
  document.querySelectorAll('.history-card').forEach((card) => card.classList.remove('active'));
  const existing = historyList.querySelector('[data-history-id="' + record.id + '"]');
  if (existing) existing.remove();
  historyList.prepend(createHistoryCard(record));
}

export function renderPersistedHistoryRecords(records) {
  records.slice().reverse().forEach(addHistoryRecordToPanel);
}

export function bindRightRail(store) {
  const shell = document.getElementById(DOM_IDS.shell);
  const workspace = document.querySelector('.workspace');
  const collapseRight = document.getElementById(DOM_IDS.collapseRight);
  const expandRight = document.getElementById(DOM_IDS.expandRight);
  const historyMenu = document.getElementById(DOM_IDS.historyMenu);
  let activeHistoryCard = null;

  function updateShellColumns() {
    if (!shell || !workspace) return;
    const rootStyle = getComputedStyle(document.documentElement);
    const openLeft = rootStyle.getPropertyValue('--left-w').trim() || '300px';
    const openRight = rootStyle.getPropertyValue('--right-w').trim() || '238px';
    const rightCollapsed = shell.classList.contains('right-collapsed');
    const rightWidthValue = Number.parseFloat(openRight);
    const right = rightCollapsed ? '44px' : openRight;
    const rightOffset = rightCollapsed ? rightWidthValue - 44 : 0;
    const baseWorkspaceWidth = shell.getBoundingClientRect().width - Number.parseFloat(openLeft) - rightWidthValue;
    shell.style.gridTemplateColumns = openLeft + ' minmax(0, 1fr) ' + right;
    workspace.style.left = '';
    workspace.style.width = rightOffset ? baseWorkspaceWidth + rightOffset + 'px' : '';
    shell.classList.toggle('right-narrow', !rightCollapsed && rightWidthValue <= 72);
  }

  function setRightCollapsed(collapsed) {
    if (!shell) return;
    if (!collapsed) {
      const rootStyle = getComputedStyle(document.documentElement);
      const defaultRight = Number.parseFloat(rootStyle.getPropertyValue('--right-default-w')) || 196;
      const leftMaxWidth = Number.parseFloat(rootStyle.getPropertyValue('--left-max-w')) || 300;
      document.documentElement.style.setProperty('--right-w', Math.min(defaultRight, leftMaxWidth) + 'px');
    }
    shell.classList.toggle('right-collapsed', collapsed);
    if (collapseRight) collapseRight.setAttribute('aria-expanded', String(!collapsed));
    if (expandRight) expandRight.setAttribute('aria-expanded', String(!collapsed));
    updateShellColumns();
  }

  function closeHistoryMenu() {
    if (historyMenu) historyMenu.hidden = true;
    activeHistoryCard = null;
  }

  function openHistoryMenu(button) {
    activeHistoryCard = button.closest('.history-card');
    const rect = button.getBoundingClientRect();
    historyMenu.hidden = false;
    const menuWidth = historyMenu.offsetWidth;
    const menuHeight = historyMenu.offsetHeight;
    historyMenu.style.left = Math.max(8, rect.right - menuWidth) + 'px';
    historyMenu.style.top = Math.min(window.innerHeight - menuHeight - 8, rect.bottom + 6) + 'px';
  }

  if (collapseRight) collapseRight.addEventListener('click', () => setRightCollapsed(true));
  if (expandRight) expandRight.addEventListener('click', () => setRightCollapsed(false));
  if (historyMenu) historyMenu.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button');
    if (!actionButton || !activeHistoryCard) return;
    if (actionButton.dataset.action === ACTIONS.renameHistory) {
      const title = activeHistoryCard.querySelector('.history-info strong');
      const nextName = prompt('重命名历史记录', title.textContent.trim());
      renameHistoryItem(activeHistoryCard, nextName);
      if (store && nextName && nextName.trim()) {
        const record = store.history.find((item) => item.id === activeHistoryCard.dataset.historyId);
        if (record) {
          record.title = nextName.trim();
          persistHistory(store.history);
        }
      }
    }
    if (actionButton.dataset.action === ACTIONS.viewHistory) activateHistoryItem(activeHistoryCard);
    if (actionButton.dataset.action === ACTIONS.deleteHistory) {
      if (store) {
        store.history = store.history.filter((item) => item.id !== activeHistoryCard.dataset.historyId);
        persistHistory(store.history);
      }
      deleteHistoryItem(activeHistoryCard);
    }
    closeHistoryMenu();
  });
  document.addEventListener('click', (event) => {
    const moreButton = event.target.closest('.more');
    if (moreButton) {
      event.stopPropagation();
      if (!historyMenu.hidden && activeHistoryCard === moreButton.closest('.history-card')) closeHistoryMenu();
      else openHistoryMenu(moreButton);
      return;
    }
    if (historyMenu && !historyMenu.hidden && !historyMenu.contains(event.target)) closeHistoryMenu();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && historyMenu && !historyMenu.hidden) closeHistoryMenu(); });
}

import { readJSON, writeJSON } from '../services/storageService.js';

const THEME_KEY = 'theme';

export function getInitialTheme() {
  return readJSON(THEME_KEY, 'day');
}

export function persistTheme(theme) {
  writeJSON(THEME_KEY, theme);
}

export function getNextTheme(theme) {
  return theme === 'night' ? 'day' : 'night';
}

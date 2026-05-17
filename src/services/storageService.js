const namespace = 'ai-art-review-desk';

function keyFor(key) {
  return namespace + ':' + key;
}

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(keyFor(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  window.localStorage.setItem(keyFor(key), JSON.stringify(value));
}

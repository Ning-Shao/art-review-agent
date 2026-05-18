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
  try {
    window.localStorage.setItem(keyFor(key), JSON.stringify(value));
  } catch {
    // Static demo storage is best-effort; interaction should keep working if storage is unavailable.
  }
}

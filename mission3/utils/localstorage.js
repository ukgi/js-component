export function getSearchHistory(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export function setSearchHistory(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert('스토리지의 용량이 부족합니다...');
  }
}

export function getItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert('스토리지 용량이 부족합니다...😂');
  }
}

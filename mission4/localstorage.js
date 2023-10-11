export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    alert('웹스토리지 저장에 문제가 생겼습니다...😢');
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (err) {
    return defaultValue;
  }
};

import searchBand from '../api/searchBand.js';

export default async function searchHandler(
  keyword,
  setState,
  setErrorMessage
) {
  try {
    const data = await searchBand(keyword);
    if (!Array.isArray(data))
      throw new Error('정확한 공연이름을 입력해주세요...');
    setState(data);
  } catch (error) {
    setErrorMessage(error.message);
  }
}

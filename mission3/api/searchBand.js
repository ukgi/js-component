export default async function searchBand(keyword) {
  const response = await fetch(`서버API주소?keyword=${keyword}`);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  // console.log(JSON.stringify(data, null, 2));
  return data;
}

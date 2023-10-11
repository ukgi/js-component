const errorMessage = {
  ERROR_NOT_DATATYPE: '데이터가 올바르게 들어오지 않았습니다',
  ERROR_NOT_ARRAY: '데이터가 배열 형태가 아닙니다.',
  ERROR_DATA_TEXTTYPE: '데이터의 내용에 문제가 있습니다.',
};
Object.freeze(errorMessage);

export default function validateData(data) {
  const { ERROR_NOT_DATATYPE, ERROR_NOT_ARRAY, ERROR_DATA_TEXTTYPE } =
    errorMessage;
  if (data === null || data === undefined) throw new Error(ERROR_NOT_DATATYPE);
  else if (!Array.isArray(data)) throw new Error(ERROR_NOT_ARRAY);
  else if (
    data.length > 0 &&
    !data.every(
      (d) =>
        d.hasOwnProperty('text') &&
        typeof d.text === 'string' &&
        d.text !== '' &&
        d.isCompleted !== undefined &&
        typeof d.isCompleted === 'boolean'
    )
  )
    throw new Error(ERROR_DATA_TEXTTYPE);
  else return data;
}

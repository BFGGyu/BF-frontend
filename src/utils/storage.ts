// 만료 시간과 함께 데이터를 저장
export const setItemWithExpireTime = (key: string, value: string) => {
  const obj = {
    value: value,
    expire: Date.now() + 300000
  };
  const objString = JSON.stringify(obj);
  localStorage.setItem(key, objString);
};

// 만료 시간을 체크하며 데이터 읽기
export const getItemWithExpireTime = (key: string) => {
  const objString = window.localStorage.getItem(key);

  if (!objString) return null;

  const obj = JSON.parse(objString);
  if (Date.now() > obj.expire) {
    window.localStorage.removeItem(key);
    return null;
  }

  return obj.value;
};

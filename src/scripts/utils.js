function checkResponse(res) {
  if (res.ok) return res.json();
  else return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
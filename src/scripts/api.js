import { request } from './utils.js';

// Объект конфигурации API

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "1ee876fb-5d04-4875-b5e4-b8f466cf967d",
    "Content-Type": "application/json",
  },
};

// Получить последние 30 карточек с сервера

function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

// Получить объект данных пользователя

function getProfileData() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

// Добавить новую карточку на сервер

function addNewCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
}

// Обновить данные профиля

function updateProfileData(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

// Удалить карточку из пула

function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Добавить лайк карточке

function addLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// Убрать лайк с карточки

function removeLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Редактировать аватар профиля

function updateAvatar(url) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
}

export {
  getInitialCards,
  getProfileData,
  addNewCard,
  updateProfileData,
  deleteCard,
  addLike,
  removeLike,
  updateAvatar,
};

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

const createCard = function (title, img, removeCard) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(".card__title").textContent = title;
  card.querySelector(".card__image").src = img;
  card.querySelector(".card__image").alt = `${title} на фотографии`;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);

  return card;
};

// @todo: Функция удаления карточки

function removeCard() {
  this.closest(".card").remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((place) => {
  cardList.append(createCard(place.name, place.link, removeCard));
});

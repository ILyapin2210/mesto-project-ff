// Функция создания карточки

function createCard(
  cardTemplate,
  title,
  img,
  removeCard,
  showPopupImage,
  handleLike,
  imgPopup
) {
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = title;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = img;
  cardImage.alt = `${title} на фотографии`;
  cardImage.addEventListener("click", showPopupImage(img, title, imgPopup));

  const likeBtn = card.querySelector(".card__like-button");
  likeBtn.addEventListener("click", handleLike);

  const deleteBtn = card.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", removeCard);

  return card;
}

// Функция добавления лайка

function handleLike() {
  this.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки

function removeCard() {
  this.closest(".card").remove();
}

export { createCard, handleLike, removeCard };

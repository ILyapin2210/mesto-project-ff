import { deleteCard, addLike, removeLike } from "./api.js";

// Функция создания карточки

function createCard(
  cardTemplate,
  cardData,
  userId,
  removeCard,
  showPopupImage,
  handleLike,
  imgPopup
) {
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const cardImage = card.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = `${cardData.name} на фотографии`;

  cardImage.addEventListener(
    "click",
    showPopupImage(cardData.link, cardData.name, imgPopup)
  );

  const cardLikesCounter = card.querySelector(".card__like-counter");
  cardLikesCounter.textContent = cardData.likes.length;

  const cardLikeBtn = card.querySelector(".card__like-button");

  // Проверим, нет ли в массиве лайкнувших пользователей нашего юзера

  let isLiked = cardData.likes.some((like) => {
    return like._id === userId;
  });

  if (isLiked) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  const likeBtn = card.querySelector(".card__like-button");

  // Обновим счётчик лайков и изменим состояние

  likeBtn.addEventListener("click", () => {
    handleLike(likeBtn, isLiked, cardData._id, cardLikesCounter);
    isLiked = !isLiked;
  });

  const deleteBtn = card.querySelector(".card__delete-button");

  // Проверим, доступна ли текущему пользователю кнопка удаления

  if (cardData.owner._id === userId) {
    deleteBtn.classList.add("card__delete-button_is-active");
  }

  deleteBtn.addEventListener("click", (e) => {
    removeCard(deleteBtn, cardData._id);
  });

  return card;
}

// Обработать клик по кнопке лайка

function handleLike(likeBtn, isLiked, cardId, cardLikesCounter) {
  if (!isLiked) {
    addLike(cardId)
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardId)
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция удаления карточки

function removeCard(deleteBtn, cardId) {
  deleteCard(cardId)
    .then(() => {
      deleteBtn.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, handleLike, removeCard };

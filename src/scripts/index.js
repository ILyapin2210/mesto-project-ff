import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLike, removeCard } from "./card.js";
import { showPopup, closePopup } from "./modal.js";

// DOM узлы

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// Список карточек

const cardsContainer = document.querySelector(".places__list");

// Кнопки

const editProfileBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const closeBtns = document.querySelectorAll(".popup__close");

// Попапы

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");

// Показать попап с картинкой

function showPopupImage(img, title, popup) {
  return () => {
    showPopup(popup);
    popup.querySelector(".popup__image").src = img;
    popup.querySelector(".popup__image").alt = `${title} на фотографии`;
    popup.querySelector(".popup__caption").textContent = title;
  };
}

// Узлы профиля пользователя

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Узлы формы редактирования профиля

const editProfileForm = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);

// Обработчик формы редактирования профиля

function handleEditProfileSubmit(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// Узлы формы добавления карточки

const addCardForm = addCardPopup.querySelector(".popup__form");
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

// Обработчик формы добавления карточки

function handleAddCardSubmit(e) {
  e.preventDefault();

  cardsContainer.prepend(
    createCard(
      cardTemplate,
      placeInput.value,
      linkInput.value,
      removeCard,
      showPopupImage,
      handleLike,
      imgPopup
    )
  );

  e.target.reset();
  e.target.reset();

  closePopup();
}

// Слушатели событий

closeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    closePopup();
  });
});

editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  showPopup(editProfilePopup);
});
addCardBtn.addEventListener("click", () => {
  showPopup(addCardPopup);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Вывести карточки на страницу

initialCards.forEach((place) => {
  cardsContainer.append(
    createCard(
      cardTemplate,
      place.name,
      place.link,
      removeCard,
      showPopupImage,
      handleLike,
      imgPopup
    )
  );
});

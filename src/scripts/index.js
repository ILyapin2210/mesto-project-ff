import "../pages/index.css";
import { createCard, handleLike, removeCard } from "./card.js";
import { showPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getProfileData,
  addNewCard,
  updateProfileData,
  updateAvatar,
} from "./api.js";

// Объект конфигурации для валидации

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  inactiveButtonClass: "popup__button_disabled",
};

let userId = ""; // Сюда получим идентификатор нашего пользователя из функции инициализации карточек

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
const editProfileImgPopup = document.querySelector(".popup_type_edit-avatar");

// Узел аватара

const profileImg = document.querySelector(".profile__image");

// Узлы формы редактирования аватара

const avatarForm = editProfileImgPopup.querySelector(".popup__form");
const avatarInput = editProfileImgPopup.querySelector(
  ".popup__input_type_avatar"
);

profileImg.addEventListener("click", () => {
  showPopup(editProfileImgPopup);
});

// Обработчик формы редактирования аватара

function handleAvatarSubmit(e) {
  e.preventDefault();

  let url = avatarInput.value;

  const formBtn = e.target.querySelector(".button");
  formBtn.textContent = "Сохранение...";

  updateAvatar(url)
    .then((data) => {
      profileImg.style.backgroundImage = `url(${data.avatar})`;
    })
    .finally(() => {
      formBtn.textContent = "Сохранить";
    });

  closePopup();
}

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault()
  handleAvatarSubmit();
});

// Слушатели событий на кнопки

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup();
  });
});

editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(editProfilePopup, validationConfig);

  showPopup(editProfilePopup);
});

addCardBtn.addEventListener("click", () => {
  placeInput.value = "";
  linkInput.value = "";

  clearValidation(addCardPopup, validationConfig);

  showPopup(addCardPopup);
});

// Узлы профиля пользователя

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Узлы формы редактирования профиля

const editProfileForm = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);

// Инициализируем профиль пользователя

function setProfileData() {
  getProfileData().then((profileData) => {
    profileName.textContent = profileData.name;
    profileJob.textContent = profileData.about;
    profileImg.style.backgroundImage = `url(${profileData.avatar})`;
  });
}

setProfileData();

// Обработчик формы редактирования профиля

function handleEditProfileSubmit(e) {
  e.preventDefault();

  const formBtn = e.target.querySelector(".button");
  formBtn.textContent = "Сохранение...";

  updateProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
    })
    .finally(() => {
      formBtn.textContent = "Сохранить";
    });

  closePopup();
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Узлы формы добавления карточки

const addCardForm = addCardPopup.querySelector(".popup__form");
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

// Показать попап с картинкой

function showPopupImage(img, title, popup) {
  return () => {
    popup.querySelector(".popup__image").src = img;
    popup.querySelector(".popup__image").alt = `${title} на фотографии`;
    popup.querySelector(".popup__caption").textContent = title;
    showPopup(popup);
  };
}

// Обработчик формы добавления карточки

function handleAddCardSubmit(e) {
  e.preventDefault();

  let cardName = placeInput.value;
  let cardLink = linkInput.value;

  const formBtn = e.target.querySelector(".button");
  formBtn.textContent = "Сохранение...";

  addNewCard(cardName, cardLink)
    .then((cardData) => {
      cardsContainer.prepend(
        createCard(
          cardTemplate,
          cardData,
          userId,
          removeCard,
          showPopupImage,
          handleLike,
          imgPopup
        )
      );
    })
    .finally(() => {
      formBtn.textContent = "Сохранить";
    });

  e.target.reset();

  closePopup();
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

// Инициализируем карточки

function setInitialCards() {
  Promise.all([getInitialCards(), getProfileData()]).then(
    ([cards, profileData]) => {
      userId = profileData._id;
      cards.forEach((cardInfo) => {
        cardsContainer.append(
          createCard(
            cardTemplate,
            cardInfo,
            userId,
            removeCard,
            showPopupImage,
            handleLike,
            imgPopup
          )
        );
      });
    }
  );
}

setInitialCards();

// Подключить валидацию

enableValidation(validationConfig);

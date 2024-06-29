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
  clearValidation(editProfileImgPopup, validationConfig);
  editProfileImgPopup.querySelector('.popup__form').reset();
  showPopup(editProfileImgPopup);
});

// Обработчик формы редактирования аватара

function handleAvatarSubmit(e) {
  e.preventDefault();

  const url = avatarInput.value;

  e.submitter.textContent = "Сохранение...";

  updateAvatar(url)
    .then((data) => {
      profileImg.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = "Сохранить";
    });
}

avatarForm.addEventListener("submit", (e) => {
  handleAvatarSubmit(e);
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

  clearValidation(addCardPopup, validationConfig);

  addCardPopup.querySelector('.popup__form').reset();

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
  getProfileData()
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileJob.textContent = profileData.about;
      profileImg.style.backgroundImage = `url(${profileData.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    });
}

setProfileData();

// Обработчик формы редактирования профиля

function handleEditProfileSubmit(e) {
  e.preventDefault();

  e.submitter.textContent = "Сохранение...";

  updateProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
    })
    .then(() => {
      closePopup();
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = "Сохранить";
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Узлы формы добавления карточки

const addCardForm = addCardPopup.querySelector(".popup__form");
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

// Показать попап с картинкой

const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function showPopupImage(img, title, popup) {
  return () => {
    popupImg.src = img;
    popupImg.alt = `${title} на фотографии`;
    popupCaption.textContent = title;
    showPopup(popup);
  };
}

// Обработчик формы добавления карточки

function handleAddCardSubmit(e) {
  e.preventDefault();

  const cardName = placeInput.value;
  const cardLink = linkInput.value;

  e.submitter.textContent = "Сохранение...";

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
    .then(() => {
      closePopup();
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = "Сохранить";
    });

}

addCardForm.addEventListener("submit", handleAddCardSubmit);

// Инициализируем карточки

function setInitialCards() {
  Promise.all([getInitialCards(), getProfileData()])
    .then(([cards, profileData]) => {
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
    })
    .catch((err) => {
      console.log(err);
    });
}

setInitialCards();

// Подключить валидацию

enableValidation(validationConfig);

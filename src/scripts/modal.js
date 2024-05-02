// показать попап

function showPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", quitOnEsc);
  popup.addEventListener("click", quitOnOverlayClick);
}

// Показать попап с картинкой

function showPopupImage(img, title, imgPopup) {
  return () => {
    showPopup(imgPopup);
    imgPopup.querySelector(".popup__image").src = img;
    imgPopup.querySelector(".popup__caption").textContent = title;
  };
}

// скрыть попап по нажатию на кнопку

function closePopup() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
  document.removeEventListener("keydown", quitOnEsc);
}

// Скрыть попап по нажатию клавишу Esc

function quitOnEsc(e) {
  if (e.key == "Escape") {
    closePopup();
    document.removeEventListener("keydown", quitOnEsc);
  }
}

// скрыть попап по нажатию на оверлей

function quitOnOverlayClick(e) {
  if (e.target.classList.contains("popup")) {
    closePopup();
  }
}

export { showPopup, closePopup, showPopupImage };

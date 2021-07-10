const page = document.querySelector('.page')
const popup = page.querySelector('.popup')
const buttonProfileEdit = page.querySelector('.profile__edit-button')
const popupButtonClose = page.querySelector('.popup__form-close')
const formElement = page.querySelector('.popup__form')
const inputName = popup.querySelector('#name')
const inputJob = popup.querySelector('#job')
const elements = page.querySelector('.elements')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpened() {
  popup.classList.add('popup_opened')
  inputName.value = page.querySelector('.profile__name').textContent
  inputJob.value = page.querySelector('.profile__job').textContent
}

function popupClose() {
  popup.classList.remove('popup_opened')
  page.querySelector('.profile__name').textContent = inputName.value
  page.querySelector('.profile__job').textContent = inputJob.value
}

buttonProfileEdit.addEventListener('click', () => {
  popupOpened()
}, false);

popupButtonClose.addEventListener('click', () => {
  popupClose()
}, false);

popup.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    popupClose()
  }
})

document.addEventListener('keydown', (event) => {
  if (event.code === "Escape") {
    popupClose()
  }
})

function formSubmitHandler (evt) {
  evt.preventDefault();
  popupClose()
}

formElement.addEventListener('submit', formSubmitHandler);

function preRenderCards() {
  initialCards.forEach(element => {
    const cardTemplate = document.querySelector('#card').content
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
    cardElement.querySelector('.element__pic').setAttribute('src', element['link'])
    cardElement.querySelector('.element__pic').setAttribute('alt', element['name'])
    cardElement.querySelector('.element__name').textContent =  element['name']
    elements.append(cardElement)
  });
}

document.addEventListener('DOMContentLoaded', preRenderCards())

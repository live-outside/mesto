const page = document.querySelector('.page')
const popup = page.querySelector('.popup')
const popupCard = page.querySelector('.popup-card')
const buttonProfileEdit = page.querySelector('.profile__edit-button')
const buttonProfileAdd = page.querySelector('.profile__add-button')
const popupButtonClose = page.querySelector('.popup__form-close')
const popupCardButtonClose = page.querySelector('.popup-card__form-close')
const formElement = page.querySelector('.popup__form')
const cardForm = page.querySelector('.popup-card__form')
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
  //точечно применяем закрытие попапа. Фиксит очистку профиля
  if (event.code === "Escape" && popup.classList.contains('popup_opened')) {
    popupClose()
  } else if (event.code === "Escape" && popupCard.classList.contains('popup-card_opened')) {
    popupCardClose()
  }
})

function popupCardOpened() {
  popupCard.classList.add('popup-card_opened')
}

function popupCardClose() {
  popupCard.classList.remove('popup-card_opened')
  popupCard.querySelector('#place-link').value = ''
  popupCard.querySelector('#place-name').value = ''
}

buttonProfileAdd.addEventListener('click', () => {
  popupCardOpened()
}, false);

popupCardButtonClose.addEventListener('click', () => {
  popupCardClose()
}, false);

popupCard.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    popupCardClose()
  }
})

function formSubmitHandler (evt) {
  evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
      popupClose()
    } else if (evt.target.classList.contains('popup-card__form')) {
      addNewCard()
      popupCardClose()
    }
}

cardForm.addEventListener('submit', formSubmitHandler )
formElement.addEventListener('submit', formSubmitHandler);


function addNewCard() {
  const cardTemplate = document.querySelector('#card').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  cardElement.querySelector('.element__pic').setAttribute('src', popupCard.querySelector('#place-link').value)
  cardElement.querySelector('.element__pic').setAttribute('alt', popupCard.querySelector('#place-name').value)
  cardElement.querySelector('.element__name').textContent = popupCard.querySelector('#place-name').value
  elements.prepend(cardElement)
}

elements.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__like')) {
    event.target.classList.contains('element__like_active') ?
    event.target.classList.remove('element__like_active') :
    event.target.classList.add('element__like_active')
  }
})

elements.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__delete')) {
    event.target.parentNode.remove()
  }
})

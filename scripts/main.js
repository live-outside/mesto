const page = document.querySelector('.page')
const popupProfile = page.querySelector('.popup')
const popupCard = page.querySelector('.popup-card')
const popupPicture = page.querySelector('.popup-picture')
const buttonProfileEdit = page.querySelector('.profile__edit-button')
const buttonProfileAdd = page.querySelector('.profile__add-button')
const popupButtonClose = page.querySelector('.popup__form-close')
const popupPictureClose = document.querySelector('.popup-picture__button-close')
const popupCardButtonClose = page.querySelector('.popup-card__form-close')
const formProfile = page.querySelector('.popup__form')
const formCard = page.querySelector('.popup-card__form')
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
// функции открытия и закрытия попапов и очистка полей формы
function popupOpened(popup) {
  popup.classList.add('popup_opened')
}

function popupClose(popup) {
  popup.classList.remove('popup_opened')
}

function resetInputInForm(form){
  form.reset()
}
//

// Редактирование профиля
buttonProfileEdit.addEventListener('click', () => {
  popupProfile.querySelector('#name').value = page.querySelector('.profile__name').textContent
  popupProfile.querySelector('#job').value = page.querySelector('.profile__job').textContent
  popupOpened(popupProfile)
})

// Закрытие попапа по кнопке
popupButtonClose.addEventListener('click', () => {
  popupClose(popupProfile)
})

// Закрытие попапа по  клику вне попапа
popupProfile.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    popupClose(popupProfile)
  }
})

//слушатель на открытие попапа создания новой карточки
buttonProfileAdd.addEventListener('click', () => {
  popupOpened(popupCard)
})

//закрытие попапа по кнопке
popupCardButtonClose.addEventListener('click', () => {
  popupClose(popupCard)
})

// закрытие попапа вне области попапа
popupCard.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    popupClose(popupCard)
  }
})

//Функция добавления новой карточки
function prependCard(container, cardElement) {
  container.prepend(cardElement)
}

//инициализациия карточки и навешивание слушателей
function addCard(name, link) {
  const cardTemplate = document.querySelector('#card').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
    cardElement.querySelector('.element__pic').setAttribute('src', link)
    cardElement.querySelector('.element__pic').setAttribute('alt', name)
    cardElement.querySelector('.element__name').textContent = name

  const cardElementPic = cardElement.querySelector('.element__pic')
    cardElementPic.addEventListener('click', () => {
      popupPicture.querySelector('.popup-picture__pic').setAttribute('src', link)
      popupPicture.querySelector('.popup-picture__pic').setAttribute('alt', name)
      popupPicture.querySelector('.popup-picture__name').textContent = name
      popupOpened(popupPicture)
  })

  popupPictureClose.addEventListener('click', () => {
    popupClose(popupPicture)
  })

  popupPicture.addEventListener('click', (evt) => {
    if  (evt.target === evt.currentTarget) {
      popupClose(popupPicture)
    }
  })

  const deleteButton = cardElement.querySelector('.element__delete')
    deleteButton.addEventListener('click', (evt) => {
        evt.target.parentNode.remove()
  })

  const likeButton = cardElement.querySelector('.element__like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active')
  })
  return cardElement
}

//меняем стандартное поведение формы для отладки
function formSubmitHandler(evt) {
  evt.preventDefault();
}

formProfile.addEventListener('submit', (evt) => {
  page.querySelector('.profile__name').textContent = popupProfile.querySelector('#name').value
  page.querySelector('.profile__job').textContent = popupProfile.querySelector('#job').value
  popupClose(popupProfile)
  formSubmitHandler(evt)
});

formCard.addEventListener('submit', (evt) => {
  const name = page.querySelector('#place-name').value
  const link = page.querySelector('#place-link').value
  prependCard(elements, addCard(name, link))
  resetInputInForm(formCard)
  popupClose(popupCard)
  formSubmitHandler(evt)
})

//функция добавление карточек из массива при загрузке страницы
function createCards() {
  initialCards.forEach(element => {
    prependCard(elements, addCard(element.name, element.link))
    })
  }

document.addEventListener('DOMContentLoaded', createCards())

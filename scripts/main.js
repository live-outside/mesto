const page = document.querySelector('.page')
let popup = page.querySelector('.popup')
const popupCard = page.querySelector('.popup-card')
const popupPicture = page.querySelector('.popup-picture')
const buttonProfileEdit = page.querySelector('.profile__edit-button')
const buttonProfileAdd = page.querySelector('.profile__add-button')
const popupButtonClose = page.querySelector('.popup__form-close')
const popupPictureClose = document.querySelector('.popup-picture__button-close')
const popupCardButtonClose = page.querySelector('.popup-card__form-close')
const formElement = page.querySelector('.popup__form')
const cardForm = page.querySelector('.popup-card__form')
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
  let popup = page.querySelector('.popup')
  popup.querySelector('#name').value = page.querySelector('.profile__name').textContent
  popup.querySelector('#job').value = page.querySelector('.profile__job').textContent
  popupOpened(popup)
}, false);

// Закрытие попапа по кнопке
popupButtonClose.addEventListener('click', () => {
  let popup = page.querySelector('.popup')
  popupClose(popup)
}, false);

// Закрытие попапа по  клику вне попапа
popup.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    popupClose(popup)
  }
})

//слушатель на открытие попапа создания новой карточки
buttonProfileAdd.addEventListener('click', () => {
  let popup = page.querySelector('.popup-card')
  popupOpened(popup)
}, false);

//закрытие попапа по кнопке
popupCardButtonClose.addEventListener('click', () => {
  let popup = page.querySelector('.popup-card')
  popupClose(popup)
}, false);

// закрытие попапа вне области попапа
popupCard.addEventListener('click', (event) => {
  if  (event.target === event.currentTarget) {
    let popup = page.querySelector('.popup-card')
    popupClose(popup)
  }
})

//Функция добавления новой карточки
function addNewCard(container, cardElement) {
  container.prepend(cardElement)
}

//инициализациия карточки и навешивание слушателей
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card').content
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
    cardElement.querySelector('.element__pic').setAttribute('src', link)
    cardElement.querySelector('.element__pic').setAttribute('alt', name)
    cardElement.querySelector('.element__name').textContent = name

  const cardElementPic = cardElement.querySelector('.element__pic')
    cardElementPic.addEventListener('click', (p) => {
      popupPicture.querySelector('.popup-picture__pic').setAttribute('src', p.target.getAttribute('src'))
      popupPicture.querySelector('.popup-picture__pic').setAttribute('alt', p.target.getAttribute('alt'))
      popupPicture.querySelector('.popup-picture__name').textContent = p.target.getAttribute('alt')
      popupOpened(popupPicture)
  })

  popupPictureClose.addEventListener('click', () => {
    popupClose(popupPicture)
  })

  popupPicture.addEventListener('click', (event) => {
    if  (event.target === event.currentTarget) {
      popupClose(popupPicture)
    }
  })

  const deleteButton = cardElement.querySelector('.element__delete')
    deleteButton.addEventListener('click', (d) => {
        d.target.parentNode.remove()
  })

  const likeButton = cardElement.querySelector('.element__like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active')
  })

return cardElement;
}

// обработчик форм.
function formSubmitHandler (evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('popup__form')) {
  page.querySelector('.profile__name').textContent = popup.querySelector('#name').value
  page.querySelector('.profile__job').textContent = popup.querySelector('#job').value
  popupClose(popup)
  } else if (evt.target.classList.contains('popup-card__form')) {
    let popup = page.querySelector('.popup-card')
    let name = page.querySelector('#place-name').value
    let link = page.querySelector('#place-link').value
    addNewCard(elements, createCard(name, link))
    resetInputInForm(cardForm)
    popupClose(popup)
  }
}

//отправляем успех в обработку
cardForm.addEventListener('submit', formSubmitHandler )
formElement.addEventListener('submit', formSubmitHandler);

//функция добавление карточек из массива при загрузке страницы
function preRenderCards() {
  initialCards.forEach(element => {
    const cardTemplate = document.querySelector('#card').content
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
    cardElement.querySelector('.element__pic').setAttribute('src', element['link'])
    cardElement.querySelector('.element__pic').setAttribute('alt', element['name'])
    cardElement.querySelector('.element__name').textContent =  element['name']

    const cardElementPic = cardElement.querySelector('.element__pic')
      cardElementPic.addEventListener('click', (p) => {
        popupPicture.querySelector('.popup-picture__pic').setAttribute('src', p.target.getAttribute('src'))
        popupPicture.querySelector('.popup-picture__pic').setAttribute('alt', p.target.getAttribute('alt'))
        popupPicture.querySelector('.popup-picture__name').textContent = p.target.getAttribute('alt')
        popupOpened(popupPicture)
    })

    popupPictureClose.addEventListener('click', () => {
      popupClose(popupPicture)
    })

    popupPicture.addEventListener('click', (event) => {
      if  (event.target === event.currentTarget) {
        popupClose(popupPicture)
      }
    })

    const deleteButton = cardElement.querySelector('.element__delete')
    deleteButton.addEventListener('click', (d) => {
        d.target.parentNode.remove()
    })

    const likeButton = cardElement.querySelector('.element__like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active')
    })

    elements.append(cardElement)
  });
}

document.addEventListener('DOMContentLoaded', preRenderCards())

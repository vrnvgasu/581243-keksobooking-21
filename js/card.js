'use strict';
const HIDDEN_CLASS = `visually-hidden`;
const BUILD_TYPES = {
  palace: {
    translation: `Дворец`,
    price: 10000,
  },
  flat: {
    translation: `Квартира`,
    price: 1000,
  },
  house: {
    translation: `Дом`,
    price: 5000,
  },
  bungalow: {
    translation: `Бунгало`,
    price: 0,
  },
};
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const cardArticleTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const hideElement = (element) => {
  element.classList.add(HIDDEN_CLASS);
};

const createElement = (advert) => {
  const template = cardArticleTemplate.cloneNode(true);
  const featureItem = template.querySelector(`.popup__feature`);
  const featureList = template.querySelector(`.popup__features`);
  const photoItem = template.querySelector(`.popup__photo`);
  const photoList = template.querySelector(`.popup__photos`);
  const avatar = template.querySelector(`.popup__avatar`);

  template.querySelector(`.popup__title`).textContent = advert.offer.title;
  template.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  template.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
  template.querySelector(`.popup__type`).textContent = BUILD_TYPES[advert.offer.type].translation;
  template.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комната(ы) для ${advert.offer.guests} гостей`;
  template.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  template.querySelector(`.popup__description`).textContent = advert.offer.description;
  avatar.src = advert.author.avatar;

  featureList.textContent = ``;
  advert.offer.features.forEach((feature) => {
    let newFeatureItem = featureItem.cloneNode();
    newFeatureItem.className = `popup__feature`;
    newFeatureItem.classList.add(`popup__feature--${feature}`);

    featureList.appendChild(newFeatureItem);
  });

  photoList.textContent = ``;
  advert.offer.photos.forEach((photo) => {
    let newPhotoItem = photoItem.cloneNode();
    newPhotoItem.src = photo;

    photoList.appendChild(newPhotoItem);
  });

  if (!advert.author.avatar) {
    hideElement(avatar);
  }

  return template;
};

const onPopupCloseClick = () => {
  deleteElements();
};

const deleteElements = () => {
  const card = window.map.mainMapElement.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};

const addElementToDOM = (advert) => {
  deleteElements();
  const card = createElement(advert);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, card);

  const popupCloseElement = card.querySelector(`.popup__close`);
  popupCloseElement.addEventListener(`click`, onPopupCloseClick);
};

window.card = {
  BUILD_TYPES,
  addElementToDOM,
  deleteElements,
};

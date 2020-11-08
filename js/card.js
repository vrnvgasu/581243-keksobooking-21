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

let hideElement = (element) => {
  element.classList.add(HIDDEN_CLASS);
};

let createCartElement = (advert) => {
  let template = cardArticleTemplate.cloneNode(true);
  let featureItem = template.querySelector(`.popup__feature`);
  let featureList = template.querySelector(`.popup__features`);
  let photoItem = template.querySelector(`.popup__photo`);
  let photoList = template.querySelector(`.popup__photos`);
  let title = template.querySelector(`.popup__title`);
  let address = template.querySelector(`.popup__text--address`);
  let price = template.querySelector(`.popup__text--price`);
  let type = template.querySelector(`.popup__type`);
  let capacity = template.querySelector(`.popup__text--capacity`);
  let time = template.querySelector(`.popup__text--time`);
  let description = template.querySelector(`.popup__description`);
  let avatar = template.querySelector(`.popup__avatar`);

  title.textContent = advert.offer.title;
  address.textContent = advert.offer.address;
  price.textContent = `${advert.offer.price}₽/ночь`;
  type.textContent = BUILD_TYPES[advert.offer.type].translation;
  capacity.textContent = `${advert.offer.rooms} комната(ы) для ${advert.offer.guests} гостей`;
  time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  description.textContent = advert.offer.description;
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

let onPopupCloseClick = () => {
  deleteCardElements();
};

let deleteCardElements = () => {
  let card = window.map.mainMapElement.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }
};

let addCartElementToDOM = (advert) => {
  deleteCardElements();
  let card = createCartElement(advert);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, card);

  let popupCloseElement = card.querySelector(`.popup__close`);
  popupCloseElement.addEventListener(`click`, onPopupCloseClick);
};

window.card = {
  BUILD_TYPES,
  addCartElementToDOM,
  deleteCardElements,
};

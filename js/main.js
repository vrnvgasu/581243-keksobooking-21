'use strict';

const BUILD_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const MAP_CLASS = `map__pins`;
const MAP_FILTERS_CONTAINER = `map__filters-container`;
const HIDDEN_CLASS = `visually-hidden`;
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const ADVERTS_COUNT = 8;
const mapWidth = document.querySelector(`.` + MAP_CLASS).offsetWidth;

let getRandomFromArray = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

let getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

let getRandomArrayPart = (arr) => {
  let randomItems = arr.concat();

  let newArrayLength = arr.length - getRandomInteger(0, arr.length - 1);
  for (let i = 0; i < (arr.length - newArrayLength); i++) {
    randomItems.splice(getRandomInteger(0, randomItems.length - 1), 1);
  }

  return randomItems;
};

let getBuildTypeTranslation = (type) => {
  switch (type) {
    case `palace`: return `Дворец`;
    case `flat`: return `Квартира`;
    case `house`: return `Дом`;
    case `bungalow`: return `Бунгало`;
    default: return null;
  }
};

let hiddenElement = (element, hidden) => {
  if (hidden) {
    element.classList.add(HIDDEN_CLASS);
  }
};

let createCartElement = (advert) => {
  let template = document.querySelector(`#card`).content.querySelector(`.map__card`).cloneNode(true);
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
  hiddenElement(title, !advert.offer.title);
  address.textContent = advert.offer.address;
  hiddenElement(address, !advert.offer.address);
  price.textContent = `${advert.offer.price}₽/ночь`;
  hiddenElement(price, !advert.offer.price);
  type.textContent = getBuildTypeTranslation(advert.offer.type);
  hiddenElement(type, !advert.offer.type);
  capacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  hiddenElement(type, !advert.offer.rooms || !advert.offer.guests);
  time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  hiddenElement(type, !advert.offer.checkin || !advert.offer.checkout);

  featureList.textContent = ``;
  advert.offer.features.forEach((feature) => {
    let newFeatureItem = featureItem.cloneNode();
    newFeatureItem.className = `popup__feature`;
    newFeatureItem.classList.add(`popup__feature--` + feature);

    featureList.appendChild(newFeatureItem);
  });
  hiddenElement(featureList, featureList.children.length === 0);

  description.textContent = advert.offer.description;
  photoList.textContent = ``;
  advert.offer.photos.forEach((photo) => {
    let newPhotoItem = photoItem.cloneNode();
    newPhotoItem.setAttribute(`src`, photo);

    photoList.appendChild(newPhotoItem);
  });
  hiddenElement(photoList, photoList.children.length === 0);

  avatar.setAttribute(`src`, advert.author.avatar);
  hiddenElement(avatar, !advert.author.avatar);

  return template;
};

let addCartElementToDOM = (advert) => {
  let cart = createCartElement(advert);
  let mapFiltersContainer = document.querySelector(`.` + MAP_FILTERS_CONTAINER);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, cart);
};

let createAdvert = (i) => {
  let type = getRandomFromArray(BUILD_TYPE);
  let guests = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  let price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  let location = {
    x: getRandomInteger(0, mapWidth),
    y: getRandomInteger(MIN_Y, MAX_Y),
  };

  return {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: `Сдается ${type}`,
      address: `${location.x}, ${location.x}`,
      price,
      type,
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomFromArray(CHECKIN),
      checkout: getRandomFromArray(CHECKOUT),
      features: getRandomArrayPart(FEATURES),
      description: `Сдается ${type} на ${guests} гостей за ${price}`,
      photos: getRandomArrayPart(PHOTOS),
    },
    location,
  };
};

let generateAdverts = () => {
  let result = [];

  for (let i = 0; i < ADVERTS_COUNT; i++) {
    let advert = createAdvert(i);
    result.push(advert);
  }

  return result;
};

let createPin = (advert, template) => {
  let pin = template.cloneNode(true);
  let img = pin.getElementsByTagName(`img`)[0];
  img.setAttribute(`src`, advert.author.avatar);
  img.setAttribute(`alt`, advert.offer.title);
  pin.setAttribute(`style`, `left: ${advert.location.x}px; top: ${advert.location.y}px`);

  return pin;
};

let createPins = (adverts) => {
  let fragment = document.createDocumentFragment();
  let template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  adverts.forEach((advert) => {
    fragment.appendChild(createPin(advert, template));
  });

  return fragment;
};

let addAdvertsToMap = (adverts) => {
  let fragment = createPins(adverts);
  document.querySelector(`.` + MAP_CLASS).appendChild(fragment);
};

let adverts = generateAdverts();

/**
 * Добавление объявлений на карту
 */
addAdvertsToMap(adverts);

/**
 * Выводим детальную информацию по первому объявлению на карту
 */
addCartElementToDOM(adverts[0]);

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
// const HIDDEN_CLASS = `visually-hidden`;
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_ROOMS = 1;
const MAX_ROOMS = 3;
const MAX_PRICE = 1000000;
const ADVERTS_COUNT = 8;

/**
 * Валидация
 */
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

/**
 * Размеры метки
 */
const MAP_PIN_WIDTH = 65;
const MAP_PIN_PASSIVE_HEIGHT = 65;
const MAP_PIN_ACTIVE_HEIGHT = 77;

// const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const map = document.querySelector(`.map__pins`);
// const cardArticle = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapWidth = map.offsetWidth;
const fieldsets = document.querySelectorAll(`fieldset`);
const mapPin = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);
const priceInput = document.querySelector(`#price`);
const timeinSelect = document.querySelector(`#timein`);
const timeoutSelect = document.querySelector(`#timeout`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const addForm = document.querySelector(`.ad-form`);
const typeInput = document.querySelector(`#type`);
const mainMap = document.querySelector(`.map`);

let getRandomFromArray = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

let getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

let getRandomArrayPart = (arr) => {
  let randomItems = arr.slice();
  let newArrayLength = arr.length - getRandomInteger(0, arr.length - 1);
  let lengthForRemove = arr.length - newArrayLength;

  for (let i = 0; i < lengthForRemove; i++) {
    randomItems.splice(getRandomInteger(0, randomItems.length - 1), 1);
  }

  return randomItems;
};

// let getBuildTypeTranslation = (type) => {
//   switch (type) {
//     case `palace`: return `Дворец`;
//     case `flat`: return `Квартира`;
//     case `house`: return `Дом`;
//     case `bungalow`: return `Бунгало`;
//     default: return null;
//   }
// };

// let hideElement = (element) => {
//   element.classList.add(HIDDEN_CLASS);
// };

// let createCartElement = (advert) => {
//   let template = cardArticle.cloneNode(true);
//   let featureItem = template.querySelector(`.popup__feature`);
//   let featureList = template.querySelector(`.popup__features`);
//   let photoItem = template.querySelector(`.popup__photo`);
//   let photoList = template.querySelector(`.popup__photos`);
//   let title = template.querySelector(`.popup__title`);
//   let address = template.querySelector(`.popup__text--address`);
//   let price = template.querySelector(`.popup__text--price`);
//   let type = template.querySelector(`.popup__type`);
//   let capacity = template.querySelector(`.popup__text--capacity`);
//   let time = template.querySelector(`.popup__text--time`);
//   let description = template.querySelector(`.popup__description`);
//   let avatar = template.querySelector(`.popup__avatar`);
//
//   title.textContent = advert.offer.title;
//   address.textContent = advert.offer.address;
//   price.textContent = `${advert.offer.price}₽/ночь`;
//   type.textContent = getBuildTypeTranslation(advert.offer.type);
//   capacity.textContent = `${advert.offer.rooms} комната(ы) для ${advert.offer.guests} гостей`;
//   time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
//   description.textContent = advert.offer.description;
//   avatar.setAttribute(`src`, advert.author.avatar);
//
//   featureList.textContent = ``;
//   advert.offer.features.forEach((feature) => {
//     let newFeatureItem = featureItem.cloneNode();
//     newFeatureItem.className = `popup__feature`;
//     newFeatureItem.classList.add(`popup__feature--${feature}`);
//
//     featureList.appendChild(newFeatureItem);
//   });
//
//   photoList.textContent = ``;
//   advert.offer.photos.forEach((photo) => {
//     let newPhotoItem = photoItem.cloneNode();
//     newPhotoItem.setAttribute(`src`, photo);
//
//     photoList.appendChild(newPhotoItem);
//   });
//
//   if (!advert.author.avatar) {
//     hideElement(avatar);
//   }
//
//   return template;
// };

// let addCartElementToDOM = (advert) => {
//   let cart = createCartElement(advert);
//   mapFiltersContainer.insertAdjacentElement(`beforebegin`, cart);
// };

let createAdvert = (i) => {
  let type = getRandomFromArray(BUILD_TYPE);
  let price = getRandomInteger(TYPE_MIN_PRICE[type], MAX_PRICE);
  let location = {
    x: getRandomInteger(0, mapWidth),
    y: getRandomInteger(MIN_Y, MAX_Y),
  };
  let rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  let guests = getRandomInteger(MIN_ROOMS, rooms);

  return {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: `Сдается ${type}`,
      address: `${location.x}, ${location.x}`,
      price,
      type,
      rooms,
      guests,
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

let createPin = (advert) => {
  let pin = mapPinTemplate.cloneNode(true);
  let img = pin.getElementsByTagName(`img`)[0];
  img.setAttribute(`src`, advert.author.avatar);
  img.setAttribute(`alt`, advert.offer.title);
  pin.setAttribute(`style`, `left: ${advert.location.x}px; top: ${advert.location.y}px`);

  return pin;
};

let createPins = (adverts) => {
  let fragment = document.createDocumentFragment();

  adverts.forEach((advert) => {
    fragment.appendChild(createPin(advert));
  });

  return fragment;
};

let addAdvertsToMap = (adverts) => {
  let fragment = createPins(adverts);
  map.appendChild(fragment);
};

let adverts = generateAdverts();

let blockFieldsets = () => {
  Array.from(fieldsets).forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

let activeFieldsets = () => {
  Array.from(fieldsets).forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

let setAddress = (x, y) => {
  addressInput.value = `${x}, ${y}`;
};

let setStartAddress = () => {
  let x = mapPin.offsetTop + MAP_PIN_PASSIVE_HEIGHT / 2;
  let y = mapPin.offsetLeft + MAP_PIN_WIDTH / 2;

  setAddress(x, y);
};

let validateFormPrice = (input) => {
  let price = input.value;
  let type = typeInput.value;

  if (price < Number(input.placeholder)) {
    input.setCustomValidity(`Минимальная цена для этого типа жилья ` + TYPE_MIN_PRICE[type]);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

let validateFormTitle = (input) => {
  let valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

let selectTypeHandler = (target) => {
  priceInput.placeholder = TYPE_MIN_PRICE[target.value];
  validateFormPrice(priceInput);
};

let selectTimeHandler = (value) => {
  timeinSelect.value = timeoutSelect.value = value;
};

let setValidityMessage = (select, capacityValue, roomValue) => {
  if (capacityValue > 0 && capacityValue > roomValue && roomValue !== 100) {
    select.setCustomValidity(`Гостей (${capacityValue}) больше, чем комнат (${roomValue})`);
  } else if (capacityValue === 0 && roomValue !== 100) {
    select.setCustomValidity(`Требуется 100 комнат.`);
  } else if (capacityValue !== 0 && roomValue === 100) {
    select.setCustomValidity(`Аренда не для гостей`);
  } else {
    select.setCustomValidity(``);
  }

  select.reportValidity();
};

let roomHandler = (select) => {
  let capacityValue = Number(capacitySelect.value);
  let roomValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(capacitySelect, capacityValue, roomValue);
};

let capacityHandler = (select) => {
  let roomValue = Number(roomNumberSelect.value);
  let capacityValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(roomNumberSelect, capacityValue, roomValue);
};

let onFormInput = (evt) => {
  if (evt.target.matches(`#title`)) {
    validateFormTitle(evt.target);
  } else if (evt.target.matches(`#price`)) {
    validateFormPrice(evt.target);
  }
};

let onFormChange = (evt) => {
  if (evt.target.matches(`#type`)) {
    selectTypeHandler(evt.target);
  } else if (evt.target.matches(`#timein`) || evt.target.matches(`#timeout`)) {
    selectTimeHandler(evt.target.value);
  } else if (evt.target.matches(`#room_number`)) {
    roomHandler(evt.target);
  } else if (evt.target.matches(`#capacity`)) {
    capacityHandler(evt.target);
  }
};

let addFormHandler = () => {
  addForm.addEventListener(`input`, onFormInput);
  addForm.addEventListener(`change`, onFormChange);
};

let onMapPinMousedown = (evt) => {
  if (evt.button !== 0) {
    return;
  }

  mainMap.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);
  activeFieldsets();
};

let onMapPinMouseup = () => {
  let x = mapPin.offsetTop + MAP_PIN_ACTIVE_HEIGHT / 2;
  let y = mapPin.offsetLeft + MAP_PIN_WIDTH / 2;

  setAddress(x, y);
};

let onMapPinKeydown = (evt) => {
  if (evt.keyCode !== 13) {
    return;
  }

  mainMap.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);
  activeFieldsets();
};

let mapPinHandler = () => {
  mapPin.addEventListener(`mousedown`, onMapPinMousedown);
  mapPin.addEventListener(`keydown`, onMapPinKeydown);
  mapPin.addEventListener(`mouseup`, onMapPinMouseup);
};

let setHandlers = () => {
  addFormHandler();
  mapPinHandler();
};

let blockAddress = () => {
  addressInput.readonly = true;
};

/**
 * Блокируем поле 'Адрес'
 */
blockAddress();

/**
 * Начальные координаты адреса
 */
setStartAddress();

/**
 * Блокируем интерактивные элементы
 */
blockFieldsets();

/**
 * Запускаем обработчики событий
 */
setHandlers();

/**
 * Добавление объявлений на карту
 */
addAdvertsToMap(adverts);

/**
 * Выводим детальную информацию по первому объявлению на карту
 */
// addCartElementToDOM(adverts[0]);

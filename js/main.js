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
      title: type,
      address: `${location.x}, ${location.x}`,
      price,
      type: `Сдается ${type}`,
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomFromArray(CHECKIN),
      checkout: getRandomFromArray(CHECKOUT),
      features: getRandomFromArray(FEATURES),
      description: `Сдается ${type} на ${guests} гостей за ${price}`,
      photos: getRandomFromArray(PHOTOS),
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

let createPins = () => {
  let adverts = generateAdverts();
  let fragment = document.createDocumentFragment();
  let template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  adverts.forEach((advert) => {
    fragment.appendChild(createPin(advert, template));
  });

  return fragment;
};

let addAdvertsToMap = () => {
  let fragment = createPins();
  document.querySelector(`.` + MAP_CLASS).appendChild(fragment);
};

/**
 * Добавление объявлений на карту
 */
addAdvertsToMap();

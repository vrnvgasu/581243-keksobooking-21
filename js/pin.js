'use strict';
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let deletePins = () => {
  let pins = window.map.mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

let createPin = (advert, i) => {
  let pin = mapPinTemplate.cloneNode(true);
  let img = pin.querySelector(`img`);
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pin.dataset.adverPosition = i;

  return pin;
};

let createPins = (adverts) => {
  let fragment = document.createDocumentFragment();

  adverts.forEach((advert, i) => {
    fragment.appendChild(createPin(advert, i));
  });

  return fragment;
};

window.pin = {
  createPin,
  createPins,
  deletePins,
};

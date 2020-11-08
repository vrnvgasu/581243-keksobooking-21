'use strict';
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const deleteAll = () => {
  const pins = window.map.pinElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

const create = (advert, i) => {
  const pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pin.dataset.adverPosition = i;

  return pin;
};

const createElements = (adverts) => {
  const fragment = document.createDocumentFragment();

  adverts.forEach((advert, i) => {
    fragment.appendChild(create(advert, i));
  });

  return fragment;
};

window.pin = {
  createElements,
  deleteAll,
};

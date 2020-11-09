'use strict';
const MAIN_PIN_TOP = 375;
const MAIN_PIN_LEFT = 570;
const PIN_WIDTH = 64;
const PIN_HEIGHT = 70;
const fieldsetElements = document.querySelectorAll(`fieldset`);
const addressInput = document.querySelector(`#address`);
const pinElement = document.querySelector(`.map__pins`);
const pinMainElement = document.querySelector(`.map__pin--main`);
const mainMapElement = document.querySelector(`.map`);
let interfaceActiveStatus = false;
let adverts = [];

const renderAdverts = () => {
  adverts = window.advert.loaded.slice();
  adverts = window.advert.filter(adverts);

  adverts = adverts.slice(0, 5);
  const fragment = window.pin.createElements(adverts);
  pinElement.appendChild(fragment);

  setPinHandlers();
};

const blockInterface = () => {
  setMapPinElementPosition(MAIN_PIN_TOP, MAIN_PIN_LEFT);
  setStartAddress();
  window.util.toggleDisabledElements(fieldsetElements, true);
  window.util.toggleDisabledElements(window.filter.selectElements, true);

  if (interfaceActiveStatus) {
    window.pin.deleteAll();
    window.card.deleteElements();
    mainMapElement.classList.add(`map--faded`);
    window.form.addFormElement.classList.add(`ad-form--disabled`);
    pinMainElement.addEventListener(`keydown`, onMapPinKeydown);
    document.removeEventListener(`click`, onPinClick);
    window.form.clear();
    window.filter.clear();
  }

  interfaceActiveStatus = false;
  setHandlers();
};

const setMapPinElementPosition = (top, left) => {
  pinMainElement.style.top = top + `px`;
  pinMainElement.style.left = left + `px`;
};

const activateInterface = () => {
  interfaceActiveStatus = true;
  setAddressForActiveMap();
  window.util.toggleDisabledElements(fieldsetElements, false);
  window.util.toggleDisabledElements(window.filter.selectElements, false);
  mainMapElement.classList.remove(`map--faded`);
  window.form.addFormElement.classList.remove(`ad-form--disabled`);

  if (window.advert.loaded.length === 0) {
    window.advert.generate();
  } else {
    renderAdverts();
  }

  pinMainElement.removeEventListener(`keydown`, onMapPinKeydown);
  pinMainElement.removeEventListener(`mousedown`, onMapPinMousedown);
};

const setAddress = (x, y) => {
  addressInput.value = `${x}, ${y}`;
};

let onMapPinMousedown = (evt) => {
  evt.preventDefault();
  if (evt.button !== 0) {
    return;
  }

  activateInterface();
};

const onMapPinKeydown = (evt) => {
  evt.preventDefault();
  if (evt.keyCode !== 13) {
    return;
  }

  activateInterface();
};

const setHandlers = () => {
  pinMainElement.addEventListener(`mousedown`, onMapPinMousedown);
  pinMainElement.addEventListener(`keydown`, onMapPinKeydown);
};

const setStartAddress = () => {
  const y = pinMainElement.offsetTop + PIN_HEIGHT / 2;
  const x = pinMainElement.offsetLeft + PIN_WIDTH / 2;
  setAddress(x, y);
};

const setAddressForActiveMap = () => {
  const y = pinMainElement.offsetTop;
  const x = pinMainElement.offsetLeft;
  setAddress(x + (PIN_WIDTH / 2), y + PIN_HEIGHT);
};

const onPinClick = (evt) => {
  const pinButton = evt.target.closest(`button`);

  if (!pinButton) {
    return;
  }

  if (pinButton.classList.contains(`map__pin`) && !pinButton.classList.contains(`map__pin--main`)) {
    const advert = adverts[pinButton.dataset.adverPosition];
    window.card.addElementToDOM(advert);
  }
};

const setPinHandlers = () => {
  document.addEventListener(`click`, onPinClick);
};

const setClearHandlers = () => {
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 27) {
      window.card.deleteElements();
      window.error.deleteElement();
      window.success.deleteElement();
    }
  });

  document.addEventListener(`mousedown`, () => {
    window.error.deleteElement();
    window.success.deleteElement();
  });
};

window.map = {
  PIN_WIDTH,
  PIN_HEIGHT,
  pinElement,
  pinMainElement,
  mainMapElement,
  setHandlers,
  renderAdverts,
  blockInterface,
  setClearHandlers,
  setAddress,
  setMapPinElementPosition,
};

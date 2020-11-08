'use strict';
const MAIN_PIT_TOP = 375;
const MAIN_PIT_LEFT = 570;
const MAP_PIN_WIDTH = 64;
const MAP_PIN_HEIGHT = 70;
const fieldsetElements = document.querySelectorAll(`fieldset`);
const mapFilterElements = document.querySelectorAll(`.map__filter`);
const addressInput = document.querySelector(`#address`);
const mapElement = document.querySelector(`.map__pins`);
const mapPinElement = document.querySelector(`.map__pin--main`);
const mainMapElement = document.querySelector(`.map`);
let interfaceActiveStatus = false;
let adverts = [];

let addAdvertsToMap = () => {
  adverts = window.advert.loadedAdverts.slice();
  adverts = window.advert.filterAdverts(adverts);

  adverts = adverts.slice(0, 5);
  let fragment = window.pin.createPins(adverts);
  mapElement.appendChild(fragment);

  addPinHandlers();
};

let blockInterface = () => {
  setMapPinElementPosition(MAIN_PIT_TOP, MAIN_PIT_LEFT);
  window.util.setReadonlyAtrToElement(addressInput);
  window.map.setStartAddress();
  window.util.setDisabledAtrToElements(fieldsetElements);
  window.util.setDisabledAtrToElements(mapFilterElements);

  if (interfaceActiveStatus) {
    window.pin.deletePins();
    window.card.deleteCardElements();
    mainMapElement.classList.add(`map--faded`);
    window.form.addFormElement.classList.add(`ad-form--disabled`);
    mapPinElement.addEventListener(`keydown`, onMapPinKeydown);
    document.removeEventListener(`click`, onPinClick);
    window.form.clearForm();
    window.filter.clearFilter();
  }

  interfaceActiveStatus = false;
  addMapPinHandlers();
};

let setMapPinElementPosition = (top, left) => {
  mapPinElement.style.top = top + `px`;
  mapPinElement.style.left = left + `px`;
};

let activateInterface = () => {
  interfaceActiveStatus = true;
  setAddressForActiveMap();
  window.util.deleteDisabledAtrFromElements(fieldsetElements);
  window.util.deleteDisabledAtrFromElements(mapFilterElements);
  mainMapElement.classList.remove(`map--faded`);
  window.form.addFormElement.classList.remove(`ad-form--disabled`);

  if (window.advert.loadedAdverts.length === 0) {
    window.advert.generateAdverts();
  } else {
    addAdvertsToMap();
  }

  mapPinElement.removeEventListener(`keydown`, onMapPinKeydown);
  mapPinElement.removeEventListener(`mousedown`, onMapPinMousedown);
};

let setAddress = (x, y) => {
  addressInput.value = `${x}, ${y}`;
};

let onMapPinMousedown = (evt) => {
  evt.preventDefault();
  if (evt.button !== 0) {
    return;
  }

  activateInterface();
};

let onMapPinKeydown = (evt) => {
  evt.preventDefault();
  if (evt.keyCode !== 13) {
    return;
  }

  activateInterface();
};

let addMapPinHandlers = () => {
  mapPinElement.addEventListener(`mousedown`, onMapPinMousedown);
  mapPinElement.addEventListener(`keydown`, onMapPinKeydown);
};

let setStartAddress = () => {
  let y = mapPinElement.offsetTop + MAP_PIN_HEIGHT / 2;
  let x = mapPinElement.offsetLeft + MAP_PIN_WIDTH / 2;

  setAddress(x, y);
};

let setAddressForActiveMap = () => {
  let y = mapPinElement.offsetTop;
  let x = mapPinElement.offsetLeft;
  setAddress(x + (MAP_PIN_WIDTH / 2), y + MAP_PIN_HEIGHT);
};

let onPinClick = (evt) => {
  let pinButton = evt.target.closest(`button`);

  if (!pinButton) {
    return;
  }

  if (pinButton.classList.contains(`map__pin`) && !pinButton.classList.contains(`map__pin--main`)) {
    let advert = adverts[pinButton.dataset.adverPosition];
    window.card.addCartElementToDOM(advert);
  }
};

let addPinHandlers = () => {
  document.addEventListener(`click`, onPinClick);
};

let clearMapHandlers = () => {
  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 27) {
      window.card.deleteCardElements();
      window.error.deleteErrorElement();
      window.success.deleteSuccessElement();
    }
  });

  document.addEventListener(`mousedown`, () => {
    window.error.deleteErrorElement();
    window.success.deleteSuccessElement();
  });
};

window.map = {
  MAP_PIN_WIDTH,
  MAP_PIN_HEIGHT,
  mapElement,
  mapPinElement,
  mainMapElement,
  addMapPinHandlers,
  setStartAddress,
  addPinHandlers,
  addAdvertsToMap,
  activateInterface,
  blockInterface,
  clearMapHandlers,
  setAddress,
  setMapPinElementPosition,
};

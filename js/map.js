'use strict';
let interfaceActiveStatus = false;
let adverts = [];

let addAdvertsToMap = () => {
  adverts = window.data.adverts.slice();
  adverts = window.adverts.filterAdverts(adverts);

  adverts = adverts.slice(0, 5);
  let fragment = window.pin.createPins(adverts);
  window.data.mapElement.appendChild(fragment);

  addPinHandlers();
};

let blockInterface = () => {
  setMapPinElementPosition(window.data.MAIN_PIT_TOP, window.data.MAIN_PIT_LEFT);
  window.util.setReadonlyAtrToElement(window.data.addressInput);
  window.map.setStartAddress();
  window.util.setDisabledAtrToElements(window.data.fieldsetElements);
  window.util.setDisabledAtrToElements(window.data.mapFilterElements);

  if (interfaceActiveStatus) {
    window.pin.deletePins();
    window.card.deleteCardElements();
    window.data.mainMapElement.classList.add(`map--faded`);
    window.data.addFormElement.classList.add(`ad-form--disabled`);
    window.data.mapPinElement.addEventListener(`keydown`, onMapPinKeydown);
    document.removeEventListener(`click`, onPinClick);
    window.form.clearForm();
    window.filter.clearFilter();
  }

  interfaceActiveStatus = false;
  addMapPinHandlers();
};

let setMapPinElementPosition = (top, left) => {
  window.data.mapPinElement.style.top = top + `px`;
  window.data.mapPinElement.style.left = left + `px`;
};

let activateInterface = () => {
  interfaceActiveStatus = true;
  setAddressForActiveMap();
  window.util.deleteDisabledAtrFromElements(window.data.fieldsetElements);
  window.util.deleteDisabledAtrFromElements(window.data.mapFilterElements);
  window.data.mainMapElement.classList.remove(`map--faded`);
  window.data.addFormElement.classList.remove(`ad-form--disabled`);

  if (window.data.adverts.length === 0) {
    window.adverts.generateAdverts();
  } else {
    addAdvertsToMap();
  }

  window.data.mapPinElement.removeEventListener(`keydown`, onMapPinKeydown);
  window.data.mapPinElement.removeEventListener(`mousedown`, onMapPinMousedown);
};

let setAddress = (x, y) => {
  window.data.addressInput.value = `${x}, ${y}`;
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
  window.data.mapPinElement.addEventListener(`mousedown`, onMapPinMousedown);
  window.data.mapPinElement.addEventListener(`keydown`, onMapPinKeydown);
};

let setStartAddress = () => {
  let y = window.data.mapPinElement.offsetTop + window.data.MAP_PIN_HEIGHT / 2;
  let x = window.data.mapPinElement.offsetLeft + window.data.MAP_PIN_WIDTH / 2;

  setAddress(x, y);
};

let setAddressForActiveMap = () => {
  let y = window.data.mapPinElement.offsetTop;
  let x = window.data.mapPinElement.offsetLeft;
  setAddress(x + (window.data.MAP_PIN_WIDTH / 2), y + window.data.MAP_PIN_HEIGHT);
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

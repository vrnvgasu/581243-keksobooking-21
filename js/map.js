'use strict';
(() => {
  let addAdvertsToMap = (adverts) => {
    let fragment = window.pin.createPins(adverts);
    window.data.map.appendChild(fragment);
  };

  let activateInterface = () => {
    window.util.activateElements(window.data.fieldsets);

    let adverts = window.adverts.generateAdverts();
    addAdvertsToMap(adverts);
  };

  let setAddress = (x, y) => {
    window.data.addressInput.value = `${x}, ${y}`;
  };

  let onMapPinMousedown = (evt) => {
    if (evt.button !== 0) {
      return;
    }

    window.data.mainMap.classList.remove(`map--faded`);
    window.data.addForm.classList.remove(`ad-form--disabled`);
    activateInterface();
  };

  let onMapPinMouseup = () => {
    let x = window.data.mapPin.offsetTop + window.data.MAP_PIN_ACTIVE_HEIGHT / 2;
    let y = window.data.mapPin.offsetLeft + window.data.MAP_PIN_WIDTH / 2;

    setAddress(x, y);
  };

  let onMapPinKeydown = (evt) => {
    if (evt.keyCode !== 13) {
      return;
    }

    window.data.mainMap.classList.remove(`map--faded`);
    window.data.addForm.classList.remove(`ad-form--disabled`);
    activateInterface();
  };

  let mapPinHandler = () => {
    window.data.mapPin.addEventListener(`mousedown`, onMapPinMousedown);
    window.data.mapPin.addEventListener(`keydown`, onMapPinKeydown);
    window.data.mapPin.addEventListener(`mouseup`, onMapPinMouseup);
  };

  let setStartAddress = () => {
    let x = window.data.mapPin.offsetTop + window.data.MAP_PIN_PASSIVE_HEIGHT / 2;
    let y = window.data.mapPin.offsetLeft + window.data.MAP_PIN_WIDTH / 2;

    setAddress(x, y);
  };

  window.map = {
    mapPinHandler,
    setStartAddress,
  };
})();

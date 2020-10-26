'use strict';
(() => {
  let interfaceActiveStatus = false;

  let addAdvertsToMap = (adverts) => {
    window.error.deleteErrorElement();
    adverts = window.adverts.filterAdverts(adverts);
    let fragment = window.pin.createPins(adverts);
    window.data.mapElement.appendChild(fragment);

    addPinHandlers(adverts);
  };

  let activateInterface = (reload = false) => {
    if (interfaceActiveStatus && !reload) {
      return;
    }

    interfaceActiveStatus = true;
    window.util.deleteDisabledAtrFromElements(window.data.fieldsetElements);
    window.data.mainMapElement.classList.remove(`map--faded`);
    window.data.addFormElement.classList.remove(`ad-form--disabled`);
    window.adverts.generateAdverts();
    window.data.mapPinElement.removeEventListener(`keydown`, onMapPinKeydown);
  };

  let setAddress = (x, y) => {
    window.data.addressInput.value = `${x}, ${y}`;
  };

  let onMapPinMousedown = (evt) => {
    if (evt.button !== 0) {
      return;
    }

    activateInterface();
  };

  // let onMapPinMouseup = () => {
  //   let x = window.data.mapPinElement.offsetTop + window.data.MAP_PIN_ACTIVE_HEIGHT / 2;
  //   let y = window.data.mapPinElement.offsetLeft + window.data.MAP_PIN_WIDTH / 2;
  //
  //   setAddress(x, y);
  // };

  let onMapPinKeydown = (evt) => {
    if (evt.keyCode !== 13) {
      return;
    }

    activateInterface();
  };

  let addMapPinHandlers = () => {
    window.data.mapPinElement.addEventListener(`mousedown`, onMapPinMousedown);
    window.data.mapPinElement.addEventListener(`keydown`, onMapPinKeydown);
    // window.data.mapPinElement.addEventListener(`mouseup`, onMapPinMouseup);
  };

  let setStartAddress = () => {
    let x = window.data.mapPinElement.offsetTop + window.data.MAP_PIN_PASSIVE_HEIGHT / 2;
    let y = window.data.mapPinElement.offsetLeft + window.data.MAP_PIN_WIDTH / 2;

    setAddress(x, y);
  };

  let onPinClick = (adverts) => {
    return (evt) => {
      let pinButton = evt.target.closest(`button`);

      if (!pinButton) {
        return;
      }

      if (pinButton.classList.contains(`map__pin`) && !pinButton.classList.contains(`map__pin--main`)) {
        let advert = adverts[pinButton.dataset.adverPosition];
        window.card.addCartElementToDOM(advert);
      }
    };
  };

  let addPinHandlers = (adverts) => {
    document.addEventListener(`click`, onPinClick(adverts));
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 27) {
        window.card.deleteCardElements();
      }
    });
  };

  window.map = {
    addMapPinHandlers,
    setStartAddress,
    addPinHandlers,
    addAdvertsToMap,
    activateInterface,
  };
})();

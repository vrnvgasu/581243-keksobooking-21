'use strict';
(() => {
  let interfaceActiveStatus = false;

  let addAdvertsToMap = (adverts) => {
    let fragment = window.pin.createPins(adverts);
    window.data.mapElement.appendChild(fragment);

    pinHandlers(adverts);
  };

  let activateInterface = () => {
    if (interfaceActiveStatus) {
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

  let mapPinHandlers = () => {
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
      let target = evt.target.closest(`button`);

      if (!target) {
        return;
      }

      if (target.classList.contains(`map__pin`) && !target.classList.contains(`map__pin--main`)) {
        let advert = adverts[target.dataset.adverPosition];
        window.card.addCartElementToDOM(advert);
      }
    };
  };

  let pinHandlers = (adverts) => {
    document.addEventListener(`click`, onPinClick(adverts));
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 27) {
        window.card.deleteCardElements(adverts);
      }
    });
  };

  window.map = {
    mapPinHandlers,
    setStartAddress,
    pinHandlers,
    addAdvertsToMap
  };
})();

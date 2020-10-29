'use strict';
(() => {
  let deletePins = () => {
    let pins = window.data.mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  };

  let createPin = (advert, i) => {
    let pin = window.data.mapPinTemplate.cloneNode(true);
    let img = pin.getElementsByTagName(`img`)[0];
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    /**
     * Координаты меток находятся в остром конце
     */
    pin.style.left = `${advert.location.x - window.data.PIN_WIDTH / 2}px`;
    pin.style.top = `${advert.location.y - window.data.PIN_HEIGHT}px`;
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
})();

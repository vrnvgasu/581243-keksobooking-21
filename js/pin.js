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
    img.setAttribute(`src`, advert.author.avatar);
    img.setAttribute(`alt`, advert.offer.title);
    pin.setAttribute(`style`, `left: ${advert.location.x}px; top: ${advert.location.y}px`);
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

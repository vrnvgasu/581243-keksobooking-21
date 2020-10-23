'use strict';
(() => {
  let createPin = (advert) => {
    let pin = window.data.mapPinTemplate.cloneNode(true);
    let img = pin.getElementsByTagName(`img`)[0];
    img.setAttribute(`src`, advert.author.avatar);
    img.setAttribute(`alt`, advert.offer.title);
    pin.setAttribute(`style`, `left: ${advert.location.x}px; top: ${advert.location.y}px`);

    return pin;
  };

  let createPins = (adverts) => {
    let fragment = document.createDocumentFragment();

    adverts.forEach((advert) => {
      fragment.appendChild(createPin(advert));
    });

    return fragment;
  };

  window.pin = {
    createPin,
    createPins,
  };
})();

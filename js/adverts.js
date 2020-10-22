'use strict';
(() => {
  let createAdvert = (i) => {
    let type = window.util.getRandomFromArray(window.data.BUILD_TYPE);
    let price = window.util.getRandomInteger(window.data.TYPE_MIN_PRICE[type], window.data.MAX_PRICE);
    let location = {
      x: window.util.getRandomInteger(0, window.data.mapWidth),
      y: window.util.getRandomInteger(window.data.MIN_Y, window.data.MAX_Y),
    };
    let rooms = window.util.getRandomInteger(window.data.MIN_ROOMS, window.data.MAX_ROOMS);
    let guests = window.util.getRandomInteger(window.data.MIN_ROOMS, rooms);

    return {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: `Сдается ${type}`,
        address: `${location.x}, ${location.x}`,
        price,
        type,
        rooms,
        guests,
        checkin: window.util.getRandomFromArray(window.data.CHECKIN),
        checkout: window.util.getRandomFromArray(window.data.CHECKOUT),
        features: window.util.getRandomArrayPart(window.data.FEATURES),
        description: `Сдается ${type} на ${guests} гостей за ${price}`,
        photos: window.util.getRandomArrayPart(window.data.PHOTOS),
      },
      location,
    };
  };

  let generateAdverts = () => {
    let result = [];

    for (let i = 0; i < window.data.ADVERTS_COUNT; i++) {
      let advert = createAdvert(i);
      result.push(advert);
    }

    return result;
  };

  window.adverts = {
    generateAdverts,
  };
})();

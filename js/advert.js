'use strict';
const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const filterTypes = {
  type: {
    name: `housing-type`,
  },
  price: {
    name: `housing-price`,
    count: {
      low: {
        min: 0,
        max: 9999,
      },
      middle: {
        min: 10000,
        max: 50000,
      },
      high: {
        min: 50000,
      },
    }
  },
  rooms: {
    name: `housing-rooms`,
  },
  guests: {
    name: `housing-guests`,
  },
  features: {
    name: `features`,
  },
};
let loadedAdverts = [];

let filterAdverts = (adverts) => {
  if (Object.keys(window.filter.filters).length === 0) {
    return adverts;
  }

  return window.advert.loadedAdverts.filter((advert) => {
    for (let filter in window.filter.filters) {
      if (!window.filter.filters.hasOwnProperty(filter)) {
        continue;
      }

      switch (filter) {
        case filterTypes.type.name:
          if (advert.offer.type !== window.filter.filters[filter]) {
            return false;
          }
          break;
        case filterTypes.price.name:
          let priceResult = false;
          if (advert.offer.price >= filterTypes.price.count[window.filter.filters[filter]].min) {
            priceResult = true;
          }
          if (filterTypes.price.count[window.filter.filters[filter]].max &&
            advert.offer.price > filterTypes.price.count[window.filter.filters[filter]].max) {
            return false;
          }
          if (!priceResult) {
            return false;
          }
          break;
        case filterTypes.rooms.name:
          if (advert.offer.rooms !== Number(window.filter.filters[filter])) {
            return false;
          }
          break;
        case filterTypes.guests.name:
          if (advert.offer.guests !== Number(window.filter.filters[filter])) {
            return false;
          }
          break;
        case filterTypes.features.name:
          for (let feature in window.filter.filters[filter]) {
            if (!window.filter.filters[filter].hasOwnProperty(feature)) {
              continue;
            }
            if (advert.offer.features.indexOf(window.filter.filters[filter][feature]) === -1) {
              return false;
            }
          }
      }
    }

    return true;
  });
};

let prepareAdverts = (adverts) => {
  window.advert.loadedAdverts = adverts.filter((advert) => advert.offer);
  window.map.addAdvertsToMap();
};

let generateAdverts = () => {
  window.load(LOAD_URL, prepareAdverts, window.error.addDownloadError);
};

window.advert = {
  loadedAdverts,
  generateAdverts,
  filterAdverts,
};

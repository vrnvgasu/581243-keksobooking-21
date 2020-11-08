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
let loaded = [];

const filter = (adverts) => {
  if (Object.keys(window.filter.filters).length === 0) {
    return adverts;
  }

  return window.advert.loaded.filter((advert) => {
    for (let filterItem in window.filter.filters) {
      if (!window.filter.filters.hasOwnProperty(filterItem)) {
        continue;
      }

      switch (filterItem) {
        case filterTypes.type.name:
          if (advert.offer.type !== window.filter.filters[filterItem]) {
            return false;
          }
          break;
        case filterTypes.price.name:
          let priceResult = false;
          if (advert.offer.price >= filterTypes.price.count[window.filter.filters[filterItem]].min) {
            priceResult = true;
          }
          if (filterTypes.price.count[window.filter.filters[filterItem]].max &&
            advert.offer.price > filterTypes.price.count[window.filter.filters[filterItem]].max) {
            return false;
          }
          if (!priceResult) {
            return false;
          }
          break;
        case filterTypes.rooms.name:
          if (advert.offer.rooms !== Number(window.filter.filters[filterItem])) {
            return false;
          }
          break;
        case filterTypes.guests.name:
          if (advert.offer.guests !== Number(window.filter.filters[filterItem])) {
            return false;
          }
          break;
        case filterTypes.features.name:
          for (let feature in window.filter.filters[filterItem]) {
            if (!window.filter.filters[filterItem].hasOwnProperty(feature)) {
              continue;
            }
            if (advert.offer.features.indexOf(window.filter.filters[filterItem][feature]) === -1) {
              return false;
            }
          }
      }
    }

    return true;
  });
};

const prepare = (adverts) => {
  window.advert.loaded = adverts.filter((advert) => advert.offer);
  window.map.renderAdverts();
};

const generate = () => {
  window.load(LOAD_URL, prepare, window.error.addDownloadMessage);
};

window.advert = {
  loaded,
  generate,
  filter,
};

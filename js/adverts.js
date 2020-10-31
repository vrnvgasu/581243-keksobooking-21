'use strict';
(() => {
  let filterAdverts = (adverts) => {
    if (Object.keys(window.data.filters).length === 0) {
      return adverts;
    }

    return window.data.adverts.filter((advert) => {
      for (let filter in window.data.filters) {
        if (!window.data.filters.hasOwnProperty(filter)) {
          continue;
        }

        switch (filter) {
          case window.data.filterTypes.type.name:
            if (advert.offer.type !== window.data.filters[filter]) {
              return false;
            }
            break;
          case window.data.filterTypes.price.name:
            let priceResult = false;
            if (advert.offer.price >= window.data.filterTypes.price.count[window.data.filters[filter]].min &&
                advert.offer.price <= window.data.filterTypes.price.count[window.data.filters[filter]].max) {
              priceResult = true;
              break;
            }
            if (!priceResult) {
              return false;
            }
            break;
          case window.data.filterTypes.rooms.name:
            if (advert.offer.rooms !== Number(window.data.filters[filter])) {
              return false;
            }
            break;
          case window.data.filterTypes.guests.name:
            if (advert.offer.guests !== Number(window.data.filters[filter])) {
              return false;
            }
            break;
          case window.data.filterTypes.features.name:
            for (let feature in window.data.filters[filter]) {
              if (!window.data.filters[filter].hasOwnProperty(feature)) {
                continue;
              }
              if (advert.offer.features.indexOf(window.data.filters[filter][feature]) === -1) {
                return false;
              }
            }
        }
      }

      return true;
    });
  };

  let prepareAdverts = (adverts) => {
    window.data.adverts = adverts.filter((advert) => advert.offer);
    window.map.addAdvertsToMap();
  };

  let generateAdverts = () => {
    window.load(window.data.loadUrl, prepareAdverts, window.util.onError);
  };

  window.adverts = {
    generateAdverts,
    filterAdverts,
  };
})();

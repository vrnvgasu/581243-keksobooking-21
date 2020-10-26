'use strict';
(() => {
  let filterAdverts = (adverts) => {
    return adverts.filter((advert) => advert.offer);
  };

  let generateAdverts = () => {
    window.load(window.data.loadUrl, window.map.addAdvertsToMap, window.util.onError);
  };

  window.adverts = {
    generateAdverts,
    filterAdverts,
  };
})();

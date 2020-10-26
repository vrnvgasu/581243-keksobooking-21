'use strict';
(() => {
  let prepareAdvers = (adverts) => {
    adverts.filter((advert) {

    });
  };

  let generateAdverts = () => {
    window.load(window.data.loadUrl, window.map.addAdvertsToMap, window.util.onError);
  };

  window.adverts = {
    generateAdverts,
  };
})();

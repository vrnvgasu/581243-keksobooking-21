'use strict';
(() => {
  window.data = {};
  window.data.BUILD_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  window.data.CHECKIN = [`12:00`, `13:00`, `14:00`];
  window.data.CHECKOUT = [`12:00`, `13:00`, `14:00`];
  window.data.FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  window.data.PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];
  window.data.HIDDEN_CLASS = `visually-hidden`;
  window.data.MIN_Y = 130;
  window.data.MAX_Y = 630;
  window.data.MIN_ROOMS = 1;
  window.data.MAX_ROOMS = 3;
  window.data.MAX_PRICE = 1000000;
  window.data.ADVERTS_COUNT = 8;

  /**
   * Валидация
   */
  window.data.MIN_TITLE_LENGTH = 30;
  window.data.MAX_TITLE_LENGTH = 100;
  window.data.TYPE_MIN_PRICE = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
  };

  /**
   * Размеры метки
   */
  window.data.MAP_PIN_WIDTH = 65;
  window.data.MAP_PIN_PASSIVE_HEIGHT = 65;
  window.data.MAP_PIN_ACTIVE_HEIGHT = 77;

  window.data.mapFiltersContainer = document.querySelector(`.map__filters-container`);
  window.data.mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  window.data.map = document.querySelector(`.map__pins`);
  window.data.cardArticle = document.querySelector(`#card`).content.querySelector(`.map__card`);
  window.data.mapWidth = window.data.map.offsetWidth;
  window.data.fieldsets = document.querySelectorAll(`fieldset`);
  window.data.mapPin = document.querySelector(`.map__pin--main`);
  window.data.addressInput = document.querySelector(`#address`);
  window.data.priceInput = document.querySelector(`#price`);
  window.data.timeinSelect = document.querySelector(`#timein`);
  window.data.timeoutSelect = document.querySelector(`#timeout`);
  window.data.roomNumberSelect = document.querySelector(`#room_number`);
  window.data.capacitySelect = document.querySelector(`#capacity`);
  window.data.addForm = document.querySelector(`.ad-form`);
  window.data.typeInput = document.querySelector(`#type`);
  window.data.mainMap = document.querySelector(`.map`);
})();

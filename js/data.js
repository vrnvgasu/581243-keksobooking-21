'use strict';
(() => {
  window.data = {};
  window.data.BUILD_TYPES = {
    palace: {
      translation: `Дворец`,
      price: 10000,
    },
    flat: {
      translation: `Квартира`,
      price: 1000,
    },
    house: {
      translation: `Дом`,
      price: 5000,
    },
    bungalow: {
      translation: `Бунгало`,
      price: 0,
    },
  };

  window.data.CHECKINS = [`12:00`, `13:00`, `14:00`];
  window.data.CHECKOUTS = [`12:00`, `13:00`, `14:00`];
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
  window.data.MAX_ADVERTS_COUNT = 5;

  /**
   * Валидация
   */
  window.data.MIN_TITLE_LENGTH = 30;
  window.data.MAX_TITLE_LENGTH = 100;

  /**
   * Размеры метки
   */
  window.data.MAP_PIN_WIDTH = 65;
  window.data.MAP_PIN_PASSIVE_HEIGHT = 65;
  window.data.MAP_PIN_ACTIVE_HEIGHT = 77;

  window.data.mapFiltersContainer = document.querySelector(`.map__filters-container`);
  window.data.mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  window.data.mapElement = document.querySelector(`.map__pins`);
  window.data.cardArticleTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  window.data.mapWidth = window.data.mapElement.offsetWidth;
  window.data.fieldsetElements = document.querySelectorAll(`fieldset`);
  window.data.mapPinElement = document.querySelector(`.map__pin--main`);
  window.data.addressInput = document.querySelector(`#address`);
  window.data.priceInput = document.querySelector(`#price`);
  window.data.timeinSelect = document.querySelector(`#timein`);
  window.data.timeoutSelect = document.querySelector(`#timeout`);
  window.data.roomNumberSelect = document.querySelector(`#room_number`);
  window.data.capacitySelect = document.querySelector(`#capacity`);
  window.data.addFormElement = document.querySelector(`.ad-form`);
  window.data.typeInput = document.querySelector(`#type`);
  window.data.mainMapElement = document.querySelector(`.map`);
  window.data.errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  /**
   * api
   */
  window.data.loadUrl = `https://21.javascript.pages.academy/keksobooking/data`;
})();
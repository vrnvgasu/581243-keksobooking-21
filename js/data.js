'use strict';
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
window.data.FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

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

window.data.adverts = [];
window.data.DEBOUNCE_INTERVAL = 500; // ms

/**
   * Валидация
   */
window.data.MIN_TITLE_LENGTH = 30;
window.data.MAX_TITLE_LENGTH = 100;

/**
   * Размеры метки
   */
window.data.MAP_PIN_WIDTH = 64;
window.data.MAP_PIN_HEIGHT = 70;
window.data.PIN_WIDTH = 50;
window.data.PIN_HEIGHT = 70;

window.data.mapFiltersContainer = document.querySelector(`.map__filters-container`);
window.data.mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
window.data.mapElement = document.querySelector(`.map__pins`);
window.data.cardArticleTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
window.data.mapWidth = window.data.mapElement.offsetWidth;
window.data.fieldsetElements = document.querySelectorAll(`fieldset`);
window.data.mapFilterElements = document.querySelectorAll(`.map__filter`);
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
window.data.successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
window.data.headerPreviewImgElement = window.data.addFormElement.querySelector(`.ad-form-header__preview img`);
window.data.adFormPhotoElement = window.data.addFormElement.querySelector(`.ad-form__photo`);
window.data.adFormFeatireInputs = window.data.addFormElement.querySelectorAll(`.ad-form__element--wide input`);
window.data.mapFilterForm = document.querySelector(`.map__filters`);
window.data.filterFeatireInputs = window.data.mapFilterForm.querySelectorAll(`#housing-features input`);
window.data.adFormResetElement = document.querySelector(`.ad-form__reset`);
window.data.avatarImg = document.querySelector(`.ad-form-header__preview img`);
window.data.adFormPhotoElement = document.querySelector(`.ad-form__photo`);

window.data.maxX = window.data.mapElement.clientWidth;

/**
   * Filters
   */
window.data.filters = {};
window.data.filterTypes = {
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
        min: 50001,
        max: 1000000000,
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

/**
   * api
   */
window.data.loadUrl = `https://21.javascript.pages.academy/keksobooking/data`;
window.data.uploadUrl = `https://21.javascript.pages.academy/keksobooking`;

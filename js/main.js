'use strict';

let bootstrap = () => {
  /**
   * Блокируем поле 'Адрес'
   */
  window.util.setReadonlyAtrToElement(window.data.addressInput);

  /**
   * Начальные координаты адреса
   */
  window.map.setStartAddress();

  /**
   * Блокируем интерактивные элементы
   */
  window.util.setDisabledAtrToElements(window.data.fieldsetElements);

  /**
   * Запускаем обработчики событий
   */
  window.handlers.setHandlers();

  /**
   * Выводим детальную информацию по первому объявлению на карту
   */
// let advert = window.adverts.generateAdverts()[0];
// window.card.addCartElementToDOM(advert);
};

bootstrap();

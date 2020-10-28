'use strict';

let bootstrap = () => {
  window.map.blockInterface();

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

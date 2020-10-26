'use strict';
(() => {
  let errorElement;
  let errorButtonElement;

  let onErrorButtonClick = (evt) => {
    // отключаем ивент, чтобы пользователь не вызывал загрузку объявлений несколько раз при медленной связи
    evt.target.removeEventListener(`click`, onErrorButtonClick);

    window.map.activateInterface(true);
  };

  let addErrorElement = (message) => {
    if (!errorElement) {
      errorElement = window.data.errorTemplate.cloneNode(true);
    }

    errorButtonElement = errorElement.querySelector(`.error__button`);
    let errorMessageElement = errorElement.querySelector(`.error__button`);
    errorMessageElement.textContent = message;
    window.data.mapElement.insertAdjacentElement(`beforebegin`, errorElement);

    errorButtonElement.addEventListener(`click`, onErrorButtonClick);
  };

  let deleteErrorElement = () => {
    if (errorElement) {
      errorElement.remove();
    }
  };

  window.error = {
    addErrorElement,
    deleteErrorElement,
  };
})();
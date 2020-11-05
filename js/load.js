'use strict';
const RESPONSE_TYPE = `json`;
const TIMEOUT = 1000;

window.load = function (url, onSuccess, onError, method = `GET`, data) {
  let xhr = new XMLHttpRequest();

  xhr.responseType = RESPONSE_TYPE;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case window.data.StatusCode.OK:
        onSuccess(xhr.response);
        break;

      case window.data.StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case window.data.StatusCode.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case window.data.StatusCode.NOT_FOUND:
        error = `Ничего не найдено :(`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open(method, url);
  xhr.send(data);
};

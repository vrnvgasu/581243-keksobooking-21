'use strict';
const errorUploadTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const errorDownloadTemplate = document.querySelector(`#load_error`).content.querySelector(`.load_error`);
const errorMessageElement = errorUploadTemplate.querySelector(`.error__button`);
let errorElement;

const addUploadError = (message) => {
  deleteErrorElement();
  errorElement = errorUploadTemplate.cloneNode(true);
  errorMessageElement.textContent = message;
  setError();
  window.map.blockInterface();
};

const addDownloadError = (message) => {
  deleteErrorElement();
  errorElement = errorDownloadTemplate.cloneNode(true);
  errorElement.textContent = message;
  setError();
};

const onErrorButtonClick = () => {
  deleteErrorElement();
};

const setError = () => {
  window.map.mapElement.insertAdjacentElement(`beforebegin`, errorElement);
  errorElement.addEventListener(`click`, onErrorButtonClick);
};

const deleteErrorElement = () => {
  if (errorElement) {
    errorElement.remove();
  }
};

window.error = {
  addDownloadError,
  addUploadError,
  deleteErrorElement,
};

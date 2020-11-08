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

let onErrorButtonClick = () => {
  deleteErrorElement();
};

let setError = () => {
  window.map.mapElement.insertAdjacentElement(`beforebegin`, errorElement);
  errorElement.addEventListener(`click`, onErrorButtonClick);
};

let deleteErrorElement = () => {
  if (errorElement) {
    errorElement.remove();
  }
};

window.error = {
  addDownloadError,
  addUploadError,
  deleteErrorElement,
};

'use strict';
const downloadErrorStyle = {
  zIndex: 100,
  backgroundColor: `red`,
  textAlign: `center`,
  position: `absolute`,
  width: `100%`,
};
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const errorMessageElement = errorTemplate.querySelector(`.error__button`);
let errorElement;

const addUploadError = (message) => {
  deleteErrorElement();
  errorElement = errorTemplate.cloneNode(true);
  errorMessageElement.textContent = message;
  setError();
  window.map.blockInterface();
};
const addDownloadError = (message) => {
  deleteErrorElement();
  errorElement = document.createElement(`div`);
  errorElement.style.zIndex = downloadErrorStyle.zIndex;
  errorElement.style.backgroundColor = downloadErrorStyle.backgroundColor;
  errorElement.style.textAlign = downloadErrorStyle.textAlign;
  errorElement.style.position = downloadErrorStyle.position;
  errorElement.style.width = downloadErrorStyle.width;
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

'use strict';
const errorUploadTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const errorDownloadTemplate = document.querySelector(`#load_error`).content.querySelector(`.load_error`);
const errorMessageElement = errorUploadTemplate.querySelector(`.error__button`);
let element;

const addUploadMessage = (message) => {
  deleteElement();
  element = errorUploadTemplate.cloneNode(true);
  errorMessageElement.textContent = message;
  set();
  window.map.blockInterface();
};

const addDownloadMessage = (message) => {
  deleteElement();
  element = errorDownloadTemplate.cloneNode(true);
  element.textContent = message;
  set();
  window.util.toggleDisabledElements(window.filter.selectElements, true);
  window.util.toggleDisabledElements(window.filter.fieldsetElements, true);
};

const onErrorButtonClick = () => {
  deleteElement();
};

const set = () => {
  window.map.pinElement.insertAdjacentElement(`beforebegin`, element);
  element.addEventListener(`click`, onErrorButtonClick);
};

const deleteElement = () => {
  if (element) {
    element.remove();
  }
};

window.error = {
  addDownloadMessage,
  addUploadMessage,
  deleteElement,
};

'use strict';
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
let successElement;

const addSuccessElement = () => {
  if (!successElement) {
    successElement = successTemplate.cloneNode(true);
  }

  window.map.mapElement.insertAdjacentElement(`beforebegin`, successElement);
};

const deleteSuccessElement = () => {
  if (successElement) {
    successElement.remove();
  }
};

window.success = {
  addSuccessElement,
  deleteSuccessElement,
};

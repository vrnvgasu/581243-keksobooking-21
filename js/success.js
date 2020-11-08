'use strict';
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
let successElement;

let addSuccessElement = () => {
  if (!successElement) {
    successElement = successTemplate.cloneNode(true);
  }

  window.map.mapElement.insertAdjacentElement(`beforebegin`, successElement);
};

let deleteSuccessElement = () => {
  if (successElement) {
    successElement.remove();
  }
};

window.success = {
  addSuccessElement,
  deleteSuccessElement,
};

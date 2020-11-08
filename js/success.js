'use strict';
const template = document.querySelector(`#success`).content.querySelector(`.success`);
let successElement;

const addElement = () => {
  if (!successElement) {
    successElement = template.cloneNode(true);
  }

  window.map.pinElement.insertAdjacentElement(`beforebegin`, successElement);
};

const deleteElement = () => {
  if (successElement) {
    successElement.remove();
  }
};

window.success = {
  addElement,
  deleteElement,
};

'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEBOUNCE_INTERVAL = 500; // ms

let toggleDisabledOnFormNodes = (elements, disabled) => {
  Array.from(elements).forEach((element) => {
    element.disabled = disabled;
  });
};

let onSuccess = () => {
  window.map.blockInterface();
  window.success.addSuccessElement();
};

let debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

let loadImg = (inputElement, previewImg) => {
  let file = inputElement.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewImg.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

window.util = {
  toggleDisabledOnFormNodes,
  onSuccess,
  debounce,
  loadImg,
};

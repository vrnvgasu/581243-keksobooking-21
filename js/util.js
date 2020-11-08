'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEBOUNCE_INTERVAL = 500; // ms

let deleteDisabledAtrFromElements = (elements) => {
  Array.from(elements).forEach((element) => {
    element.disabled = false;
  });
};

let setDisabledAtrToElements = (elements) => {
  Array.from(elements).forEach((element) => {
    element.disabled = true;
  });
};

let setReadonlyAtrToElement = (element) => {
  element.readonly = true;
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
  deleteDisabledAtrFromElements,
  setDisabledAtrToElements,
  setReadonlyAtrToElement,
  onSuccess,
  debounce,
  loadImg,
};

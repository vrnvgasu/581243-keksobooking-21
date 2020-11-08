'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEBOUNCE_INTERVAL = 500; // ms

const toggleDisabledOnFormNodes = (elements, disabled) => {
  Array.from(elements).forEach((element) => {
    element.disabled = disabled;
  });
};

const onSuccess = () => {
  window.map.blockInterface();
  window.success.addSuccessElement();
};

const debounce = (cb) => {
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

const loadImg = (inputElement, previewImg) => {
  const file = inputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    const reader = new FileReader();

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

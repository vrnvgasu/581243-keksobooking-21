'use strict';
(() => {
  let getRandomFromArray = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

  let getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

  let getRandomArrayPart = (arr) => {
    let randomItems = arr.slice();
    let newArrayLength = arr.length - getRandomInteger(0, arr.length - 1);
    let lengthForRemove = arr.length - newArrayLength;

    for (let i = 0; i < lengthForRemove; i++) {
      randomItems.splice(getRandomInteger(0, randomItems.length - 1), 1);
    }

    return randomItems;
  };

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

  let onError = (message) => {
    window.map.blockInterface();
    window.error.addErrorElement(message);
  };

  let onSuccess = () => {
    window.map.blockInterface();
    window.success.addSuccessElement();
  };

  window.util = {
    getRandomFromArray,
    getRandomInteger,
    getRandomArrayPart,
    deleteDisabledAtrFromElements,
    setDisabledAtrToElements,
    setReadonlyAtrToElement,
    onError,
    onSuccess,
  };
})();

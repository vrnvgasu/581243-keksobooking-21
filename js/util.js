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

  let activateElements = (elems) => {
    Array.from(elems).forEach((elem) => {
      elem.disabled = false;
    });
  };

  let blockElements = (elems) => {
    Array.from(elems).forEach((elem) => {
      elem.disabled = true;
    });
  };

  let makeReadonly = (elem) => {
    elem.readonly = true;
  };

  window.util = {
    getRandomFromArray,
    getRandomInteger,
    getRandomArrayPart,
    activateElements,
    blockElements,
    makeReadonly,
  };
})();

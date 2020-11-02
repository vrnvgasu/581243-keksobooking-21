'use strict';
let onMapPinElementMousedown = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.pageX,
    y: evt.pageY
  };

  let onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.pageX,
      y: startCoords.y - moveEvt.pageY
    };

    startCoords = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    let top = window.data.mapPinElement.offsetTop - shift.y;
    let left = window.data.mapPinElement.offsetLeft - shift.x;

    if (top < window.data.MIN_Y - window.data.MAP_PIN_HEIGHT) {
      top = window.data.MIN_Y - window.data.MAP_PIN_HEIGHT;
    } else if (top > window.data.MAX_Y - window.data.MAP_PIN_HEIGHT) {
      top = window.data.MAX_Y - window.data.MAP_PIN_HEIGHT;
    }
    if (left < 0 - (window.data.MAP_PIN_WIDTH / 2)) {
      left = -window.data.MAP_PIN_WIDTH / 2;
    } else if (left > window.data.maxX - (window.data.MAP_PIN_WIDTH / 2)) {
      left = window.data.maxX - (window.data.MAP_PIN_WIDTH / 2);
    }

    window.map.setAddress(left + (window.data.MAP_PIN_WIDTH / 2), top + window.data.MAP_PIN_HEIGHT);

    window.data.mapPinElement.style.top = top + `px`;
    window.data.mapPinElement.style.left = left + `px`;

  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

let setMoveHandlers = () => {
  window.data.mapPinElement.addEventListener(`mousedown`, onMapPinElementMousedown);
};

let deleteMoveHandlers = () => {
  window.data.mapPinElement.removeEventListener(`mousedown`, onMapPinElementMousedown);
};

window.move = {
  setMoveHandlers,
  deleteMoveHandlers,
};

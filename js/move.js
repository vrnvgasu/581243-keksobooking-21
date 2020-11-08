'use strict';
const MIN_Y = 130;
const MAX_Y = 630;
const maxX = window.map.pinElement.clientWidth;

const onMapPinElementMousedown = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.pageX,
    y: evt.pageY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.pageX,
      y: startCoords.y - moveEvt.pageY
    };

    startCoords = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    let top = window.map.pinMainElement.offsetTop - shift.y;
    let left = window.map.pinMainElement.offsetLeft - shift.x;

    if (top < MIN_Y - window.map.PIN_HEIGHT) {
      top = MIN_Y - window.map.PIN_HEIGHT;
    } else if (top > MAX_Y - window.map.PIN_HEIGHT) {
      top = MAX_Y - window.map.PIN_HEIGHT;
    }
    if (left < 0 - (window.map.PIN_WIDTH / 2)) {
      left = -window.map.PIN_WIDTH / 2;
    } else if (left > maxX - (window.map.PIN_WIDTH / 2)) {
      left = maxX - (window.map.PIN_WIDTH / 2);
    }

    window.map.setAddress(left + (window.map.PIN_WIDTH / 2), top + window.map.PIN_HEIGHT);

    window.map.setMapPinElementPosition(top, left);

  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

const setMoveHandlers = () => {
  window.map.pinMainElement.addEventListener(`mousedown`, onMapPinElementMousedown);
};

window.move = {
  setMoveHandlers,
};

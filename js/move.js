'use strict';
const MIN_Y = 130;
const MAX_Y = 630;
const maxX = window.map.mapElement.clientWidth;

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

    let top = window.map.mapPinElement.offsetTop - shift.y;
    let left = window.map.mapPinElement.offsetLeft - shift.x;

    if (top < MIN_Y - window.map.MAP_PIN_HEIGHT) {
      top = MIN_Y - window.map.MAP_PIN_HEIGHT;
    } else if (top > MAX_Y - window.map.MAP_PIN_HEIGHT) {
      top = MAX_Y - window.map.MAP_PIN_HEIGHT;
    }
    if (left < 0 - (window.map.MAP_PIN_WIDTH / 2)) {
      left = -window.map.MAP_PIN_WIDTH / 2;
    } else if (left > maxX - (window.map.MAP_PIN_WIDTH / 2)) {
      left = maxX - (window.map.MAP_PIN_WIDTH / 2);
    }

    window.map.setAddress(left + (window.map.MAP_PIN_WIDTH / 2), top + window.map.MAP_PIN_HEIGHT);

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
  window.map.mapPinElement.addEventListener(`mousedown`, onMapPinElementMousedown);
};

window.move = {
  setMoveHandlers,
};

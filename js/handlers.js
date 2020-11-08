'use strict';
const setHandlers = () => {
  window.form.addFormHandlers();
  window.map.addMapPinHandlers();
  window.map.clearMapHandlers();
  window.filter.setMapFilterFormHandlers();
  window.move.setMoveHandlers();
};

window.handlers = {
  setHandlers,
};

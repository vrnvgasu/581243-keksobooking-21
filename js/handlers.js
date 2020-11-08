'use strict';
const setHandlers = () => {
  window.form.setHandlers();
  window.map.setHandlers();
  window.map.setClearHandlers();
  window.filter.setHandlers();
  window.move.setHandlers();
};

window.handlers = {
  setHandlers,
};

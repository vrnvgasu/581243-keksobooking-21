'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandlers();
    window.map.addMapPinHandlers();
    window.map.addPinHandlers();
  };

  window.handlers = {
    setHandlers,
  };
})();

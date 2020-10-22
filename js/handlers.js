'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandler();
    window.map.mapPinHandler();
  };

  window.handlers = {
    setHandlers,
  };
})();

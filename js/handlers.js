'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandlers();
    window.map.addMapPinHandlers();
  };

  window.handlers = {
    setHandlers,
  };
})();

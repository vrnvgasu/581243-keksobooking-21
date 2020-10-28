'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandlers();
    window.map.addMapPinHandlers();
    window.map.clearMapHandlers();
  };

  window.handlers = {
    setHandlers,
  };
})();

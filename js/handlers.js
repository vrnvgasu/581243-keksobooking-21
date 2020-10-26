'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandlers();
    window.map.mapPinHandlers();
  };

  window.handlers = {
    setHandlers,
  };
})();

'use strict';
(() => {
  let setHandlers = () => {
    window.form.addFormHandlers();
    window.map.mapPinHandlers();
    window.map.pinHandlers();
  };

  window.handlers = {
    setHandlers,
  };
})();

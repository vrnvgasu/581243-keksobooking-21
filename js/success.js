'use strict';
(() => {
  let successElement;

  let addSuccessElement = () => {
    if (!successElement) {
      successElement = window.data.successTemplate.cloneNode(true);
    }

    window.data.mapElement.insertAdjacentElement(`beforebegin`, successElement);
  };

  let deleteSuccessElement = () => {
    if (successElement) {
      successElement.remove();
    }
  };

  window.success = {
    addSuccessElement,
    deleteSuccessElement,
  };
})();

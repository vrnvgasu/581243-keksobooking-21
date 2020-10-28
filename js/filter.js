'use strict';
(() => {
  let clearFilter = () => {
    window.data.mapFilterForm.querySelector(`#housing-type`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-price`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-rooms`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-guests`).value = `any`;

    Array.from(window.data.filterFeatireInputs).forEach((featureInput) => {
      featureInput.checked = false;
    });
  };

  window.filter = {
    clearFilter,
  };
})();

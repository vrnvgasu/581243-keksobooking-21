'use strict';
(() => {
  let clearFilter = () => {
    window.data.mapFilterForm.querySelector(`#housing-type`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-price`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-rooms`).value = `any`;
    window.data.mapFilterForm.querySelector(`#housing-guests`).value = `any`;
    window.data.filters = [];

    Array.from(window.data.filterFeatireInputs).forEach((featureInput) => {
      featureInput.checked = false;
    });
  };

  let changeFilters = () => {
    window.data.filters = [];
    let data = new FormData(window.data.mapFilterForm);
    data = data.entries();
    let obj = data.next();

    while (undefined !== obj.value) {
      if (obj.value[1] === `any`) {
        obj = data.next();
        continue;
      }

      if (obj.value[0] === `features`) {
        if (!window.data.filters[obj.value[0]]) {
          window.data.filters[obj.value[0]] = [];
        }
        window.data.filters[obj.value[0]].push(obj.value[1]);
      } else {
        window.data.filters[obj.value[0]] = obj.value[1];
      }

      obj = data.next();
    }

    window.pin.deletePins();
    window.card.deleteCardElements();
    window.map.addAdvertsToMap();
  };

  let onMapFilterFormChange = window.util.debounce((evt) => {
    evt.preventDefault();
    changeFilters();
  });

  let setMapFilterFormHandlers = () => {
    window.data.mapFilterForm.addEventListener(`change`, onMapFilterFormChange);
  };

  window.filter = {
    clearFilter,
    setMapFilterFormHandlers,
  };
})();

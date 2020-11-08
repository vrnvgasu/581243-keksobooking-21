'use strict';
const mapFilterForm = document.querySelector(`.map__filters`);
const filterFeatureInputs = mapFilterForm.querySelectorAll(`#housing-features input`);
let filters = [];

let clearFilter = () => {
  mapFilterForm.querySelector(`#housing-type`).value = `any`;
  mapFilterForm.querySelector(`#housing-price`).value = `any`;
  mapFilterForm.querySelector(`#housing-rooms`).value = `any`;
  mapFilterForm.querySelector(`#housing-guests`).value = `any`;
  window.filter.filters = [];

  Array.from(filterFeatureInputs).forEach((featureInput) => {
    featureInput.checked = false;
  });
};

let changeFilters = () => {
  filters = [];
  let data = new FormData(mapFilterForm);
  data = data.entries();
  let obj = data.next();

  while (undefined !== obj.value) {
    if (obj.value[1] === `any`) {
      obj = data.next();
      continue;
    }

    if (obj.value[0] === `features`) {
      if (!filters[obj.value[0]]) {
        filters[obj.value[0]] = [];
      }
      filters[obj.value[0]].push(obj.value[1]);
    } else {
      filters[obj.value[0]] = obj.value[1];
    }

    obj = data.next();
  }

  window.filter.filters = filters;

  window.pin.deletePins();
  window.card.deleteCardElements();
  window.map.addAdvertsToMap();
};

let onMapFilterFormChange = window.util.debounce((evt) => {
  evt.preventDefault();
  changeFilters();
});

let setMapFilterFormHandlers = () => {
  mapFilterForm.addEventListener(`change`, onMapFilterFormChange);
};

window.filter = {
  filters,
  clearFilter,
  setMapFilterFormHandlers,
};

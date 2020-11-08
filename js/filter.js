'use strict';
const mapFilterForm = document.querySelector(`.map__filters`);
const ANY = `any`;
const FEATURES = `features`;
let filters = [];

const clearFilter = () => {
  mapFilterForm.reset();
  window.filter.filters = [];
};

const changeFilters = () => {
  filters = [];
  let data = new FormData(mapFilterForm);
  data = data.entries();
  let obj = data.next();

  while (undefined !== obj.value) {
    if (obj.value[1] === ANY) {
      obj = data.next();
      continue;
    }

    if (obj.value[0] === FEATURES) {
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

const onMapFilterFormChange = window.util.debounce((evt) => {
  evt.preventDefault();
  changeFilters();
});

const setMapFilterFormHandlers = () => {
  mapFilterForm.addEventListener(`change`, onMapFilterFormChange);
};

window.filter = {
  filters,
  clearFilter,
  setMapFilterFormHandlers,
};

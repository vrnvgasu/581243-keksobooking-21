'use strict';
const ANY = `any`;
const FEATURES = `features`;
const mapFilterForm = document.querySelector(`.map__filters`);
const filterFieldsetElements = mapFilterForm.querySelectorAll(`fieldset`);
const filterElements = mapFilterForm.querySelectorAll(`.map__filter`);
let filters = [];

const toggleDisabledFilters = (disabled) => {
  window.util.toggleDisabledElements(filterElements, disabled);
  window.util.toggleDisabledElements(filterFieldsetElements, disabled);
};

const clear = () => {
  mapFilterForm.reset();
  window.filter.filters = [];
};

const change = () => {
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

  window.pin.deleteAll();
  window.card.deleteElements();
  window.map.renderAdverts();
};

const onMapFilterFormChange = window.util.debounce((evt) => {
  evt.preventDefault();
  change();
});

const setHandlers = () => {
  mapFilterForm.addEventListener(`change`, onMapFilterFormChange);
};

window.filter = {
  filters,
  clear,
  setHandlers,
  toggleDisabledFilters,
};

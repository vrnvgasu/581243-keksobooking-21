'use strict';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const priceInput = document.querySelector(`#price`);
const timeinSelect = document.querySelector(`#timein`);
const timeoutSelect = document.querySelector(`#timeout`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const typeInput = document.querySelector(`#type`);
const addFormElement = document.querySelector(`.ad-form`);
const headerPreviewImgElement = addFormElement.querySelector(`.ad-form-header__preview img`);
const adFormPhotoElement = addFormElement.querySelector(`.ad-form__photo`);
const adFormFeatureInputs = addFormElement.querySelectorAll(`.ad-form__element--wide input`);
const adFormResetElement = document.querySelector(`.ad-form__reset`);
const avatarImg = document.querySelector(`.ad-form-header__preview img`);

let validateFormPrice = (input) => {
  let price = input.value;
  let type = typeInput.value;

  if (price < Number(input.placeholder)) {
    input.setCustomValidity(`Минимальная цена для этого типа жилья ` + window.card.BUILD_TYPES[type].price);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

let validateFormTitle = (input) => {
  let valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

let selectTypeHandler = (target) => {
  priceInput.placeholder = window.card.BUILD_TYPES[target.value].price;
  priceInput.min = window.card.BUILD_TYPES[target.value].price;
  validateFormPrice(priceInput);
};

let selectTimeHandler = (value) => {
  timeinSelect.value = timeoutSelect.value = value;
};

let addRoomHandlers = (select) => {
  let capacityValue = Number(capacitySelect.value);
  let roomValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(capacitySelect, capacityValue, roomValue);
};

let setValidityMessage = (select, capacityValue, roomValue) => {
  if (capacityValue > 0 && capacityValue > roomValue && roomValue !== 100) {
    select.setCustomValidity(`Гостей (${capacityValue}) больше, чем комнат (${roomValue})`);
  } else if (capacityValue === 0 && roomValue !== 100) {
    select.setCustomValidity(`Требуется 100 комнат.`);
  } else if (capacityValue !== 0 && roomValue === 100) {
    select.setCustomValidity(`Аренда не для гостей`);
  } else {
    select.setCustomValidity(``);
  }

  select.reportValidity();
};

let addCapacityHandlers = (select) => {
  let roomValue = Number(roomNumberSelect.value);
  let capacityValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(roomNumberSelect, capacityValue, roomValue);
};

let onFormInput = (evt) => {
  if (evt.target.matches(`#title`)) {
    validateFormTitle(evt.target);
  } else if (evt.target.matches(`#price`)) {
    validateFormPrice(evt.target);
  }
};

let setFormPreviewImg = (input) => {
  let previewImg = document.createElement(`img`);
  previewImg.style.width = `100%`;
  previewImg.style.height = `100%`;
  window.util.loadImg(input, previewImg);
  adFormPhotoElement.textContent = ``;
  adFormPhotoElement.append(previewImg);
};

let onFormChange = (evt) => {
  if (evt.target.matches(`#type`)) {
    selectTypeHandler(evt.target);
  } else if (evt.target.matches(`#timein`) || evt.target.matches(`#timeout`)) {
    selectTimeHandler(evt.target.value);
  } else if (evt.target.matches(`#room_number`)) {
    addRoomHandlers(evt.target);
  } else if (evt.target.matches(`#capacity`)) {
    addCapacityHandlers(evt.target);
  } else if (evt.target.matches(`#avatar`)) {
    window.util.loadImg(evt.target, avatarImg);
  } else if (evt.target.matches(`#images`)) {
    setFormPreviewImg(evt.target);
  }
};

let clearForm = () => {
  addFormElement.querySelector(`#title`).value = ``;
  addFormElement.querySelector(`#price`).value = ``;
  addFormElement.querySelector(`#price`).placeholder = `1000`;
  addFormElement.querySelector(`#description`).value = ``;
  addFormElement.querySelector(`#type`).value = `flat`;
  addFormElement.querySelector(`#timein`).value = `12:00`;
  addFormElement.querySelector(`#timeout`).value = `12:00`;
  addFormElement.querySelector(`#room_number`).value = `1`;
  addFormElement.querySelector(`#capacity`).value = `1`;
  addFormElement.querySelector(`#images`).value = ``;
  addFormElement.querySelector(`#avatar`).value = ``;
  headerPreviewImgElement.src = `img/muffin-grey.svg`;
  adFormPhotoElement.textContent = ``;

  Array.from(adFormFeatureInputs).forEach((featureInput) => {
    featureInput.checked = false;
  });
};

let onAddFormSubmit = (evt) => {
  evt.preventDefault();
  window.load(
      UPLOAD_URL,
      window.util.onSuccess,
      window.error.addUploadError,
      `POST`,
      new FormData(addFormElement)
  );
};

let onAdFormResetElementClick = (evt) => {
  evt.preventDefault();
  window.map.blockInterface();
};

let addFormHandlers = () => {
  addFormElement.addEventListener(`input`, onFormInput);
  addFormElement.addEventListener(`change`, onFormChange);
  addFormElement.addEventListener(`submit`, onAddFormSubmit);
  adFormResetElement.addEventListener(`click`, onAdFormResetElementClick);
};

window.form = {
  addFormElement,
  addFormHandlers,
  clearForm,
};

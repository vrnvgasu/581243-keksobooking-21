'use strict';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const CAPACITY_NO_GUESTS = 0;
const ROOM_NO_GUESTS = 100;
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const defaultFormValue = {
  price: `1000`,
  type: `flat`,
  timein: `12:00`,
  timeout: `12:00`,
  roomNumber: `1`,
  capacity: `1`,
  previewAvatar: `img/muffin-grey.svg`,
};
const priceInput = document.querySelector(`#price`);
const timeinSelect = document.querySelector(`#timein`);
const timeoutSelect = document.querySelector(`#timeout`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const typeInput = document.querySelector(`#type`);
const addFormElement = document.querySelector(`.ad-form`);
const headerPreviewImgElement = addFormElement.querySelector(`.ad-form-header__preview img`);
const adFormPhotoElement = addFormElement.querySelector(`.ad-form__photo`);
const adFormResetElement = document.querySelector(`.ad-form__reset`);
const avatarImg = document.querySelector(`.ad-form-header__preview img`);

const validateFormPrice = (input) => {
  const price = input.value;
  const type = typeInput.value;

  if (price < Number(input.placeholder)) {
    input.setCustomValidity(`Минимальная цена для этого типа жилья ` + window.card.BUILD_TYPES[type].price);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

const validateFormTitle = (input) => {
  const valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    input.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    input.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

const selectTypeHandler = (target) => {
  priceInput.placeholder = window.card.BUILD_TYPES[target.value].price;
  priceInput.min = window.card.BUILD_TYPES[target.value].price;
  validateFormPrice(priceInput);
};

const selectTimeHandler = (value) => {
  timeinSelect.value = timeoutSelect.value = value;
};

const addRoomHandlers = (select) => {
  const capacityValue = Number(capacitySelect.value);
  const roomValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(capacitySelect, capacityValue, roomValue);
};

const setValidityMessage = (select, capacityValue, roomValue) => {
  if (capacityValue > CAPACITY_NO_GUESTS && capacityValue > roomValue && roomValue !== ROOM_NO_GUESTS) {
    select.setCustomValidity(`Гостей (${capacityValue}) больше, чем комнат (${roomValue})`);
  } else if (capacityValue === CAPACITY_NO_GUESTS && roomValue !== ROOM_NO_GUESTS) {
    select.setCustomValidity(`Требуется 100 комнат.`);
  } else if (capacityValue !== CAPACITY_NO_GUESTS && roomValue === ROOM_NO_GUESTS) {
    select.setCustomValidity(`Аренда не для гостей`);
  } else {
    select.setCustomValidity(``);
  }

  select.reportValidity();
};

const addCapacityHandlers = (select) => {
  const roomValue = Number(roomNumberSelect.value);
  const capacityValue = Number(select.value);

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

const setFormPreviewImg = (input) => {
  const previewImg = document.createElement(`img`);
  previewImg.style.width = `100%`;
  previewImg.style.height = `100%`;
  window.util.loadImg(input, previewImg);
  adFormPhotoElement.textContent = ``;
  adFormPhotoElement.append(previewImg);
};

const onFormChange = (evt) => {
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

const clearForm = () => {
  addFormElement.reset();
  priceInput.placeholder = defaultFormValue.price;
  typeInput.value = defaultFormValue.type;
  timeinSelect.value = defaultFormValue.timein;
  timeoutSelect.value = defaultFormValue.timeout;
  roomNumberSelect.value = defaultFormValue.roomNumber;
  capacitySelect.value = defaultFormValue.capacity;
  headerPreviewImgElement.src = defaultFormValue.previewAvatar;
  adFormPhotoElement.textContent = ``;
};

const onAddFormSubmit = (evt) => {
  evt.preventDefault();
  window.load(
      UPLOAD_URL,
      window.util.onSuccess,
      window.error.addUploadError,
      `POST`,
      new FormData(addFormElement)
  );
};

const onAdFormResetElementClick = (evt) => {
  evt.preventDefault();
  window.map.blockInterface();
};

const addFormHandlers = () => {
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

'use strict';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const CAPACITY_NO_GUESTS = 0;
const ROOM_NO_GUESTS = 100;
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const defaultValues = {
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

const validatePrice = (input) => {
  const price = input.value;
  const type = typeInput.value;

  if (price < Number(input.placeholder)) {
    input.setCustomValidity(`Минимальная цена для этого типа жилья ` + window.card.BUILD_TYPES[type].price);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

const validateTitle = (input) => {
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

const changeType = (target) => {
  priceInput.placeholder = window.card.BUILD_TYPES[target.value].price;
  priceInput.min = window.card.BUILD_TYPES[target.value].price;
  validatePrice(priceInput);
};

const changeTime = (value) => {
  timeinSelect.value = timeoutSelect.value = value;
};

const changeRoomNumber = (select) => {
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

const changeCapacity = (select) => {
  const roomValue = Number(roomNumberSelect.value);
  const capacityValue = Number(select.value);

  setValidityMessage(select, capacityValue, roomValue);
  setValidityMessage(roomNumberSelect, capacityValue, roomValue);
};

let onFormInput = (evt) => {
  if (evt.target.matches(`#title`)) {
    validateTitle(evt.target);
  } else if (evt.target.matches(`#price`)) {
    validatePrice(evt.target);
  }
};

const setPreviewImg = (input) => {
  const previewImg = document.createElement(`img`);
  previewImg.style.width = `100%`;
  previewImg.style.height = `100%`;
  window.util.loadImg(input, previewImg);
  adFormPhotoElement.textContent = ``;
  adFormPhotoElement.append(previewImg);
};

const onFormChange = (evt) => {
  if (evt.target.matches(`#type`)) {
    changeType(evt.target);
  } else if (evt.target.matches(`#timein`) || evt.target.matches(`#timeout`)) {
    changeTime(evt.target.value);
  } else if (evt.target.matches(`#room_number`)) {
    changeRoomNumber(evt.target);
  } else if (evt.target.matches(`#capacity`)) {
    changeCapacity(evt.target);
  } else if (evt.target.matches(`#avatar`)) {
    window.util.loadImg(evt.target, avatarImg);
  } else if (evt.target.matches(`#images`)) {
    setPreviewImg(evt.target);
  }
};

const clear = () => {
  addFormElement.reset();
  priceInput.placeholder = defaultValues.price;
  typeInput.value = defaultValues.type;
  timeinSelect.value = defaultValues.timein;
  timeoutSelect.value = defaultValues.timeout;
  roomNumberSelect.value = defaultValues.roomNumber;
  capacitySelect.value = defaultValues.capacity;
  headerPreviewImgElement.src = defaultValues.previewAvatar;
  adFormPhotoElement.textContent = ``;
};

const onAddFormSubmit = (evt) => {
  evt.preventDefault();
  window.load(
      UPLOAD_URL,
      window.util.onSuccess,
      window.error.addUploadMessage,
      `POST`,
      new FormData(addFormElement)
  );
};

const onAdFormResetElementClick = (evt) => {
  evt.preventDefault();
  window.map.blockInterface();
};

const setHandlers = () => {
  addFormElement.addEventListener(`input`, onFormInput);
  addFormElement.addEventListener(`change`, onFormChange);
  addFormElement.addEventListener(`submit`, onAddFormSubmit);
  adFormResetElement.addEventListener(`click`, onAdFormResetElementClick);
};

window.form = {
  addFormElement,
  setHandlers,
  clear,
};

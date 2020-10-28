'use strict';
(() => {
  let validateFormPrice = (input) => {
    let price = input.value;
    let type = window.data.typeInput.value;

    if (price < Number(input.placeholder)) {
      input.setCustomValidity(`Минимальная цена для этого типа жилья ` + window.data.BUILD_TYPES[type].price);
    } else {
      input.setCustomValidity(``);
    }

    input.reportValidity();
  };

  let validateFormTitle = (input) => {
    let valueLength = input.value.length;

    if (valueLength < window.data.MIN_TITLE_LENGTH) {
      input.setCustomValidity(`Ещё ` + (window.data.MIN_TITLE_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > window.data.MAX_TITLE_LENGTH) {
      input.setCustomValidity(`Удалите лишние ` + (valueLength - window.data.MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      input.setCustomValidity(``);
    }

    input.reportValidity();
  };

  let selectTypeHandler = (target) => {
    window.data.priceInput.placeholder = window.data.BUILD_TYPES[target.value].price;
    validateFormPrice(window.data.priceInput);
  };

  let selectTimeHandler = (value) => {
    window.data.timeinSelect.value = window.data.timeoutSelect.value = value;
  };

  let roomHandler = (select) => {
    let capacityValue = Number(window.data.capacitySelect.value);
    let roomValue = Number(select.value);

    setValidityMessage(select, capacityValue, roomValue);
    setValidityMessage(window.data.capacitySelect, capacityValue, roomValue);
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

  let capacityHandler = (select) => {
    let roomValue = Number(window.data.roomNumberSelect.value);
    let capacityValue = Number(select.value);

    setValidityMessage(select, capacityValue, roomValue);
    setValidityMessage(window.data.roomNumberSelect, capacityValue, roomValue);
  };

  let onFormInput = (evt) => {
    if (evt.target.matches(`#title`)) {
      validateFormTitle(evt.target);
    } else if (evt.target.matches(`#price`)) {
      validateFormPrice(evt.target);
    }
  };

  let onFormChange = (evt) => {
    if (evt.target.matches(`#type`)) {
      selectTypeHandler(evt.target);
    } else if (evt.target.matches(`#timein`) || evt.target.matches(`#timeout`)) {
      selectTimeHandler(evt.target.value);
    } else if (evt.target.matches(`#room_number`)) {
      roomHandler(evt.target);
    } else if (evt.target.matches(`#capacity`)) {
      capacityHandler(evt.target);
    }
  };

  let clearForm = () => {
    window.data.addFormElement.querySelector(`#title`).value = ``;
    window.data.addFormElement.querySelector(`#price`).value = ``;
    window.data.addFormElement.querySelector(`#price`).placeholder = `1000`;
    window.data.addFormElement.querySelector(`#description`).value = ``;
    window.data.addFormElement.querySelector(`#type`).value = `flat`;
    window.data.addFormElement.querySelector(`#timein`).value = `12:00`;
    window.data.addFormElement.querySelector(`#timeout`).value = `12:00`;
    window.data.addFormElement.querySelector(`#room_number`).value = `1`;
    window.data.addFormElement.querySelector(`#capacity`).value = `1`;
    window.data.addFormElement.querySelector(`#images`).value = ``;
    window.data.addFormElement.querySelector(`#avatar`).value = ``;
    window.data.headerPreviewImgElement.src = `img/muffin-grey.svg`;
    window.data.adFormPhotoElement.textContent = ``;

    Array.from(window.data.adFormFeatireInputs).forEach((featureInput) => {
      featureInput.checked = false;
    });
  };

  let addFormHandlers = () => {
    window.data.addFormElement.addEventListener(`input`, onFormInput);
    window.data.addFormElement.addEventListener(`change`, onFormChange);
    window.data.addFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();


      window.load(
          window.data.uploadUrl,
          window.util.onSuccess,
          window.util.onError,
          `POST`,
          new FormData(window.data.addFormElement)
      );
    });
  };

  window.form = {
    addFormHandlers,
    clearForm,
  };
})();

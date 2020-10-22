'use strict';
(() => {
  let getBuildTypeTranslation = (type) => {
    switch (type) {
      case `palace`: return `Дворец`;
      case `flat`: return `Квартира`;
      case `house`: return `Дом`;
      case `bungalow`: return `Бунгало`;
      default: return null;
    }
  };

  let hideElement = (element) => {
    element.classList.add(window.data.HIDDEN_CLASS);
  };

  let createCartElement = (advert) => {
    let template = window.data.cardArticle.cloneNode(true);
    let featureItem = template.querySelector(`.popup__feature`);
    let featureList = template.querySelector(`.popup__features`);
    let photoItem = template.querySelector(`.popup__photo`);
    let photoList = template.querySelector(`.popup__photos`);
    let title = template.querySelector(`.popup__title`);
    let address = template.querySelector(`.popup__text--address`);
    let price = template.querySelector(`.popup__text--price`);
    let type = template.querySelector(`.popup__type`);
    let capacity = template.querySelector(`.popup__text--capacity`);
    let time = template.querySelector(`.popup__text--time`);
    let description = template.querySelector(`.popup__description`);
    let avatar = template.querySelector(`.popup__avatar`);

    title.textContent = advert.offer.title;
    address.textContent = advert.offer.address;
    price.textContent = `${advert.offer.price}₽/ночь`;
    type.textContent = getBuildTypeTranslation(advert.offer.type);
    capacity.textContent = `${advert.offer.rooms} комната(ы) для ${advert.offer.guests} гостей`;
    time.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
    description.textContent = advert.offer.description;
    avatar.setAttribute(`src`, advert.author.avatar);

    featureList.textContent = ``;
    advert.offer.features.forEach((feature) => {
      let newFeatureItem = featureItem.cloneNode();
      newFeatureItem.className = `popup__feature`;
      newFeatureItem.classList.add(`popup__feature--${feature}`);

      featureList.appendChild(newFeatureItem);
    });

    photoList.textContent = ``;
    advert.offer.photos.forEach((photo) => {
      let newPhotoItem = photoItem.cloneNode();
      newPhotoItem.setAttribute(`src`, photo);

      photoList.appendChild(newPhotoItem);
    });

    if (!advert.author.avatar) {
      hideElement(avatar);
    }

    return template;
  };

  let addCartElementToDOM = (advert) => {
    let cart = createCartElement(advert);
    window.data.mapFiltersContainer.insertAdjacentElement(`beforebegin`, cart);
  };

  window.card = {
    addCartElementToDOM,
  };
})();

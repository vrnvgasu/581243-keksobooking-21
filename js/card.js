'use strict';
(() => {
  let hideElement = (element) => {
    element.classList.add(window.data.HIDDEN_CLASS);
  };

  let createCartElement = (advert) => {
    let template = window.data.cardArticleTemplate.cloneNode(true);
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
    type.textContent = window.data.BUILD_TYPES[advert.offer.type].translation;
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

  let onPopupCloseClick = () => {
    deleteCardElements();
  };

  let deleteCardElements = () => {
    let cards = window.data.mainMapElement.querySelectorAll(`.map__card`);
    Array.from(cards).forEach((card) => {
      card.remove();
    });
  };

  let addCartElementToDOM = (advert) => {
    deleteCardElements();
    let card = createCartElement(advert);
    window.data.mapFiltersContainer.insertAdjacentElement(`beforebegin`, card);

    let popupCloseElement = card.querySelector(`.popup__close`);
    popupCloseElement.addEventListener(`click`, onPopupCloseClick);
  };

  window.card = {
    addCartElementToDOM,
    deleteCardElements,
  };
})();

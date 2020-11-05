(()=>{"use strict";window.data={},window.data.BUILD_TYPES={palace:{translation:"Дворец",price:1e4},flat:{translation:"Квартира",price:1e3},house:{translation:"Дом",price:5e3},bungalow:{translation:"Бунгало",price:0}},window.data.FILE_TYPES=["gif","jpg","jpeg","png"],window.data.CHECKINS=["12:00","13:00","14:00"],window.data.CHECKOUTS=["12:00","13:00","14:00"],window.data.FEATURES=["wifi","dishwasher","parking","washer","elevator","conditioner"],window.data.PHOTOS=["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],window.data.HIDDEN_CLASS="visually-hidden",window.data.MIN_Y=130,window.data.MAX_Y=630,window.data.MIN_ROOMS=1,window.data.MAX_ROOMS=3,window.data.MAX_PRICE=1e6,window.data.MAX_ADVERTS_COUNT=5,window.data.DEBOUNCE_INTERVAL=500,window.data.MAIN_PIT_TOP=375,window.data.MAIN_PIT_LEFT=570,window.data.MIN_TITLE_LENGTH=30,window.data.MAX_TITLE_LENGTH=100,window.data.MAP_PIN_WIDTH=64,window.data.MAP_PIN_HEIGHT=70,window.data.PIN_WIDTH=50,window.data.PIN_HEIGHT=70,window.data.adverts=[],window.data.mapFiltersContainer=document.querySelector(".map__filters-container"),window.data.mapPinTemplate=document.querySelector("#pin").content.querySelector(".map__pin"),window.data.mapElement=document.querySelector(".map__pins"),window.data.cardArticleTemplate=document.querySelector("#card").content.querySelector(".map__card"),window.data.mapWidth=window.data.mapElement.offsetWidth,window.data.fieldsetElements=document.querySelectorAll("fieldset"),window.data.mapFilterElements=document.querySelectorAll(".map__filter"),window.data.mapPinElement=document.querySelector(".map__pin--main"),window.data.addressInput=document.querySelector("#address"),window.data.priceInput=document.querySelector("#price"),window.data.timeinSelect=document.querySelector("#timein"),window.data.timeoutSelect=document.querySelector("#timeout"),window.data.roomNumberSelect=document.querySelector("#room_number"),window.data.capacitySelect=document.querySelector("#capacity"),window.data.addFormElement=document.querySelector(".ad-form"),window.data.typeInput=document.querySelector("#type"),window.data.mainMapElement=document.querySelector(".map"),window.data.errorTemplate=document.querySelector("#error").content.querySelector(".error"),window.data.successTemplate=document.querySelector("#success").content.querySelector(".success"),window.data.headerPreviewImgElement=window.data.addFormElement.querySelector(".ad-form-header__preview img"),window.data.adFormPhotoElement=window.data.addFormElement.querySelector(".ad-form__photo"),window.data.adFormFeatireInputs=window.data.addFormElement.querySelectorAll(".ad-form__element--wide input"),window.data.mapFilterForm=document.querySelector(".map__filters"),window.data.filterFeatireInputs=window.data.mapFilterForm.querySelectorAll("#housing-features input"),window.data.adFormResetElement=document.querySelector(".ad-form__reset"),window.data.avatarImg=document.querySelector(".ad-form-header__preview img"),window.data.adFormPhotoElement=document.querySelector(".ad-form__photo"),window.data.maxX=window.data.mapElement.clientWidth,window.data.filters=[],window.data.filterTypes={type:{name:"housing-type"},price:{name:"housing-price",count:{low:{min:0,max:9999},middle:{min:1e4,max:5e4},high:{min:50001,max:1e9}}},rooms:{name:"housing-rooms"},guests:{name:"housing-guests"},features:{name:"features"}},window.data.loadUrl="https://21.javascript.pages.academy/keksobooking/data",window.data.uploadUrl="https://21.javascript.pages.academy/keksobooking",window.data.StatusCode={OK:200,NOT_FOUND:404,BAD_REQUEST:400,UNAUTHORIZED:401},(()=>{let e=(e=0,t=1)=>Math.floor(e+Math.random()*(t+1-e));window.util={getRandomFromArray:(e=[])=>e[Math.floor(Math.random()*e.length)],getRandomInteger:e,getRandomArrayPart:t=>{let a=t.slice(),d=t.length-e(0,t.length-1),o=t.length-d;for(let t=0;t<o;t++)a.splice(e(0,a.length-1),1);return a},deleteDisabledAtrFromElements:e=>{Array.from(e).forEach((e=>{e.disabled=!1}))},setDisabledAtrToElements:e=>{Array.from(e).forEach((e=>{e.disabled=!0}))},setReadonlyAtrToElement:e=>{e.readonly=!0},onError:e=>{window.map.blockInterface(),window.error.addErrorElement(e)},onSuccess:()=>{window.map.blockInterface(),window.success.addSuccessElement()},debounce:e=>{let t=null;return(...a)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...a)}),window.data.DEBOUNCE_INTERVAL)}},loadImg:(e,t)=>{let a=e.files[0],d=a.name.toLowerCase();if(window.data.FILE_TYPES.some((e=>d.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{t.src=e.result})),e.readAsDataURL(a)}}}})(),window.load=function(e,t,a,d="GET",o){let n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{let e;switch(n.status){case window.data.StatusCode.OK:t(n.response);break;case window.data.StatusCode.BAD_REQUEST:e="Неверный запрос";break;case window.data.StatusCode.UNAUTHORIZED:e="Пользователь не авторизован";break;case window.data.StatusCode.NOT_FOUND:e="Ничего не найдено :(";break;default:e="Cтатус ответа: : "+n.status+" "+n.statusText}e&&a(e)})),n.addEventListener("error",(function(){a("Произошла ошибка соединения")})),n.addEventListener("timeout",(function(){a("Запрос не успел выполниться за "+n.timeout+"мс")})),n.timeout=1e3,n.open(d,e),n.send(o)},(()=>{let e=()=>{t()},t=()=>{let e=window.data.mainMapElement.querySelector(".map__card");e&&e.remove()};window.card={addCartElementToDOM:a=>{t();let d=(e=>{let t=window.data.cardArticleTemplate.cloneNode(!0),a=t.querySelector(".popup__feature"),d=t.querySelector(".popup__features"),o=t.querySelector(".popup__photo"),n=t.querySelector(".popup__photos"),r=t.querySelector(".popup__title"),i=t.querySelector(".popup__text--address"),w=t.querySelector(".popup__text--price"),l=t.querySelector(".popup__type"),s=t.querySelector(".popup__text--capacity"),m=t.querySelector(".popup__text--time"),c=t.querySelector(".popup__description"),u=t.querySelector(".popup__avatar");return r.textContent=e.offer.title,i.textContent=e.offer.address,w.textContent=e.offer.price+"₽/ночь",l.textContent=window.data.BUILD_TYPES[e.offer.type].translation,s.textContent=`${e.offer.rooms} комната(ы) для ${e.offer.guests} гостей`,m.textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`,c.textContent=e.offer.description,u.setAttribute("src",e.author.avatar),d.textContent="",e.offer.features.forEach((e=>{let t=a.cloneNode();t.className="popup__feature",t.classList.add("popup__feature--"+e),d.appendChild(t)})),n.textContent="",e.offer.photos.forEach((e=>{let t=o.cloneNode();t.setAttribute("src",e),n.appendChild(t)})),e.author.avatar||u.classList.add(window.data.HIDDEN_CLASS),t})(a);window.data.mapFiltersContainer.insertAdjacentElement("beforebegin",d),d.querySelector(".popup__close").addEventListener("click",e)},deleteCardElements:t}})(),(()=>{let e=e=>{window.data.adverts=e.filter((e=>e.offer)),window.map.addAdvertsToMap()};window.adverts={generateAdverts:()=>{window.load(window.data.loadUrl,e,window.util.onError)},filterAdverts:e=>0===Object.keys(window.data.filters).length?e:window.data.adverts.filter((e=>{for(let t in window.data.filters)if(window.data.filters.hasOwnProperty(t))switch(t){case window.data.filterTypes.type.name:if(e.offer.type!==window.data.filters[t])return!1;break;case window.data.filterTypes.price.name:let a=!1;if(e.offer.price>=window.data.filterTypes.price.count[window.data.filters[t]].min&&e.offer.price<=window.data.filterTypes.price.count[window.data.filters[t]].max){a=!0;break}if(!a)return!1;break;case window.data.filterTypes.rooms.name:if(e.offer.rooms!==Number(window.data.filters[t]))return!1;break;case window.data.filterTypes.guests.name:if(e.offer.guests!==Number(window.data.filters[t]))return!1;break;case window.data.filterTypes.features.name:for(let a in window.data.filters[t])if(window.data.filters[t].hasOwnProperty(a)&&-1===e.offer.features.indexOf(window.data.filters[t][a]))return!1}return!0}))}})(),(()=>{let e=(e,t)=>{let a=window.data.mapPinTemplate.cloneNode(!0),d=a.getElementsByTagName("img")[0];return d.src=e.author.avatar,d.alt=e.offer.title,a.style.left=e.location.x-window.data.PIN_WIDTH/2+"px",a.style.top=e.location.y-window.data.PIN_HEIGHT+"px",a.dataset.adverPosition=t,a};window.pin={createPin:e,createPins:t=>{let a=document.createDocumentFragment();return t.forEach(((t,d)=>{a.appendChild(e(t,d))})),a},deletePins:()=>{window.data.mapElement.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))}}})(),(()=>{let e=!1,t=[],a=()=>{t=window.data.adverts.slice(),t=window.adverts.filterAdverts(t),t=t.slice(0,5);let e=window.pin.createPins(t);window.data.mapElement.appendChild(e),s()},d=(e,t)=>{window.data.mapPinElement.style.top=e+"px",window.data.mapPinElement.style.left=t+"px"},o=()=>{e=!0,w(),window.util.deleteDisabledAtrFromElements(window.data.fieldsetElements),window.util.deleteDisabledAtrFromElements(window.data.mapFilterElements),window.data.mainMapElement.classList.remove("map--faded"),window.data.addFormElement.classList.remove("ad-form--disabled"),0===window.data.adverts.length?window.adverts.generateAdverts():a(),window.data.mapPinElement.removeEventListener("keydown",i),window.move.setMoveHandlers()},n=(e,t)=>{window.data.addressInput.value=`${e}, ${t}`},r=e=>{0===e.button&&o()},i=e=>{13===e.keyCode&&o()},w=()=>{let e=window.data.mapPinElement.offsetTop,t=window.data.mapPinElement.offsetLeft;n(t+window.data.MAP_PIN_WIDTH/2,e+window.data.MAP_PIN_HEIGHT)},l=e=>{let a=e.target.closest("button");if(a&&a.classList.contains("map__pin")&&!a.classList.contains("map__pin--main")){let e=t[a.dataset.adverPosition];window.card.addCartElementToDOM(e)}},s=()=>{document.addEventListener("click",l)};window.map={addMapPinHandlers:()=>{window.data.mapPinElement.addEventListener("mousedown",r),window.data.mapPinElement.addEventListener("keydown",i)},setStartAddress:()=>{let e=window.data.mapPinElement.offsetTop+window.data.MAP_PIN_HEIGHT/2,t=window.data.mapPinElement.offsetLeft+window.data.MAP_PIN_WIDTH/2;n(t,e)},addPinHandlers:s,addAdvertsToMap:a,activateInterface:o,blockInterface:()=>{d(window.data.MAIN_PIT_TOP,window.data.MAIN_PIT_LEFT),window.util.setReadonlyAtrToElement(window.data.addressInput),window.map.setStartAddress(),window.util.setDisabledAtrToElements(window.data.fieldsetElements),window.util.setDisabledAtrToElements(window.data.mapFilterElements),e&&(window.pin.deletePins(),window.card.deleteCardElements(),window.data.mainMapElement.classList.add("map--faded"),window.data.addFormElement.classList.add("ad-form--disabled"),window.data.mapPinElement.addEventListener("keydown",i),document.removeEventListener("click",l),window.form.clearForm(),window.filter.clearFilter(),window.move.deleteMoveHandlers()),e=!1},clearMapHandlers:()=>{document.addEventListener("keydown",(e=>{27===e.keyCode&&(window.card.deleteCardElements(),window.error.deleteErrorElement(),window.success.deleteSuccessElement())})),document.addEventListener("mousedown",(()=>{window.error.deleteErrorElement(),window.success.deleteSuccessElement()}))},setAddress:n,setMapPinElementPosition:d}})(),(()=>{let e=e=>{let t=e.value,a=window.data.typeInput.value;t<Number(e.placeholder)?e.setCustomValidity("Минимальная цена для этого типа жилья "+window.data.BUILD_TYPES[a].price):e.setCustomValidity(""),e.reportValidity()},t=(e,t,a)=>{t>0&&t>a&&100!==a?e.setCustomValidity(`Гостей (${t}) больше, чем комнат (${a})`):0===t&&100!==a?e.setCustomValidity("Требуется 100 комнат."):0!==t&&100===a?e.setCustomValidity("Аренда не для гостей"):e.setCustomValidity(""),e.reportValidity()},a=t=>{t.target.matches("#title")?(e=>{let t=e.value.length;t<window.data.MIN_TITLE_LENGTH?e.setCustomValidity("Ещё "+(window.data.MIN_TITLE_LENGTH-t)+" симв."):t>window.data.MAX_TITLE_LENGTH?e.setCustomValidity("Удалите лишние "+(t-window.data.MAX_TITLE_LENGTH)+" симв."):e.setCustomValidity(""),e.reportValidity()})(t.target):t.target.matches("#price")&&e(t.target)},d=a=>{var d,o;a.target.matches("#type")?(o=a.target,window.data.priceInput.placeholder=window.data.BUILD_TYPES[o.value].price,e(window.data.priceInput)):a.target.matches("#timein")||a.target.matches("#timeout")?(d=a.target.value,window.data.timeinSelect.value=window.data.timeoutSelect.value=d):a.target.matches("#room_number")?(e=>{let a=Number(window.data.capacitySelect.value),d=Number(e.value);t(e,a,d),t(window.data.capacitySelect,a,d)})(a.target):a.target.matches("#capacity")?(e=>{let a=Number(window.data.roomNumberSelect.value),d=Number(e.value);t(e,d,a),t(window.data.roomNumberSelect,d,a)})(a.target):a.target.matches("#avatar")?window.util.loadImg(a.target,window.data.avatarImg):a.target.matches("#images")&&(e=>{let t=document.createElement("img");t.style.width="100%",t.style.height="100%",window.util.loadImg(e,t),window.data.adFormPhotoElement.textContent="",window.data.adFormPhotoElement.append(t)})(a.target)},o=e=>{e.preventDefault(),window.load(window.data.uploadUrl,window.util.onSuccess,window.util.onError,"POST",new FormData(window.data.addFormElement))},n=e=>{e.preventDefault(),window.map.blockInterface()};window.form={addFormHandlers:()=>{window.data.addFormElement.addEventListener("input",a),window.data.addFormElement.addEventListener("change",d),window.data.addFormElement.addEventListener("submit",o),window.data.adFormResetElement.addEventListener("click",n)},clearForm:()=>{window.data.addFormElement.querySelector("#title").value="",window.data.addFormElement.querySelector("#price").value="",window.data.addFormElement.querySelector("#price").placeholder="1000",window.data.addFormElement.querySelector("#description").value="",window.data.addFormElement.querySelector("#type").value="flat",window.data.addFormElement.querySelector("#timein").value="12:00",window.data.addFormElement.querySelector("#timeout").value="12:00",window.data.addFormElement.querySelector("#room_number").value="1",window.data.addFormElement.querySelector("#capacity").value="1",window.data.addFormElement.querySelector("#images").value="",window.data.addFormElement.querySelector("#avatar").value="",window.data.headerPreviewImgElement.src="img/muffin-grey.svg",window.data.adFormPhotoElement.textContent="",Array.from(window.data.adFormFeatireInputs).forEach((e=>{e.checked=!1}))}}})(),(()=>{let e=window.util.debounce((e=>{e.preventDefault(),(()=>{window.data.filters=[];let e=new FormData(window.data.mapFilterForm);e=e.entries();let t=e.next();for(;void 0!==t.value;)"any"!==t.value[1]?("features"===t.value[0]?(window.data.filters[t.value[0]]||(window.data.filters[t.value[0]]=[]),window.data.filters[t.value[0]].push(t.value[1])):window.data.filters[t.value[0]]=t.value[1],t=e.next()):t=e.next();window.pin.deletePins(),window.card.deleteCardElements(),window.map.addAdvertsToMap()})()}));window.filter={clearFilter:()=>{window.data.mapFilterForm.querySelector("#housing-type").value="any",window.data.mapFilterForm.querySelector("#housing-price").value="any",window.data.mapFilterForm.querySelector("#housing-rooms").value="any",window.data.mapFilterForm.querySelector("#housing-guests").value="any",window.data.filters=[],Array.from(window.data.filterFeatireInputs).forEach((e=>{e.checked=!1}))},setMapFilterFormHandlers:()=>{window.data.mapFilterForm.addEventListener("change",e)}}})(),(()=>{let e=e=>{e.preventDefault();let t={x:e.pageX,y:e.pageY},a=e=>{e.preventDefault();let a=t.x-e.pageX,d=t.y-e.pageY;t={x:e.pageX,y:e.pageY};let o=window.data.mapPinElement.offsetTop-d,n=window.data.mapPinElement.offsetLeft-a;o<window.data.MIN_Y-window.data.MAP_PIN_HEIGHT?o=window.data.MIN_Y-window.data.MAP_PIN_HEIGHT:o>window.data.MAX_Y-window.data.MAP_PIN_HEIGHT&&(o=window.data.MAX_Y-window.data.MAP_PIN_HEIGHT),n<0-window.data.MAP_PIN_WIDTH/2?n=-window.data.MAP_PIN_WIDTH/2:n>window.data.maxX-window.data.MAP_PIN_WIDTH/2&&(n=window.data.maxX-window.data.MAP_PIN_WIDTH/2),window.map.setAddress(n+window.data.MAP_PIN_WIDTH/2,o+window.data.MAP_PIN_HEIGHT),window.map.setMapPinElementPosition(o,n)},d=e=>{e.preventDefault(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",d)};window.move={setMoveHandlers:()=>{window.data.mapPinElement.addEventListener("mousedown",e)},deleteMoveHandlers:()=>{window.data.mapPinElement.removeEventListener("mousedown",e)}}})(),window.handlers={setHandlers:()=>{window.form.addFormHandlers(),window.map.addMapPinHandlers(),window.map.clearMapHandlers(),window.filter.setMapFilterFormHandlers()}},(()=>{let e,t,a=()=>{d()},d=()=>{e&&e.remove()};window.error={addErrorElement:d=>{e||(e=window.data.errorTemplate.cloneNode(!0)),t=e.querySelector(".error__button"),e.querySelector(".error__button").textContent=d,window.data.mapElement.insertAdjacentElement("beforebegin",e),t.addEventListener("click",a)},deleteErrorElement:d}})(),(()=>{let e;window.success={addSuccessElement:()=>{e||(e=window.data.successTemplate.cloneNode(!0)),window.data.mapElement.insertAdjacentElement("beforebegin",e)},deleteSuccessElement:()=>{e&&e.remove()}}})(),window.map.blockInterface(),window.handlers.setHandlers()})();
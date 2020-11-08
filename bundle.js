(()=>{"use strict";(()=>{const e=["gif","jpg","jpeg","png"];window.util={toggleDisabledOnFormNodes:(e,t)=>{Array.from(e).forEach((e=>{e.disabled=t}))},onSuccess:()=>{window.map.blockInterface(),window.success.addSuccessElement()},debounce:e=>{let t=null;return(...r)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...r)}),500)}},loadImg:(t,r)=>{let o=t.files[0],n=o.name.toLowerCase();if(e.some((e=>n.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{r.src=e.result})),e.readAsDataURL(o)}}}})(),window.load=(e,t,r,o="GET",n)=>{let a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",(()=>{let e;switch(a.status){case 200:t(a.response);break;case 400:e="Неверный запрос";break;case 401:e="Пользователь не авторизован";break;case 404:e="Ничего не найдено :(";break;default:e="Cтатус ответа: : "+a.status+" "+a.statusText}e&&r(e)})),a.addEventListener("error",(()=>{r("Произошла ошибка соединения")})),a.addEventListener("timeout",(()=>{r("Запрос не успел выполниться за "+a.timeout+"мс")})),a.timeout=1e3,a.open(o,e),a.send(n)},(()=>{const e={palace:{translation:"Дворец",price:1e4},flat:{translation:"Квартира",price:1e3},house:{translation:"Дом",price:5e3},bungalow:{translation:"Бунгало",price:0}},t=document.querySelector(".map__filters-container"),r=document.querySelector("#card").content.querySelector(".map__card");let o=()=>{n()},n=()=>{let e=window.map.mainMapElement.querySelector(".map__card");e&&e.remove()};window.card={BUILD_TYPES:e,addCartElementToDOM:a=>{n();let d=(t=>{let o=r.cloneNode(!0),n=o.querySelector(".popup__feature"),a=o.querySelector(".popup__features"),d=o.querySelector(".popup__photo"),l=o.querySelector(".popup__photos"),i=o.querySelector(".popup__title"),s=o.querySelector(".popup__text--address"),c=o.querySelector(".popup__text--price"),u=o.querySelector(".popup__type"),m=o.querySelector(".popup__text--capacity"),p=o.querySelector(".popup__text--time"),w=o.querySelector(".popup__description"),f=o.querySelector(".popup__avatar");return i.textContent=t.offer.title,s.textContent=t.offer.address,c.textContent=t.offer.price+"₽/ночь",u.textContent=e[t.offer.type].translation,m.textContent=`${t.offer.rooms} комната(ы) для ${t.offer.guests} гостей`,p.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,w.textContent=t.offer.description,f.src=t.author.avatar,a.textContent="",t.offer.features.forEach((e=>{let t=n.cloneNode();t.className="popup__feature",t.classList.add("popup__feature--"+e),a.appendChild(t)})),l.textContent="",t.offer.photos.forEach((e=>{let t=d.cloneNode();t.src=e,l.appendChild(t)})),t.author.avatar||f.classList.add("visually-hidden"),o})(a);t.insertAdjacentElement("beforebegin",d),d.querySelector(".popup__close").addEventListener("click",o)},deleteCardElements:n}})(),(()=>{const e="housing-type",t="housing-price",r={low:{min:0,max:9999},middle:{min:1e4,max:5e4},high:{min:5e4}},o="housing-rooms",n="housing-guests",a="features";let d=e=>{window.advert.loadedAdverts=e.filter((e=>e.offer)),window.map.addAdvertsToMap()};window.advert={loadedAdverts:[],generateAdverts:()=>{window.load("https://21.javascript.pages.academy/keksobooking/data",d,window.error.addDownloadError)},filterAdverts:d=>0===Object.keys(window.filter.filters).length?d:window.advert.loadedAdverts.filter((d=>{for(let l in window.filter.filters)if(window.filter.filters.hasOwnProperty(l))switch(l){case e:if(d.offer.type!==window.filter.filters[l])return!1;break;case t:let i=!1;if(d.offer.price>=r[window.filter.filters[l]].min&&(i=!0),r[window.filter.filters[l]].max&&d.offer.price>r[window.filter.filters[l]].max)return!1;if(!i)return!1;break;case o:if(d.offer.rooms!==Number(window.filter.filters[l]))return!1;break;case n:if(d.offer.guests!==Number(window.filter.filters[l]))return!1;break;case a:for(let e in window.filter.filters[l])if(window.filter.filters[l].hasOwnProperty(e)&&-1===d.offer.features.indexOf(window.filter.filters[l][e]))return!1}return!0}))}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");let t=(t,r)=>{let o=e.cloneNode(!0),n=o.querySelector("img");return n.src=t.author.avatar,n.alt=t.offer.title,o.style.left=t.location.x-25+"px",o.style.top=t.location.y-70+"px",o.dataset.adverPosition=r,o};window.pin={createPin:t,createPins:e=>{let r=document.createDocumentFragment();return e.forEach(((e,o)=>{r.appendChild(t(e,o))})),r},deletePins:()=>{window.map.mapElement.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))}}})(),(()=>{const e=document.querySelectorAll("fieldset"),t=document.querySelectorAll(".map__filter"),r=document.querySelector("#address"),o=document.querySelector(".map__pins"),n=document.querySelector(".map__pin--main"),a=document.querySelector(".map");let d=!1,l=[],i=()=>{l=window.advert.loadedAdverts.slice(),l=window.advert.filterAdverts(l),l=l.slice(0,5);let e=window.pin.createPins(l);o.appendChild(e),y()},s=(e,t)=>{n.style.top=e+"px",n.style.left=t+"px"},c=()=>{d=!0,f(),window.util.toggleDisabledOnFormNodes(e,!1),window.util.toggleDisabledOnFormNodes(t,!1),a.classList.remove("map--faded"),window.form.addFormElement.classList.remove("ad-form--disabled"),0===window.advert.loadedAdverts.length?window.advert.generateAdverts():i(),n.removeEventListener("keydown",p),n.removeEventListener("mousedown",m)},u=(e,t)=>{r.value=`${e}, ${t}`},m=e=>{e.preventDefault(),0===e.button&&c()},p=e=>{e.preventDefault(),13===e.keyCode&&c()},w=()=>{n.addEventListener("mousedown",m),n.addEventListener("keydown",p)},f=()=>{let e=n.offsetTop,t=n.offsetLeft;u(t+32,e+70)},v=e=>{let t=e.target.closest("button");if(t&&t.classList.contains("map__pin")&&!t.classList.contains("map__pin--main")){let e=l[t.dataset.adverPosition];window.card.addCartElementToDOM(e)}},y=()=>{document.addEventListener("click",v)};window.map={MAP_PIN_WIDTH:64,MAP_PIN_HEIGHT:70,mapElement:o,mapPinElement:n,mainMapElement:a,addMapPinHandlers:w,setStartAddress:()=>{let e=n.offsetTop+35,t=n.offsetLeft+32;u(t,e)},addPinHandlers:y,addAdvertsToMap:i,activateInterface:c,blockInterface:()=>{s(375,570),window.map.setStartAddress(),window.util.toggleDisabledOnFormNodes(e,!0),window.util.toggleDisabledOnFormNodes(t,!0),d&&(window.pin.deletePins(),window.card.deleteCardElements(),a.classList.add("map--faded"),window.form.addFormElement.classList.add("ad-form--disabled"),n.addEventListener("keydown",p),document.removeEventListener("click",v),window.form.clearForm(),window.filter.clearFilter()),d=!1,w()},clearMapHandlers:()=>{document.addEventListener("keydown",(e=>{27===e.keyCode&&(window.card.deleteCardElements(),window.error.deleteErrorElement(),window.success.deleteSuccessElement())})),document.addEventListener("mousedown",(()=>{window.error.deleteErrorElement(),window.success.deleteSuccessElement()}))},setAddress:u,setMapPinElementPosition:s}})(),(()=>{const e=document.querySelector("#price"),t=document.querySelector("#timein"),r=document.querySelector("#timeout"),o=document.querySelector("#room_number"),n=document.querySelector("#capacity"),a=document.querySelector("#type"),d=document.querySelector(".ad-form"),l=d.querySelector(".ad-form-header__preview img"),i=d.querySelector(".ad-form__photo"),s=d.querySelectorAll(".ad-form__element--wide input"),c=document.querySelector(".ad-form__reset"),u=document.querySelector(".ad-form-header__preview img");let m=e=>{let t=e.value,r=a.value;t<Number(e.placeholder)?e.setCustomValidity("Минимальная цена для этого типа жилья "+window.card.BUILD_TYPES[r].price):e.setCustomValidity(""),e.reportValidity()},p=(e,t,r)=>{t>0&&t>r&&100!==r?e.setCustomValidity(`Гостей (${t}) больше, чем комнат (${r})`):0===t&&100!==r?e.setCustomValidity("Требуется 100 комнат."):0!==t&&100===r?e.setCustomValidity("Аренда не для гостей"):e.setCustomValidity(""),e.reportValidity()},w=e=>{e.target.matches("#title")?(e=>{let t=e.value.length;t<30?e.setCustomValidity("Ещё "+(30-t)+" симв."):t>100?e.setCustomValidity("Удалите лишние "+(t-100)+" симв."):e.setCustomValidity(""),e.reportValidity()})(e.target):e.target.matches("#price")&&m(e.target)},f=a=>{var d,l;a.target.matches("#type")?(l=a.target,e.placeholder=window.card.BUILD_TYPES[l.value].price,e.min=window.card.BUILD_TYPES[l.value].price,m(e)):a.target.matches("#timein")||a.target.matches("#timeout")?(d=a.target.value,t.value=r.value=d):a.target.matches("#room_number")?(e=>{let t=Number(n.value),r=Number(e.value);p(e,t,r),p(n,t,r)})(a.target):a.target.matches("#capacity")?(e=>{let t=Number(o.value),r=Number(e.value);p(e,r,t),p(o,r,t)})(a.target):a.target.matches("#avatar")?window.util.loadImg(a.target,u):a.target.matches("#images")&&(e=>{let t=document.createElement("img");t.style.width="100%",t.style.height="100%",window.util.loadImg(e,t),i.textContent="",i.append(t)})(a.target)},v=e=>{e.preventDefault(),window.load("https://21.javascript.pages.academy/keksobooking",window.util.onSuccess,window.error.addUploadError,"POST",new FormData(d))},y=e=>{e.preventDefault(),window.map.blockInterface()};window.form={addFormElement:d,addFormHandlers:()=>{d.addEventListener("input",w),d.addEventListener("change",f),d.addEventListener("submit",v),c.addEventListener("click",y)},clearForm:()=>{d.querySelector("#title").value="",d.querySelector("#price").value="",d.querySelector("#price").placeholder="1000",d.querySelector("#description").value="",d.querySelector("#type").value="flat",d.querySelector("#timein").value="12:00",d.querySelector("#timeout").value="12:00",d.querySelector("#room_number").value="1",d.querySelector("#capacity").value="1",d.querySelector("#images").value="",d.querySelector("#avatar").value="",l.src="img/muffin-grey.svg",i.textContent="",Array.from(s).forEach((e=>{e.checked=!1}))}}})(),(()=>{const e=document.querySelector(".map__filters"),t=e.querySelectorAll("#housing-features input");let r=[],o=window.util.debounce((t=>{t.preventDefault(),(()=>{r=[];let t=new FormData(e);t=t.entries();let o=t.next();for(;void 0!==o.value;)"any"!==o.value[1]?("features"===o.value[0]?(r[o.value[0]]||(r[o.value[0]]=[]),r[o.value[0]].push(o.value[1])):r[o.value[0]]=o.value[1],o=t.next()):o=t.next();window.filter.filters=r,window.pin.deletePins(),window.card.deleteCardElements(),window.map.addAdvertsToMap()})()}));window.filter={filters:r,clearFilter:()=>{e.querySelector("#housing-type").value="any",e.querySelector("#housing-price").value="any",e.querySelector("#housing-rooms").value="any",e.querySelector("#housing-guests").value="any",window.filter.filters=[],Array.from(t).forEach((e=>{e.checked=!1}))},setMapFilterFormHandlers:()=>{e.addEventListener("change",o)}}})(),(()=>{const e=window.map.mapElement.clientWidth;let t=t=>{t.preventDefault();let r={x:t.pageX,y:t.pageY},o=t=>{t.preventDefault();let o=r.x-t.pageX,n=r.y-t.pageY;r={x:t.pageX,y:t.pageY};let a=window.map.mapPinElement.offsetTop-n,d=window.map.mapPinElement.offsetLeft-o;a<130-window.map.MAP_PIN_HEIGHT?a=130-window.map.MAP_PIN_HEIGHT:a>630-window.map.MAP_PIN_HEIGHT&&(a=630-window.map.MAP_PIN_HEIGHT),d<0-window.map.MAP_PIN_WIDTH/2?d=-window.map.MAP_PIN_WIDTH/2:d>e-window.map.MAP_PIN_WIDTH/2&&(d=e-window.map.MAP_PIN_WIDTH/2),window.map.setAddress(d+window.map.MAP_PIN_WIDTH/2,a+window.map.MAP_PIN_HEIGHT),window.map.setMapPinElementPosition(a,d)},n=e=>{e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",n)};window.move={setMoveHandlers:()=>{window.map.mapPinElement.addEventListener("mousedown",t)},deleteMoveHandlers:()=>{window.map.mapPinElement.removeEventListener("mousedown",t)}}})(),window.handlers={setHandlers:()=>{window.form.addFormHandlers(),window.map.addMapPinHandlers(),window.map.clearMapHandlers(),window.filter.setMapFilterFormHandlers(),window.move.setMoveHandlers()}},(()=>{const e=document.querySelector("#error").content.querySelector(".error"),t=document.querySelector("#load_error").content.querySelector(".load_error"),r=e.querySelector(".error__button");let o,n=()=>{d()},a=()=>{window.map.mapElement.insertAdjacentElement("beforebegin",o),o.addEventListener("click",n)},d=()=>{o&&o.remove()};window.error={addDownloadError:e=>{d(),o=t.cloneNode(!0),o.textContent=e,a()},addUploadError:t=>{d(),o=e.cloneNode(!0),r.textContent=t,a(),window.map.blockInterface()},deleteErrorElement:d}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success");let t;window.success={addSuccessElement:()=>{t||(t=e.cloneNode(!0)),window.map.mapElement.insertAdjacentElement("beforebegin",t)},deleteSuccessElement:()=>{t&&t.remove()}}})(),window.map.blockInterface(),window.handlers.setHandlers()})();
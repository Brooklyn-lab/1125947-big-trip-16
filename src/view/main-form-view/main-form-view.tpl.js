import { TRIP_EVENT_TYPE, DAY_TIME_FORMAT } from '../../const';
import { formatDate } from '../../utils/common';

const createPicturesTemplate = (pictures) => { 
  if (pictures) {
    const images = pictures.map((picture) => (
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    )).join(' ');

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${images}
        </div>
      </div>
    `;
  } else {
    return '';
  }
};

const createEditOfferTemplate = (offers, typeOffer) => {
  let isSelected = false;
  const selectedTypeOffer = offers.find((offer) => offer.id === typeOffer.id);

  if (selectedTypeOffer !== undefined) {
    isSelected = true;
  }
  
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${typeOffer.id}" type="checkbox" name="event-offer-luggage" data-id="${typeOffer.id}" data-title="${typeOffer.title}" data-price="${typeOffer.price}" ${isSelected ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-luggage-${typeOffer.id}">
        <span class="event__offer-title">${typeOffer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${typeOffer.price}</span>
      </label>
    </div>`
  );
};

const createEditOffersTemplate = (type, offers, newOffers) => newOffers[type].map((typeOffer) => createEditOfferTemplate(offers, typeOffer)).join('');

const createTypeTemplate = (id, type, currentType) => {
  const isChecked = currentType === type ? 'checked' : '';

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class ="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>`
  );
};

const typesInLowerCase = TRIP_EVENT_TYPE.map((type) => type.toLowerCase());

const createTypeListTemplate = (id, currentType) => typesInLowerCase.map((type) => createTypeTemplate(id, type, currentType)).join('');

const createDropdownCity = (newDestination) => newDestination.map((destination) => `<option value='${destination.name}'></option>`).join('\n');

const createTripEditTimeTemplate = (id, dateFromValue, dateToValue, isDisabled) => (`
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDate(dateFromValue, DAY_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDate(dateToValue, DAY_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
  </div>`
);

export const createMainFormTemplate = (data, newOffers, newDestinations) => {
  const { id, basePrice, dateFrom, dateTo, destination, offers, type, isDisabled, isSaving, isDeleting } = data;
  const timeTemplate = createTripEditTimeTemplate(id, dateFrom, dateTo, isDisabled);
  const isSubmit = (dateFrom > dateTo || basePrice <= 0 || destination.name === '');
  const isNewPoint = !id;
  const createButtonChangeText = () => {
    if (isNewPoint) {return 'Cancel';}
    if (!isNewPoint && isDeleting) {return 'Deleting...';}
    if (!isNewPoint && !isDeleting) {return 'Delete';}
    return '';
  };

  let showDestination = '';

  if (destination.name.length === 0) {
    showDestination = 'visually-hidden';
  }

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeListTemplate(id, type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-${id}">
            ${createDropdownCity(newDestinations)}
          </datalist>
        </div>
        ${timeTemplate}
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="number" min = 0 name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''} />
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmit || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${createButtonChangeText()}</button>
        ${id ? 
          `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` 
          : ''
        }
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createEditOffersTemplate(type, offers, newOffers)}
          </div>
        </section>
      <section class="event__section  event__section--destination ${showDestination}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description ">${destination.description}</p>
        ${createPicturesTemplate(destination.pictures)}
      </section>
      </section>
    </form>
  </li>`;
};


import { TRIP_EVENT_TYPE, POINTS_NAMES } from '../../utils/task';
import { formatDate } from '../../utils/common';
import { DAY_TIME_FORMAT } from '../../const';

const imageTemplate = (pictures) => {
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
};

// function offerTemplate() {
//   if (offers) {
//     const eventOffer = offers.map((offer) => (
//       `<div class="event__offer-selector">
//         <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" checked>
//           <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
//             <span class="event__offer-title">${offer.title}</span>
//             &plus;&euro;&nbsp;
//             <span class="event__offer-price">${offer.price}</span>
//           </label>
//         </div>`)
//     );

//     return `<div class="event__available-offers">
//           ${eventOffer.join('')}
//         </div>`;
//   } else {
//     return '';
//   }
// }

// const destinationOffers = offers !== undefined ? `${offerTemplate()}` : ' ';

const offerTemplate = (offer) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox" name="event-offer-luggage" data-id="${offer.id}" data-title="${offer.title}" data-price="${offer.price}">
      <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
);

const destinationOffers = (offers) => {
  debugger;
  return offers.map((offer) => offerTemplate(offer)).join('')
};

const getEventList = (array) => array.map((tripEvent) =>
  `<div class="event__type-item">
    <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}">
    <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
  </div>`).join('');

const dropdownCity = (citys) => citys.map((citysName) => `<option value='${citysName}'></option>`).join('');

const createTripEditTimeTemplate = (id, dateFromValue, dateToValue, isDisabled) => (`
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatDate(dateFromValue, DAY_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatDate(dateToValue, DAY_TIME_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
  </div>`
);

export const createMainFormTemplate = (data) => {
  const { id, basePrice, dateFrom, dateTo, destination, offers, type, isDisabled, isSaving, isDeleting } = data;

  const destinationDescriptopn =
    destination.description !== undefined
      ? `<p class="event__destination-description">${destination.description}</p>`
      : ' ';

  const destinationImages =
    destination.pictures !== undefined
      ? `${imageTemplate(destination.pictures)}`
      : ' ';

  const destinationTemplate =
    destinationImages && destinationDescriptopn !== false
      ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destinationDescriptopn}
        ${destinationImages}
      </section>`
      : ' ';

  const timeTemplate = createTripEditTimeTemplate(id, dateFrom, dateTo, isDisabled);
  const isSubmitDisabled = (dateFrom > dateTo);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${getEventList(TRIP_EVENT_TYPE)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${dropdownCity(POINTS_NAMES)}
            </datalist>
        </div>
        ${timeTemplate}
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min = 0 name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''} />
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${destinationOffers(offers)}
          </div>
        </section>
        ${destinationTemplate}
      </section>
    </form>
  </li>`;
};



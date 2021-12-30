import { generateDate, TripEventType, POINTS_NAMES } from '../../mock/task';

export const createMainFormTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: { name, description, pictures },
    offer: { type, offers },
  } = point;

  function imageTemplate() {
    const images = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);

    return `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${images.join(' ')}
          </div>
        </div>
      `;
  }

  const destinationDescriptopn =
    description !== undefined
      ? `<p class="event__destination-description">${description}</p>`
      : ' ';

  const destinationImages = pictures !== undefined ? `${imageTemplate()}` : ' ';

  const destinationTemplate =
    destinationImages && destinationDescriptopn !== false
      ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destinationDescriptopn}
        ${destinationImages}
      </section>`
      : ' ';

  function offerTemplate() {
    const offer = offers.map((item) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${item.id}" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-${item.id}">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>`)
    );

    return `<div class="event__available-offers">
          ${offer.join(' ')}
        </div>`;
  }

  const getEventList = () => Object.values(TripEventType).map((tripEvent) =>
    `<div class="event__type-item">
      <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}">
      <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
    </div>`).join('');

  const destinationOffers = offers !== undefined ? `${offerTemplate()}` : ' ';

  const dropdownCity = (citys) => citys.map((citysName) => `<option value='${citysName}'></option>`).join('');

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
                ${getEventList()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${dropdownCity(POINTS_NAMES)}
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${generateDate(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${generateDate(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro; ${basePrice}
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              ${destinationOffers}
          </section>

          ${destinationTemplate}
        </section>
    </form>
  </li>`;
};


import SmartView from '../smart-view';
import { createMainFormTemplate } from './main-form-view.tpl';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import 'flatpickr/dist/flatpickr.min.css';

const EMPTY_POINT = {
  id: null,
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: {},
  isFavorite: false,
  offers: []
};

export default class MainFormView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor() {
    super();
    this._data = MainFormView.parsePointToData(EMPTY_POINT);
    this.#setInnerHandlers();
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createMainFormTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();
  }

  reset = (point) => {
    this.updateData(
      MainFormView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(MainFormView.parseDataToPoint(this._data));
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(MainFormView.parseDataToPoint(this._data));
  }


  #setDateFromPicker = () => {
    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('input[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: dayjs(this._data.dateFrom).toISOString(),
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDateToPicker = () => {
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
    this.#dateToPicker = flatpickr(
      this.element.querySelector('input[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        ['time_24hr']: true,
        enableTime: true,
        defaultDate: dayjs(this._data.dateTo).toISOString(),
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceInputElement = this.element.querySelector('.event__input--price');

    if (evt.target.value !== '') {
      priceInputElement.setCustomValidity('');
      this.updateData({
        basePrice: Number(evt.target.value)
      }, true);
    } else {
      priceInputElement.setCustomValidity('Enter price');
    }
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationInputElement = this.element.querySelector('.event__input--destination');
    // доделать...
    if (evt.target.value) {
      this.updateData({
        destination: {
          name: '',
          description: '',
          pictures: '',
        }
      });
    } else {
      destinationInputElement.setCustomValidity('Choose name from list');
    }
  }

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    const checkedOffersValues = checkedOffers.map((offer) => ({
      id: Number(offer.dataset.id),
      title: offer.dataset.title,
      price: Number(offer.dataset.price),
    }));

    this.updateData({
      offers: checkedOffersValues,
    }, true);
  }

  static parsePointToData = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}


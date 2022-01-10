import SmartView from '../smart-view';
import { createMainFormTemplate } from './main-form-view.tpl';
import flatpickr from 'flatpickr';
import { getOffer, randomLinks, randomStrings, DESCRIPTION, getDestinationName } from '../../mock/task';

import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

export default class MainFormView extends SmartView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(point) {
    super();
    this._data = MainFormView.parsePointToData(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createMainFormTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  reset = (point) => {
    this.updateData(
      MainFormView.parsePointToData(point),
    );
  }

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = { ...this._data, ...update };

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  #setDatepicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
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
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      offer: getOffer(evt.target.value)
    });
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceInputElement = this.element.querySelector('.event__input--price');

    if (evt.target.value !== '') {
      priceInputElement.setCustomValidity('');
      this.updateData({
        basePrice: evt.target.value,
      }, true);
    } else {
      priceInputElement.setCustomValidity('Enter price');
    }
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = getDestinationName(evt.target.value);
    const destinationInputElement = this.element.querySelector('.event__input--destination');

    if (destination) {
      this.updateData({
        destination: {
          name: evt.target.value,
          description: randomStrings(DESCRIPTION),
          pictures: randomLinks(DESCRIPTION),
        }
      });
    } else {
      destinationInputElement.setCustomValidity('Choose name from list');
    }
  }

  static parsePointToData = (point) => ({ ...point });
  static parseDataToPoint = (data) => ({ ...data });
}


import AbstractView from '../abstract-view';
import SmartView from '../smart-view';
import { createMainFormTemplate } from './main-form-view.tpl';
import { isPointRepeaing } from '../../utils/task';

export default class MainFormView extends SmartView {
  constructor(point) {
    super();
    this._data = MainFormView.parsePointToData(point);
  }

  get template() {
    return createMainFormTemplate(this._data);
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
    this._callback.editClick(this._data);
  }

  static parsePointToData = (point) => ({
    ...point,
    // isOffers: isPointRepeaing(point.offers),
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    if (!point.isOffers) {
      point.offers = null;
    }

    delete point.isOffers;

    return point;
  }
}

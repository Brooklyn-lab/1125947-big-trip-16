import SmartView from '../smart-view';
import { createMainFormTemplate } from './main-form-view.tpl';

export default class MainFormView extends SmartView {
  constructor(point) {
    super();
    this._data = MainFormView.parsePointToData(point);

    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
  }

  get template() {
    return createMainFormTemplate(this._data);
  }

  updateData = (update) => {
    if(!update) {
      return;
    }

    this._data = {...this._data, ...update};

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
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

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  static parsePointToData = (point) => ({...point});
  static parseDataToPoint = (data) => ({...data});
}



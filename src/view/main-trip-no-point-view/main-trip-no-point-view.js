import AbstractView from '../abstract-view';
import { createNoPointTemplate } from './main-trip-no-point-view.tpl';

export default class NoPointView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoPointTemplate(this._data);
  }
}


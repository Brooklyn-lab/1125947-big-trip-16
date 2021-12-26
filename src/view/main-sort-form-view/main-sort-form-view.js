import AbstractView from '../abstract-view';
import { createMainSortFormTemplate } from './main-sort-form-view.tpl';

export default class MainSortFormView extends AbstractView {
  get template() {
    return createMainSortFormTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}


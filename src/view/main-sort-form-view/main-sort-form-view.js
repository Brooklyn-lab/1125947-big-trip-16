import AbstractView from '../abstract-view';
import { createMainSortFormTemplate } from './main-sort-form-view.tpl';

export default class MainSortFormView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createMainSortFormTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__input')) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}


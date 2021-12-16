import { createElement } from '../render.js';

const createMainTripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class MainTripListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMainTripListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

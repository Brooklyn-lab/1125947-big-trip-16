import { createElement } from '../render.js';

const createHeaderMenuTemplate = () => (
   `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">Table</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
   </nav>`
);

export default class HeaderMenuView {
   #element = null;

   get element() {
      if (!this.#element) {
         this.#element = createElement(this.template);
      }

      return this.#element;
   }

   get template() {
      return createHeaderMenuTemplate();
   }

   removeElement() {
      this.#element = null;
   }
}


import AbstractView from '../abstract-view';
import { createHeaderInfoTemplate } from './header-info-view.tpl';

export default class HeaderInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points);
  }
}


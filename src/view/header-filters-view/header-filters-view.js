import AbstractView from '../abstract-view';
import { createHeaderFiltersTemplate } from './header-filters-view.tlp.js';

export default class HeaderFiltersView extends AbstractView {
  get template() {
    return createHeaderFiltersTemplate();
  }
}


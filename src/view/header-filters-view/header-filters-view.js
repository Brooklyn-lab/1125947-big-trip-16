import AbstractView from '../abstract-view';
import { createHeaderFiltersTemplate } from './header-filters-view.tpl.js';

export default class HeaderFiltersView extends AbstractView {
  get template() {
    return createHeaderFiltersTemplate();
  }
}


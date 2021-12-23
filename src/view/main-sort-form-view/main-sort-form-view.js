import AbstractView from '../abstract-view';
import { createMainSortFormTemplate } from './main-sort-form-view.tlp';

export default class MainSortFormView extends AbstractView {
  get template() {
    return createMainSortFormTemplate();
  }
}

import AbstractView from '../abstract-view';
import { createHeaderInfoTemplate } from './header-info-view.tlp';

export default class HeaderInfoView extends AbstractView {
  get template() {
    return createHeaderInfoTemplate();
  }
}


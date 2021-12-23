import AbstractView from '../abstract-view';
import { createHeaderMenuTemplate } from './header-menu-view.tlp';

export default class HeaderMenuView extends AbstractView {
  get template() {
    return createHeaderMenuTemplate();
  }
}



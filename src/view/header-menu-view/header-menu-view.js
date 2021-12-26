import AbstractView from '../abstract-view';
import { createHeaderMenuTemplate } from './header-menu-view.tpl';

export default class HeaderMenuView extends AbstractView {
  get template() {
    return createHeaderMenuTemplate();
  }
}



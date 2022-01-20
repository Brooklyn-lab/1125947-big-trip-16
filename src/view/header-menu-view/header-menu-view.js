import { MenuItem } from '../../const';
import SmartView from '../smart-view';
import { createHeaderMenuTemplate } from './header-menu-view.tpl';

export default class HeaderMenuView extends SmartView {
  #currentMenuItem = MenuItem.TABLE;

  constructor(currentMenuItem) {
    super();
    this.#currentMenuItem = currentMenuItem || MenuItem.TABLE;
  }

  get template() {
    return createHeaderMenuTemplate(this.#currentMenuItem);
  }

  restoreHandlers = () => {
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    this.#currentMenuItem = menuItem;
    this.updateElement();
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }
    this._callback.menuClick(evt.target.ariaLabel);
    this.setMenuItem(evt.target.ariaLabel);
  }
}



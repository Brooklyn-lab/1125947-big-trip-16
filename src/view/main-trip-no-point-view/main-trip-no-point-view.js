import AbstractView from '../abstract-view';
import { createNoPointTemplate } from './main-trip-no-point-view.tpl';

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}

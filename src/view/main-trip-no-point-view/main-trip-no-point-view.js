import AbstractView from '../abstract-view';
import { createNoPointTemplate } from './main-trip-no-point-view.tlp';

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}

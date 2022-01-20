import AbstractView from '../abstract-view';
import { createNoPointTemplate } from './loading-view.tpl';

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}


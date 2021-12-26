import AbstractView from '../abstract-view';
import { createMainTripListTemplate } from './main-trip-list-view.tpl';

export default class MainTripListView extends AbstractView {
  get template() {
    return createMainTripListTemplate();
  }
}



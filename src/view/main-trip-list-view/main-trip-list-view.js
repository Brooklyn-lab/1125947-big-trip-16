import AbstractView from '../abstract-view';
import { createMainTripListTemplate } from './main-trip-list-view.tlp';

export default class MainTripListView extends AbstractView {
  get template() {
    return createMainTripListTemplate();
  }
}



import AbstractView from "./abstract-view";

const createMainTripListTemplate = () => (
  `<ul class="trip-events__list"></ul>`
);

export default class MainTripListView extends AbstractView {
  get template() {
    return createMainTripListTemplate();
  }
}
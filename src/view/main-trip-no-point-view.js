import AbstractView from "./abstract-view";

const createNoPointTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

export default class NoPointView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}

import HeaderInfoView from './view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view.js';
import HeaderFiltersView from './view/header-filters-view.js';
import MainSortFormView from './view/main-sort-form-view';
import MainTripListView from './view/main-trip-list-view.js';
import MainFormView from './view/main-form-view.js';
import MainTripPointView from './view/main-trip-point-view.js';
import { render, RenderPosition } from './render';
import { generatePoint } from './mock/task.js';
import { generateData } from './utils.js';

const headerMainElement = document.querySelector('.trip-main');
const headerNavWrapper = headerMainElement.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMainElement.querySelector('.trip-controls__filters');
const mainBodyElement = document.querySelector('.page-main');
const headerMainElementElement = mainBodyElement.querySelector('.trip-events');

render(headerMainElement, new HeaderInfoView().element, RenderPosition.AFTERBEGIN);
render(headerNavWrapper, new HeaderMenuView().element, RenderPosition.BEFOREEND);
render(headerFiltersWrapper, new HeaderFiltersView().element, RenderPosition.AFTERBEGIN);
render(headerMainElementElement, new MainSortFormView().element, RenderPosition.AFTERBEGIN);

const listComponent = new MainTripListView();
render(headerMainElementElement, listComponent.element, RenderPosition.BEFOREEND);

const TRIP_POINT_COUNT = 3;
const POINT_COUNT = 20;
const points = Array.from({ length: POINT_COUNT }, generatePoint);
const BUTTON_TEXT_CANCEL = 'Cancel';
const BUTTON_TEXT_DELETE = 'Delete';

const createButtonOpenEditPointTemplate =
  `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
  </button>`;

render(listComponent.element, new MainFormView(generateData(points), BUTTON_TEXT_CANCEL).element, RenderPosition.BEFOREEND);
render(listComponent.element, new MainFormView(generateData(points), BUTTON_TEXT_DELETE, createButtonOpenEditPointTemplate).element, RenderPosition.BEFOREEND);

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(listComponent.element, new MainTripPointView(points[i]).element, RenderPosition.BEFOREEND);
}

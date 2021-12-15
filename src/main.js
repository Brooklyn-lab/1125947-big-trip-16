import HeaderInfoView from './view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view.js';
import HeaderFiltersView from './view/header-filters-view.js';
import MainSortFormView from './view/main-sort-form-view';
import MainTripListView from './view/main-trip-list-view.js';
import MainFormView from './view/main-form-view.js';
import MainTripPointView from './view/main-trip-point-view.js';
import {render, RenderPosition} from './render';
import {generatePoint} from './mock/task.js';

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

const renderPoint = (pointListElement, task, buttonText) => {
  const pointComponent = new MainTripPointView(task);
  const pointEditComponent = new MainFormView(task, buttonText);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click',  () => {
    replacePointToForm();
  });

  pointEditComponent.element.querySelector('form').addEventListener('submit',  (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const TRIP_POINT_COUNT = 4;
const POINT_COUNT = 20;
const points = Array.from({length: POINT_COUNT}, generatePoint);
// const BUTTON_TEXT_CANCEL = 'Cancel';
const BUTTON_TEXT_DELETE = 'Delete';
const createButtonOpenEditPointTemplate =
  `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
  </button>`;

for (let i = 0; i < Math.min(points.length, TRIP_POINT_COUNT); i++) {
  renderPoint(listComponent.element, points[i], BUTTON_TEXT_DELETE, createButtonOpenEditPointTemplate);
}

import HeaderInfoView from './view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view.js';
import HeaderFiltersView from './view/header-filters-view.js';
import MainSortFormView from './view/main-sort-form-view';
import MainTripListView from './view/main-trip-list-view.js';
import MainFormView from './view/main-form-view.js';
import MainTripPointView from './view/main-trip-point-view.js';
import NoPointView from './view/main-trip-no-point-view.js';
import { render, RenderPosition, replace } from './utils/render';
import { generatePoint } from './mock/task.js';

const headerMainElement = document.querySelector('.trip-main');
const headerNavWrapper = headerMainElement.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMainElement.querySelector('.trip-controls__filters');
const mainBodyElement = document.querySelector('.page-main');
const mainSortTripElement = mainBodyElement.querySelector('.trip-events');

render(headerMainElement, new HeaderInfoView(), RenderPosition.AFTERBEGIN);
render(headerNavWrapper, new HeaderMenuView(), RenderPosition.BEFOREEND);
render(headerFiltersWrapper, new HeaderFiltersView(), RenderPosition.AFTERBEGIN);

const listComponent = new MainTripListView();
render(mainSortTripElement, listComponent, RenderPosition.BEFOREEND);

const renderPoint = (pointListElement, task) => {
  const pointComponent = new MainTripPointView(task);
  const pointEditComponent = new MainFormView(task);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const TRIP_POINT_COUNT = 4;
const POINT_COUNT = 20;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

if (points.length === 0) {
  render(mainSortTripElement, new NoPointView(), RenderPosition.AFTERBEGIN);
} else {
  render(mainSortTripElement, new MainSortFormView(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < Math.min(points.length, TRIP_POINT_COUNT); i++) {
    renderPoint(listComponent, points[i]);
  }
}



import HeaderInfoView from './view/header-info-view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view/header-menu-view.js';
import HeaderFiltersView from './view/header-filters-view/header-filters-view.js';
import { render, RenderPosition } from './utils/render.js';
import { generatePoint } from './mock/task.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const headerMainElement = document.querySelector('.trip-main');
const headerNavWrapper = headerMainElement.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMainElement.querySelector('.trip-controls__filters');
const mainBodyElement = document.querySelector('.page-main');
const mainTripElement = mainBodyElement.querySelector('.trip-events');

const POINT_COUNT = 20;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const pointsModel = new PointModel();
const filterModel = new FilterModel();
pointsModel.points = points;
const tripPresenter = new TripPresenter(mainTripElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerFiltersWrapper, filterModel, pointsModel);

render(headerMainElement, new HeaderInfoView(), RenderPosition.AFTERBEGIN);
render(headerNavWrapper, new HeaderMenuView(), RenderPosition.BEFOREEND);
render(headerFiltersWrapper, new HeaderFiltersView(), RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init();
// new TripPresenter(mainTripElement, pointsModel, filterModel);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});


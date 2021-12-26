import HeaderInfoView from './view/header-info-view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view/header-menu-view.js';
import HeaderFiltersView from './view/header-filters-view/header-filters-view.js';
import { render, RenderPosition } from './utils/render.js';
import { generatePoint } from './mock/task.js';
import TripPresenter from './presenter/trip-presenter.js';

const headerMainElement = document.querySelector('.trip-main');
const headerNavWrapper = headerMainElement.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMainElement.querySelector('.trip-controls__filters');
const mainBodyElement = document.querySelector('.page-main');
const mainSortTripElement = mainBodyElement.querySelector('.trip-events');
const POINT_COUNT = 20;
const points = Array.from({ length: POINT_COUNT }, generatePoint);
new TripPresenter(mainSortTripElement, points);

render(headerMainElement, new HeaderInfoView(), RenderPosition.AFTERBEGIN);
render(headerNavWrapper, new HeaderMenuView(), RenderPosition.BEFOREEND);
render(headerFiltersWrapper, new HeaderFiltersView(), RenderPosition.AFTERBEGIN);


import HeaderInfoView from './view/header-info-view/header-info-view.js';
import HeaderMenuView from './view/header-menu-view/header-menu-view.js';
import StatisticView from './view/statistic-view/statistic-view.js';
import { remove, render, RenderPosition } from './utils/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import ApiService from './service/api-service.js';
import { MenuItem } from './const.js';

const AUTHORIZATION = 'Basic klj893dahk34afts';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const headerMainElement = document.querySelector('.trip-main');
const headerNavWrapper = headerMainElement.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMainElement.querySelector('.trip-controls__filters');
const mainBodyElement = document.querySelector('.page-main');
const mainTripElement = mainBodyElement.querySelector('.trip-events');

const apiService = new ApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointModel(apiService);
const filterModel = new FilterModel();
const headerMenuComponent = new HeaderMenuView();
const tripPresenter = new TripPresenter(mainTripElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(headerFiltersWrapper, filterModel, pointsModel);

let statisticComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticComponent);
      tripPresenter.destroy();
      tripPresenter.init();
      filterPresenter.destroy();
      filterPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticComponent = new StatisticView(pointsModel.points);
      render(mainTripElement, statisticComponent, RenderPosition.AFTEREND);
      break;
  }
};

headerMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

pointsModel.init().finally(() => {
  const tripInfoPresenter = new TripInfoPresenter(headerMainElement, pointsModel);
  tripInfoPresenter.init();
  render(headerNavWrapper, headerMenuComponent, RenderPosition.BEFOREEND);
});


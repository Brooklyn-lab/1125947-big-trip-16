import { renderTemplate, RenderPosition } from './render';
import { createHeaderInfoTemplate } from './view/header-info-view';
import { createHeaderMenuTemplate } from './view/header-menu-view';
import { createHeaderFiltersTemplate } from './view/header-filters-view';
import { createMainSortFormTemplate } from './view/main-sort-form-view';
import { createMainTripListTemplate } from './view/main-trip-list-view';
import { createMainTripPointTemplate } from './view/main-trip-point-view';
import { createMainFormTemplate } from './view/main-form-view';
import { createButtonOpenEditPointTemplate as openButton } from './utils';

import { generatePoint } from './mock/task';

const headerMain = document.querySelector('.trip-main');
const headerNavWrapper = headerMain.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMain.querySelector('.trip-controls__filters');

const mainBody = document.querySelector('.page-main');
const mainTripEvents = mainBody.querySelector('.trip-events');

renderTemplate(headerMain, createHeaderInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(headerNavWrapper, createHeaderMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(headerFiltersWrapper, createHeaderFiltersTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(mainTripEvents, createMainSortFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainTripEvents, createMainTripListTemplate(), RenderPosition.BEFOREEND);

const mainTripList = mainTripEvents.querySelector('.trip-events__list');
const TRIP_POINT_COUNT = 4;
const POINT_COUNT = 20;
const points = Array.from({ length: POINT_COUNT }, generatePoint);
const BUTTON_TEXT_CANCEL = 'Cancel';
const BUTTON_TEXT_DELETE = 'Delete';

renderTemplate(mainTripList, createMainFormTemplate(points[0], BUTTON_TEXT_CANCEL), RenderPosition.BEFOREEND);
renderTemplate(mainTripList, createMainFormTemplate(points[0], BUTTON_TEXT_DELETE, openButton), RenderPosition.BEFOREEND);

for (let i = 1; i < TRIP_POINT_COUNT; i++) {
  renderTemplate(mainTripList, createMainTripPointTemplate(points[i]), RenderPosition.BEFOREEND);
}


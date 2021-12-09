import { renderTemplate, RenderPosition } from "./render";
import { createHeaderInfoTemplate } from "./view/header-info-view";
import { createHeaderMenuTemplate } from "./view/header-menu-view";
import { createHeaderFiltersTemplate } from "./view/header-filters-view";
import { createMainSortFormTemplate } from "./view/main-sort-form-view";
import { createMainTripListTemplate } from "./view/main-trip-list-view";
import { createMainCreateFormTemplate } from "./view/main-create-form.view";
import { createMainEditFormTemplate } from "./view/main-edit-form-view";
import { createMainTripPointTemplate } from "./view/main-trip-point-view";

const headerMain = document.querySelector('.trip-main');
const headerNavWrapper = headerMain.querySelector('.trip-controls__navigation');
const headerFiltersWrapper = headerMain.querySelector('.trip-controls__filters');

const mainBody = document.querySelector('.page-main');
const mainTripEvents = mainBody.querySelector('.trip-events');

renderTemplate(headerMain, createHeaderInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(headerNavWrapper, createHeaderMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(headerFiltersWrapper, createHeaderFiltersTemplate(), RenderPosition.AFTERBEGIN)
renderTemplate(mainTripEvents, createMainSortFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainTripEvents, createMainTripListTemplate(), RenderPosition.BEFOREEND);

const mainTripList = mainTripEvents.querySelector('.trip-events__list');
const TRIP_POINT_COUNT = 2;

renderTemplate(mainTripList, createMainCreateFormTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainTripList, createMainEditFormTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
   renderTemplate(mainTripList, createMainTripPointTemplate(), RenderPosition.BEFOREEND);
}
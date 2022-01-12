import MainSortFormView from '../view/main-sort-form-view/main-sort-form-view.js';
import MainTripListView from '../view/main-trip-list-view/main-trip-list-view.js';
import NoPointView from '../view/main-trip-no-point-view/main-trip-no-point-view.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointPrice, sortPointTime } from '../utils/task.js';
import { filter } from '../utils/filter.js';
import PointNewPresenter from './point-new-presenter.js';

const TRIP_POINT_COUNT = 4;

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripListComponent = new MainTripListView();
  #noTripComponent = null;
  #sortComponent = null;

  #renderPointCount = TRIP_POINT_COUNT;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints;
  }

  init = () => {
    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
    this.#pointNewPresenter.init();
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripList();
        this.#renderTrip(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearTripList({ resetRenderTaskCount: true, resetSortType: true });
        this.#renderTrip(this.points);
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripList({ resetRenderTaskCount: true });
    this.#renderTrip(this.points);
  }

  #renderSort = () => {
    this.#sortComponent = new MainSortFormView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);

  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints = () => {
    this.#noTripComponent = new NoPointView(this.#filterType);
    render(this.#tripContainer, this.#noTripComponent, RenderPosition.AFTERBEGIN);
  }

  #clearTripList = ({ resetRenderTaskCount = false, resetSortType = false } = {}) => {
    const pointCount = this.points.length;

    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noTripComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetRenderTaskCount) {
      this.#renderPointCount = TRIP_POINT_COUNT;
    } else {
      this.#renderPointCount = Math.min(pointCount, this.#renderPointCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderPointCount)));
  }
}


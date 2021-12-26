import MainSortFormView from '../view/main-sort-form-view/main-sort-form-view.js';
import MainTripListView from '../view/main-trip-list-view/main-trip-list-view.js';
import NoPointView from '../view/main-trip-no-point-view/main-trip-no-point-view.js';
import { render, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortPointPrice, sortPointTime } from '../utils/task.js';

const TRIP_POINT_COUNT = 4;

export default class TripPresenter {
  #tripContainer = null;

  #sortComponent = new MainSortFormView();
  #tripListComponent = new MainTripListView();
  #noTripComponent = new NoPointView();

  #tripPoints = [];
  #renderPointCount = TRIP_POINT_COUNT;
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];

  constructor(tripContainer, points) {
    this.#tripContainer = tripContainer;
    this.#tripPoints = points.slice();
    this.init(points);
  }

  init = (tripPoints) => {
    this.#sourcedTripPoints = [...tripPoints];
    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((tripPoint) => this.#renderPoint(tripPoint));
  }

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noTripComponent, RenderPosition.AFTERBEGIN);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList = () => {
    this.#renderPoints(0, Math.min(this.#tripPoints.length, this.#renderPointCount));
  }

  #renderTrip = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}


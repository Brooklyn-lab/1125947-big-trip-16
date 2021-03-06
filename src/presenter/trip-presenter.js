import MainSortFormView from '../view/main-sort-form-view/main-sort-form-view.js';
import MainTripListView from '../view/main-trip-list-view/main-trip-list-view.js';
import NoPointView from '../view/main-trip-no-point-view/main-trip-no-point-view.js';
import LoadingView from '../view/loading-view/loading-view.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import PointPresenter, { State as PointPresenterViewState } from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { SortType, UpdateType, UserAction, FilterType, EMPTY_POINT } from '../const.js';
import { sortPointPrice, sortPointTime, sortPointDate } from '../utils/common.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripListComponent = new MainTripListView();
  #loadingComponent = new LoadingView();
  #noTripComponent = null;
  #sortComponent = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripContainer, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripListComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...filteredPoints].sort(sortPointTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortPointPrice);
      case SortType.DEFAULT:
        return [...filteredPoints].sort(sortPointDate);
    }

    return filteredPoints;
  }

  init = () => {
    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#renderTrip();
  }

  destroy = () => {
    this.#clearTripList({ resetSortType: true });
    remove(this.#tripListComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(EMPTY_POINT, this.#pointsModel.offers, this.#pointsModel.destinations);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#pointsModel.offers, this.#pointsModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearTripList();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTripList({ resetSortType: true });
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripList();
    this.#renderTrip(this.points);
  }

  #renderSort = () => {
    this.#sortComponent = new MainSortFormView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);

  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading = () => {
    render(this.#tripContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints = () => {
    this.#noTripComponent = new NoPointView(this.#filterType);
    render(this.#tripContainer, this.#noTripComponent, RenderPosition.AFTERBEGIN);
  }

  #clearTripList = ({ resetSortType = false } = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noTripComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}


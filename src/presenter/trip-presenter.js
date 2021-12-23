import MainSortFormView from '../view/main-sort-form-view/main-sort-form-view.js';
import MainTripListView from '../view/main-trip-list-view/main-trip-list-view.js';
import MainFormView from '../view/main-form-view/main-form-view.js';
import MainTripPointView from '../view/main-trip-point-view/main-trip-point-view.js';
import NoPointView from '../view/main-trip-no-point-view/main-trip-no-point-view.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import { isEscPressed } from '../utils/common.js';

const TRIP_POINT_COUNT = 4;

export default class TripPresenter {
  #tripContainer = null;

  #sortComponent = new MainSortFormView();
  #tripListComponent = new MainTripListView();
  #noTripComponent = new NoPointView();

  #tripPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointComponent = new MainTripPointView(point);
    const pointEditComponent = new MainFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (isEscPressed(evt)) {
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
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#tripListComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((tripPoint) => this.#renderPoint(tripPoint));
  }

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noTripComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPointList = () => {
    this.#renderPoints(0, Math.min(this.#tripPoints.length, TRIP_POINT_COUNT));
  }

  #renderTrip = () => {
    this.#renderSort();
    this.#renderPointList();
  }
}


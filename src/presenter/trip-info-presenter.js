import HeaderInfoView from '../view/header-info-view/header-info-view';
import {render, RenderPosition, replace, remove} from '../utils/render';
import { sortPointDate } from '../utils/common';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #points = [];

  constructor(tripInfoContainer, pointsModel) {
    this.#pointsModel = pointsModel;
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#points = this.#pointsModel.points.sort(sortPointDate);

    if (!this.#points.length && prevTripInfoComponent === null) {
      return;
    }

    if (!this.#points.length && prevTripInfoComponent !== null) {
      remove(prevTripInfoComponent);
      return;
    }

    this.#tripInfoComponent = new HeaderInfoView(this.#points);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }
}


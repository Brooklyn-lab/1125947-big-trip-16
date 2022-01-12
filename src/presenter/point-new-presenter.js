import MainFormView from '../view/main-form-view/main-form-view.js';
import { isEscPressed } from '../utils/common.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new MainFormView();
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    // this.#pointEditComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.BEFOREEND);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  // #handleEditClick = () => {
  //   // if (this.#mode === Mode.DEFAULT) {
  //   //   this.#replacePointToForm();
  //   //   document.addEventListener('keydown', this.#escKeyDownHandler);
  //   // } else {
  //   //   this.#pointEditComponent.reset(this.#point);
  //   //   this.#replaceFormToPoint();
  //   // }

  //   this.destroy();
  // }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { id: nanoid(), ...point }
    );
    this.destroy();
  }
}



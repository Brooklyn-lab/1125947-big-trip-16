import HeaderFiltersView from '../view/header-filters-view/header-filters-view';
import { FilterType, UpdateType } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
      }, {
        type: FilterType.FUTURE,
        name: 'future',
      }, {
        type: FilterType.PAST,
        name: 'past',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new HeaderFiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === FilterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

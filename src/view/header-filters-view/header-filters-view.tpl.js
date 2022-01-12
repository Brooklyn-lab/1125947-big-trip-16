const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name } = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type} ${type === currentFilterType ? 'checked' : ''}">
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${name}
      </label>
    </div>`
  );
};

export const createHeaderFiltersTemplate = (filterItems, currentFilterType) => {
  // получаю в консоль filterItems, выдает undefined из-за этого код ниже не работает. Но если его закомитить, то в консоль выдаст undefined, а после уже подгрузится на повторном вызове. И я не пойму почему так.

  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};


import { FilterType } from '../../const';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now'
};

export const createNoPointTemplate = (filterType) => {
  const noTasksTextType = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noTasksTextType}
    </p>`);
};


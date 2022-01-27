import { FilterType } from '../../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

export const createNoPointTemplate = (filterType) => {
  const noPointsTextType = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointsTextType}
    </p>`);
};


import { FilterType } from '../const';
import { isDateAfter, isDateBefore, isDateToday } from '../mock/task';

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isDateBefore(trip.dateFrom) || isDateToday(trip.dateFrom)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => isDateAfter(trip.dateTo))
};


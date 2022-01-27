import { FilterType } from '../const';
import { isPointFuture } from '../utils/common';

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isPointFuture(trip.dateFrom)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => !isPointFuture(trip.dateFrom))
};


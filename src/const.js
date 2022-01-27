import dayjs from 'dayjs';

export const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

export const DAY_TIME_FORMAT = 'DD/MM/YY HH:mm';
export const DAY_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export const TRIP_EVENT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const EMPTY_POINT = {
  id: null,
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  isFavorite: true,
  offers: [],
  type: TRIP_EVENT_TYPE[0],
};


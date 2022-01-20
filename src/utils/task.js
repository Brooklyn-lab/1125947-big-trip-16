import dayjs from 'dayjs';

export const sortPointTime = (pointTimeA, pointTimeB) => dayjs(pointTimeA.dateFrom).diff(dayjs(pointTimeB.dateTo)) - dayjs(pointTimeB.dateFrom).diff(dayjs(pointTimeB.dateTo));

export const sortPointPrice = (pointPriceA, pointPriceB) => pointPriceB.basePrice - pointPriceA.basePrice;

export const isPointRepeaing = (repeating) => Object.values(repeating).some(Boolean);

export const TRIP_EVENT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const POINTS_NAMES = ['Nagasaki', 'Frankfurt', 'Venice', 'Rome', 'Saint Petersburg', 'Helsinki', 'Den Haag', 'Madrid', 'Milan', 'Geneva', 'Berlin', 'Hiroshima', 'Valencia', 'Rotterdam', 'Paris', 'Sochi'];


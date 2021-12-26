import dayjs from 'dayjs';

export const sortPointTime = (pointTimeA, pointTimeB) => dayjs(pointTimeA.dateFrom).diff(dayjs(pointTimeB.dateTo)) - dayjs(pointTimeB.dateFrom).diff(dayjs(pointTimeB.dateTo));

export const sortPointPrice = (pointPriceA, pointPriceB) => pointPriceB.basePrice - pointPriceA.basePrice;


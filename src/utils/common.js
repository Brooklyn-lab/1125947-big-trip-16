import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const formatDate = (date, dayFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ') => dayjs(date).format(dayFormat);

export const isPointFuture = (date) => dayjs().isBefore(date, 'D');

export const calculateDateDiff = (startDay, endDay) => {
  const dateDiff = Math.abs(startDay - endDay) / 1000 / 60;
  let timeString;

  if (dateDiff < 60) {
    timeString = `${`0${dateDiff}`.slice(-2)}M`;
  } else if (dateDiff < 1440) {
    timeString = `${`0${Math.trunc(dateDiff / 60)}`.slice(-2)}H ${`0${Math.trunc(dateDiff % 60)}`.slice(-2)}M`;
  } else {
    timeString = `${`0${Math.trunc(dateDiff / 1440)}`.slice(-2)}D ${`0${Math.trunc((dateDiff % 1440) / 60)}`.slice(-2)}H ${`0${Math.trunc((dateDiff % 1440) % 60)}`.slice(-2)}M`;
  }

  return timeString;
};

export const sortPointDate = (pointA, pointB) => {
  if (pointA.startDate > pointB.startDate) {
    return 1;
  }

  if (pointA.startDate < pointB.startDate) {
    return -1;
  }

  return 0;
};

export const sortPointTime = (pointTimeA, pointTimeB) => dayjs(pointTimeA.dateFrom).diff(dayjs(pointTimeB.dateTo)) - dayjs(pointTimeB.dateFrom).diff(dayjs(pointTimeB.dateTo));

export const sortPointPrice = (pointPriceA, pointPriceB) => pointPriceB.basePrice - pointPriceA.basePrice;


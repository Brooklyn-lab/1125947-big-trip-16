import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const formatDate = (date, dayFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ') => dayjs(date).format(dayFormat);

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


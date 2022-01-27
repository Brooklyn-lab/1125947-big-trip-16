import dayjs from 'dayjs';

export const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const formatDate = (date, dayFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ') => dayjs(date).format(dayFormat);

export const isPointFuture = (date) => dayjs().isBefore(date, 'D');

export const sortPointPrice = (pointPriceA, pointPriceB) => pointPriceB.basePrice - pointPriceA.basePrice;

export const sortPointDate = (pointDateA, pointDateB) => pointDateA.dateFrom - pointDateB.dateFrom;

const getEventDuration = (start, end) => dayjs(start).diff(dayjs(end));

export const sortPointTime = (eventA, eventB) => getEventDuration(eventA.dateFrom, eventA.dateTo) - getEventDuration(eventB.dateFrom, eventB.dateTo);

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

export const eventDurationFormat = (duration) => {
  const minutesDuration = duration % 60 > 0 ? `${duration % 60}M` : '';
  const hoursDuration = Math.floor(duration / 60) % 24 > 0 ? `${Math.floor(duration / 60) % 24}H ` : '';
  const daysDuration = Math.floor((duration / 60) / 24) > 0 ? `${Math.floor((duration / 60) / 24)}D ` : '';
  return daysDuration + hoursDuration + minutesDuration;
};


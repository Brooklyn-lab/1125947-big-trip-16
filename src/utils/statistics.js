import dayjs from 'dayjs';

const getUniqueTypes = (points) => {
  const uniqueTypes = new Set();
  points.map((point) => uniqueTypes.add(point.type));
  return uniqueTypes;
};

const getUniqueAmount = (uniqueTypes) => {
  const uniqueTypesAmount = {};
  uniqueTypes.forEach((type) => {
    uniqueTypesAmount[type] = 0;
  });
  return uniqueTypesAmount;
};

export const calculateTypeCost = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const uniqueTypesCost = getUniqueAmount(uniqueTypes);

  points.forEach((point) => {
    uniqueTypesCost[point.type] += point.basePrice;
  });

  const uniqueTypesCostOrdered = new Map(Object.entries(uniqueTypesCost).sort((a, b) => b[1] - a[1]));

  return uniqueTypesCostOrdered;
};

export const calculateTypeCount = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const uniqueTypesCount = getUniqueAmount(uniqueTypes);

  points.forEach((point) => {
    uniqueTypesCount[point.type]++;
  });

  const uniqueTypesCountOrdered = new Map(Object.entries(uniqueTypesCount).sort((a, b) => b[1] - a[1]));
  return uniqueTypesCountOrdered;
};

export const calculateTypeTime = (points) => {
  const uniqueTypes = getUniqueTypes(points);
  const uniqueTypesTime = getUniqueAmount(uniqueTypes);

  points.forEach((point) => {
    const pointDuration = dayjs(point.dateTo).diff(dayjs(point.dateFrom), 'm');
    uniqueTypesTime[point.type] += pointDuration;
  });

  const uniqueTypesTimeOrdered = new Map(Object.entries(uniqueTypesTime).sort((a, b) => b[1] - a[1]));

  return uniqueTypesTimeOrdered;
};

export const tripEventType = (array) => array.map((type) => type.toUpperCase());


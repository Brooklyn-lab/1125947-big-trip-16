import dayjs from 'dayjs';
import { getRandomInteger } from '../utils';
import { generateData } from '../utils.js';

const generateDate = (max, min) => {
  const daysGap = getRandomInteger(min, max);
  return dayjs().add(daysGap, 'day').toDate();
};

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.match(/\S.*?\."?(?=\s|$)/g);
const POINT_ROUTE_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const POINTS_NAMES = ['Nagasaki', 'Frankfurt', 'Venice', 'Rome', 'Venice', 'Saint Petersburg', 'Helsinki', 'Den Haag', 'Madrid', 'Milan', 'Geneva', 'Berlin', 'Hiroshima', 'Valencia', 'Rotterdam', 'Paris', 'Sochi'];
const OFFERS = [
  { title: 'Choose VIP area', price: 70 },
  { title: 'Choose live music', price: 150 },
  { title: 'Choose the time of check-out', price: 190 },
  { title: 'Add breakfast', price: 110 },
  { title: 'Order a meal from the restaurant', price: 30 },
  { title: 'Upgrade to a business class', price: 190 },
  { title: 'Choose temperature', price: 170 },
  { title: 'Drive quickly, I\'m in a hurry', price: 100 },
  { title: 'Drive slowly', price: 110 },
  { title: 'Choose the radio station', price: 30 },
  { title: 'With automatic transmission', price: 110 },
  { title: 'With air conditioning', price: 180 },
  { title: 'Choose meal', price: 130 },
  { title: 'Upgrade to business class', price: 150 },
  { title: 'Business lounge', price: 40 },
  { title: 'Infotainment system', price: 50 },
  { title: 'Order meal', price: 100 },
  { title: 'Choose seats', price: 190 },
  { title: 'Book a taxi at the arrival point', price: 110 },
  { title: 'Order a breakfast', price: 80 },
  { title: 'Wake up at a certain time', price: 140 },
  { title: 'Choose meal', price: 120 },
  { title: 'Upgrade to comfort class', price: 120 },
  { title: 'Business lounge', price: 160 }
];

const randomStrings = (array) => {
  const strings = [];
  for (let i = 0; i < array.length; i++) {
    if (i >= getRandomInteger(0, 5)) {
      break;
    }
    const randomIndex = getRandomInteger(0, array.length - 1);
    strings.push(array[randomIndex]);
  }
  return strings.join(' ');
};

const randomLinks = (description) => {
  const fiveOffers = [];
  for (let i = 0; i <= 5; i++) {
    if (i >= getRandomInteger(0, 5)) {
      break;
    }
    fiveOffers.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: generateData(description)
    });

  }
  return fiveOffers;
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(150, 1600),
  dateFrom: generateDate(1, 2),
  dateTo: generateDate(2, 4),
  destination: {
    description: randomStrings(DESCRIPTION),
    name: generateData(POINTS_NAMES),
    pictures: randomLinks(DESCRIPTION),
  },
  isFavorite: true,
  offer: {
    type: generateData(POINT_ROUTE_TYPES),
    offers: generateData(OFFERS)
  }
});

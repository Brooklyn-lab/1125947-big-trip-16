import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common.js';

const generateData = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const MAX_MINUTES_GAP = 2880;
const getDate = () => dayjs().add(getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');

export const generateDate = (date) => dayjs(date).format('h:mm:ss A');

const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.match(
    /\S.*?\."?(?=\s|$)/g,
  );


export const POINTS_NAMES = [
  'Nagasaki',
  'Frankfurt',
  'Venice',
  'Rome',
  'Saint Petersburg',
  'Helsinki',
  'Den Haag',
  'Madrid',
  'Milan',
  'Geneva',
  'Berlin',
  'Hiroshima',
  'Valencia',
  'Rotterdam',
  'Paris',
  'Sochi',
];

export const TripEventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const Offer = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 60
      },
      {
        'id': 3,
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 100
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 4,
        'title': 'Upgrade to a business class',
        'price': 100
      }, {
        'id': 5,
        'title': 'Choose the radio station',
        'price': 10
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 6,
        'title': 'Add meal',
        'price': 20
      }, {
        'id': 7,
        'title': 'Choose seats',
        'price': 15
      }, {
        'id': 8,
        'title': 'Upgrade to a business class',
        'price': 100
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 9,
        'title': 'Choose VIP area',
        'price': 70
      },
      { 
        'id': 10,
        'title': 'Choose live music',
        'price': 150
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 11,
        'title': 'Add breakfast',
        'price': 110 
      },
      {
        'id': 12,
        'title': 'Order a meal from the restaurant',
        'price': 30 
      },
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 13,
        'title': 'Choose the time of check-out',
        'price': 190
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 14,
        'title': 'Order meal',
        'price': 100
      }
    ]
  },
  {
    'type': 'check-in'
  },
  {
    'type': 'sightseeing'
  }
]

export const test = (value) => {
  console.log(value);
}

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
  const inks = [];
  for (let i = 0; i <= 5; i++) {
    if (i >= getRandomInteger(0, 5)) {
      break;
    }
    inks.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: generateData(description),
    });
  }
  return inks;
};

export const generatePoint = () => {
  const dateOne = getDate();
  const dateTwo = getDate();

  return {
    id: nanoid(),
    basePrice: getRandomInteger(150, 450),
    dateFrom: dayjs(Math.min(dateOne, dateTwo)).toDate(),
    dateTo: dayjs(Math.max(dateOne, dateTwo)).toDate(),
    destination: {
      description: randomStrings(DESCRIPTION),
      name: generateData(POINTS_NAMES),
      pictures: randomLinks(DESCRIPTION),
    },
    isFavorite: false,
    offer: generateData(Offer),
  };
};


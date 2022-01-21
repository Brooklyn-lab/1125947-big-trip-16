import { MenuItem } from '../../const';

export const createHeaderMenuTemplate = (menuItem) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${Object.values(MenuItem).map((item) => (
    `<a class="trip-tabs__btn ${menuItem === item ? 'trip-tabs__btn--active' : ''}" aria-label=${item} href="#">${item}</a>`
    )).join('')}
  </nav>`
);


// export const createHeaderMenuTemplate = (menuItem) => {
//   return `<nav class="trip-controls__trip-tabs  trip-tabs">
//     ${Object.values(MenuItem).map((item) => {
//       if (item !== 'ADD_NEW POINT') {
//         return (`<a class="trip-tabs__btn ${menuItem === item ? 'trip-tabs__btn--active' : ''}" aria-label=${item} href="#">${item}</a>`)
//       } else {
//         return;
//       }
//     }).join('')}
//   </nav>`
// }

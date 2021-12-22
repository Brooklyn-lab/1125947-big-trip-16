import { getRandomInteger } from "./common.js";

export const generateData = (array) => {
   const randomIndex = getRandomInteger(0, array.length - 1);
   return array[randomIndex];
};

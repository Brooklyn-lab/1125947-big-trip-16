import { createDateTemplate } from '../../utils/common';

export const createHeaderInfoTemplate = (points) => {
  const dateFrom = createDateTemplate(points[0].dateFrom, 'MMM DD');
  const dateTo = createDateTemplate(points[points.length - 1].dateFrom, 'MMM DD');
  const firstCity = points[0].destination.name;
  const lastCity = points[points.length - 1].destination.name;

  const generateCities = () => {
    switch(points.length) {
      case 0: {
        return '';
      }
      case 1: {
        return (`${firstCity}`);
      }
      case 2: {
        return (`${firstCity} &mdash; ${lastCity}`);
      }
      case 3: {
        return (`${firstCity} &mdash; ${points[1].destination.name} &mdash; ${lastCity}`);
      }
      default: {
        return (`${firstCity} &mdash; ... &mdash; ${lastCity}`);
      }
    }
  };

  const calculatePrice = (pointsPrice) => {
    const priceTotal = pointsPrice.reduce((total, point) => {
      const { basePrice, offers } = point;
      let offersTotal = 0;
      if (offers && offers.length > 0) {
        offersTotal = offers.reduce((sum, offer) => (sum += offer.price), 0);
      }
      total += basePrice + offersTotal;
      return total;
    }, 0);

    return priceTotal;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
          <h1 class="trip-info__title">${generateCities()}</h1>
          <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculatePrice(points)}</span>
      </p>
    </section>`
  );
};


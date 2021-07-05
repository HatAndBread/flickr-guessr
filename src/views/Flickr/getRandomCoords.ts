import cities from "./cities.json";

export const getRandomCity = () => {
  return cities[Math.floor(Math.random() * cities.length)];
};
const getRan = () => (Math.floor(Math.random() * 2) ? -1 : 1);
export const getRandomCoordsWithinRadius = (radius: number) => {
  const city = getRandomCity();
  return {
    lat: parseFloat(
      (parseFloat(city.lat) + Math.random() * radius * 0.01 * getRan()).toFixed(
        4
      )
    ),
    lng: parseFloat(
      (parseFloat(city.lng) + Math.random() * radius * 0.01 * getRan()).toFixed(
        4
      )
    ),
  };
};

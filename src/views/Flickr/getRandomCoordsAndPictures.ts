import cities from "./cities.json";
import { getPictures } from "./getPictures";
import { getRandomUrls } from "./getRandomUrls";

export const getRandomCoordsAndPictures = async (
  latLngAnswer: any,
  imageUrls: any
) => {
  let coords = getRandomCoordsWithinRadius(4);
  let pictures = await getPictures(coords);
  while (pictures.photos.photo.length < 6) {
    console.log("RETRIEVING AGAIN");
    coords = getRandomCoordsWithinRadius(2);
    pictures = await getPictures(coords);
  }
  latLngAnswer.value = coords;
  imageUrls.value = getRandomUrls(pictures);
  return { coords, pictures };
};

export const getRandomCity = () => {
  console.log(cities.length);
  return cities[Math.floor(Math.random() * cities.length)];
};

const getRan = () => (Math.floor(Math.random() * 2) ? -1 : 1);

export const getRandomCoordsWithinRadius = (radius: number) => {
  const city = getRandomCity();
  console.log(city);
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

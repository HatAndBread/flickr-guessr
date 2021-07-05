import cities from "./cities.json";
import { getPictures } from "./getPictures";
import { getRandomUrls } from "./getRandomUrls";

export const getRandomCoordsAndPictures = async (
  latLngAnswer: any,
  imageUrls: any,
  answerCountryCode: any
) => {
  let placeData = getRandomCoordsWithinRadius(5);
  let coords = { lat: placeData.lat, lng: placeData.lng };
  let country = placeData.country;
  let pictures = await getPictures(coords);
  while (pictures.photos.photo.length < 4) {
    console.log("RETRIEVING AGAIN");
    placeData = getRandomCoordsWithinRadius(5);
    coords = { lat: placeData.lat, lng: placeData.lng };
    country = placeData.country;
    pictures = await getPictures(coords);
  }
  latLngAnswer.value = coords;
  answerCountryCode.value = country.toLowerCase();
  imageUrls.value = getRandomUrls(pictures);
  return { coords, pictures };
};

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
    country: city.c,
  };
};

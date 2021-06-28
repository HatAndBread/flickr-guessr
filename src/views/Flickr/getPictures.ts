import { Response } from "../../types/flickrTypes";

export const getPictures = async (coords: { lat: number; lng: number }) => {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.VUE_APP_FLICKR_KEY}&lat=${coords.lat}&lon=${coords.lng}&format=json&nojsoncallback=1&geo_context=2&radius=4`;
  const res = await fetch(url);
  const data: Response = await res.json();
  return data;
};

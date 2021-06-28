import { Response } from "../../types/flickrTypes";

export const getPictures = async () => {
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
    process.env.VUE_APP_FLICKR_KEY
  }&lat=${35.6762}&lon=${139.6503}&format=json&nojsoncallback=1&geo_context=2&radius=1`;
  const res = await fetch(url);
  const data: Response = await res.json();
  return data;
};

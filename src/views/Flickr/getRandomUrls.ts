import { LatLngPhoto, Response } from "../../types/flickrTypes";
import { getUrlString } from "./getUrlString";

export const getRandomUrls = (pictures: Response) => {
  const urls: { url: string; originalItem: LatLngPhoto }[] = [];
  while (urls.length < 6) {
    const index = Math.floor(Math.random() * pictures.photos.photo.length);
    const item = pictures.photos.photo[index];
    urls.push({ url: getUrlString(item, "s"), originalItem: item });
    pictures.photos.photo.splice(index, 1);
  }
  return urls;
};

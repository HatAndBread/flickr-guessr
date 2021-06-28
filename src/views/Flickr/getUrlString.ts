import { LatLngPhoto } from "../../types/flickrTypes";

export const getUrlString = (
  item: LatLngPhoto,
  size: "thumb" | "s" | "m" | "l"
) => {
  const getSize = () => {
    switch (size) {
      case "thumb": {
        return "_t";
      }
      case "s": {
        return "_m";
      }
      case "m": {
        return "";
      }
      case "l": {
        return "_c";
      }
      default:
        return "";
    }
  };
  return `https://live.staticflickr.com/${item.server}/${item.id}_${
    item.secret
  }${getSize()}.jpg`;
};

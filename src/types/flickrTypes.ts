export interface Response {
  photos: LatLngPhotos;
  stat: string;
}

export interface LatLngPhotos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: LatLngPhoto[];
}

export interface LatLngPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

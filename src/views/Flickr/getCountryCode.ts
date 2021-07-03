export const getCountryCode = async (lngLat: { lat: number; lng: number }) => {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${process.env.VUE_APP_MAPBOX_KEY}`
  );
  const data = await res.json();
  let countryCode = "";
  data?.features[0]?.context?.forEach((feature: any) => {
    if (feature.short_code) {
      countryCode = feature.short_code;
    }
  });
  return countryCode;
};

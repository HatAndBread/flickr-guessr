<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
  <MapMarker
    :map="map"
    className="marker goal"
    v-if="map"
    :coords="answerLatLng"
  />
  <MapMarker
    :map="map"
    className="marker guess"
    v-if="map"
    :coords="guessCoords"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "./MapMarker.vue";
mapbox.accessToken = process.env.VUE_APP_MAPBOX_KEY;
export default defineComponent({
  name: "Map",
  data(): {
    map: null | mapbox.Map;
    goalMarker: null | mapbox.Marker;
    guessCoords: mapbox.LngLatLike;
    answerLatLng: mapbox.LngLatLike;
  } {
    return {
      map: null,
      goalMarker: null,
      guessCoords: [40, 80],
      answerLatLng: [0, 0],
    };
  },
  components: {
    MapMarker,
  },
  props: {
    zoom: Number,
    onMapClick: Function,
    answerCoords: Object,
  },
  watch: {
    answerCoords: function() {
      if (this.answerCoords?.lng && this.answerCoords?.lat) {
        this.answerLatLng = [this.answerCoords.lng, this.answerCoords.lat];
      }
    },
  },
  mounted: function() {
    this.map = new mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [140.0, 38.2],
      zoom: this.zoom,
      maxZoom: 18,
    });
    this.map.on("click", (e) => {
      if (typeof this.onMapClick === "function") {
        this.onMapClick({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        this.guessCoords = [e.lngLat.lng, e.lngLat.lat];
      }
    });
    document.createElement;
    this.goalMarker = new mapbox.Marker({});
  },
});
</script>

<style>
.map-container {
  display: flex;
  justify-content: center;
}
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 50vh;
  border-radius: 16px;
}
</style>

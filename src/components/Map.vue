<template>
  <div class="outer-container">
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
  </div>
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

<style scoped>
.outer-container {
  margin: 16px;
  width: 600px;
}
.map-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  height: 360px;
  left: 50%;
  transform: translateX(-50%);
}
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
@media only screen and (max-width: 1000px) {
  .outer-container {
    width: 90%;
  }
}
</style>

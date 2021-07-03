<template>
  <div class="outer-container">
    <div
      :class="
        `distance-update${
          showDistanceUpdate && distanceAway ? ' fade-in' : ' fade-out'
        }`
      "
    >
      {{ distanceAway && parseInt(distanceAway).toLocaleString() }} km away!
    </div>
    <div class="map-container">
      <div id="map"></div>
    </div>
    <MapMarker
      :map="map"
      :className="`marker goal`"
      v-if="map && showGoal"
      :coords="answerLatLng"
    />
    <MapMarker
      :map="map"
      :className="`marker guess`"
      v-if="map && showGuess"
      :coords="guessCoords"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "./MapMarker.vue";
mapbox.accessToken = process.env.VUE_APP_MAPBOX_KEY;
export default defineComponent({
  name: "Map",
  data(): {
    map: null | mapbox.Map;
    guessCoords: [number, number];
    answerLatLng: [number, number];
    showDistanceUpdate: boolean;
  } {
    return {
      map: null,
      guessCoords: [40, 80],
      answerLatLng: [0, 0],
      showDistanceUpdate: false,
    };
  },
  components: {
    MapMarker,
  },
  props: {
    zoom: Number,
    onMapClick: Function,
    answerCoords: Object,
    showGoal: Boolean,
    showGuess: Boolean,
    roundStarted: Boolean,
    gameIsFinished: Boolean,
    distanceAway: String || null,
  },
  watch: {
    distanceAway: function() {
      this.showDistanceUpdate = true;
      setTimeout(() => {
        this.showDistanceUpdate = false;
      }, 1000);
    },
    answerCoords: function() {
      if (this.answerCoords?.lng && this.answerCoords?.lat) {
        this.answerLatLng = [this.answerCoords.lng, this.answerCoords.lat];
      }
    },
    roundStarted: function() {
      if (this.roundStarted) {
        if (this.map) {
          this.map.flyTo({ center: [0, 0], zoom: 0 });
        }
      }
    },
    showGoal: function() {
      if (this.map) {
        if (this.showGoal) {
          this.map.flyTo({ center: this.answerLatLng });
          this.map.addSource("a", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [this.answerLatLng, this.guessCoords],
              },
            },
          });
          this.map.addLayer({
            id: "a",
            type: "line",
            source: "a",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#888",
              "line-width": 8,
            },
          });
        } else {
          this.map.removeLayer("a");
          this.map.removeSource("a");
        }
      }
    },
  },
  mounted: function() {
    this.map = new mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: this.zoom,
      maxZoom: 18,
    });
    this.map.on("click", (e) => {
      if (typeof this.onMapClick === "function") {
        this.onMapClick({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        if (this.roundStarted) {
          this.guessCoords = [e.lngLat.lng, e.lngLat.lat];
        }
      }
    });
  },
});
</script>

<style scoped>
.outer-container {
  margin: 16px;
  width: 600px;
  position: relative;
}
.map-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  height: 400px;
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
.distance-update {
  font-size: 32px;
  position: absolute;
  z-index: 90;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  transition: 3s;
  transition-timing-function: ease-out;
  font-family: monospace;
  color: red;
  font-weight: 900;
}
.fade-in {
  opacity: 1;
}
.fade-out {
  opacity: 0;
}
@media only screen and (max-width: 1000px) {
  .outer-container {
    width: 90%;
  }
}
</style>

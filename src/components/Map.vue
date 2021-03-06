<template>
  <div :class="`outer-container ${showMap || !gameIsStarted ? '' : 'hide'}`">
    <div
      :class="
        `updater${
          showDistanceUpdate && distanceAway ? ' fade-in' : ' fade-out'
        }`
      "
    >
      {{ distanceAway && parseInt(distanceAway).toLocaleString() }}
      {{ distanceAway && "km away" }}!
    </div>
    <div
      :class="
        `updater country${
          showCountryBonus && countryBonus ? ' fade-in' : ' fade-out'
        }`
      "
    >
      Correct country! +{{ countryBonus && countryBonus.toLocaleString() }}
      points!
    </div>
    <div :class="`map-container`">
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
    guessCoords: [number, number] | null;
    answerLatLng: [number, number];
    showDistanceUpdate: boolean;
    showCountryBonus: boolean;
  } {
    return {
      map: null,
      guessCoords: [40, 80],
      answerLatLng: [0, 0],
      showDistanceUpdate: false,
      showCountryBonus: false,
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
    countryBonus: Number,
    showMap: Boolean,
    gameIsStarted: Boolean,
  },
  watch: {
    showMap: function() {
      if (this.showMap) {
        setTimeout(() => {
          this.map?.resize();
        }, 80);
      }
    },
    distanceAway: function() {
      this.showDistanceUpdate = true;
      setTimeout(() => {
        this.showDistanceUpdate = false;
      }, 3000);
    },
    gameIsFinished: function() {
      if (this.map && this.gameIsFinished) {
        this.map.flyTo({ center: this.answerLatLng, zoom: 8 });
      }
    },
    countryBonus: function() {
      if (this.countryBonus) {
        this.showCountryBonus = true;
        setTimeout(() => {
          this.showCountryBonus = false;
        }, 3000);
      }
    },
    answerCoords: function() {
      if (this.answerCoords?.lng && this.answerCoords?.lat) {
        this.answerLatLng = [this.answerCoords.lng, this.answerCoords.lat];
      }
    },
    roundStarted: function() {
      if (this.roundStarted) {
        if (this.map) {
          this.map.flyTo({ center: [0, 0], zoom: 1.5 });
        }
      }
    },
    showGoal: function() {
      if (this.showGoal && this.guessCoords && this.map) {
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
      } else if (!this.showGoal && this.map && this.guessCoords) {
        this.guessCoords = null;
        this.map.removeLayer("a");
        this.map.removeSource("a");
      }
    },
  },
  mounted: function() {
    this.map = new mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
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
  margin: 0px 32px 32px 32px;
  width: 100%;
  overflow: hidden;
  position: relative;
  border-style: solid;
  border-color: gray;
  border-top-style: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-width: 1px;
}
.map-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 68vh;
  overflow: hidden;
}
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.updater {
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
.country {
  align-items: flex-start;
  font-size: 22px;
  max-width: 100%;
  white-space: initial;
}

.hide {
  display: none;
}

.fade-in {
  opacity: 1;
}
.fade-out {
  opacity: 0;
}
@media only screen and (max-width: 350px) {
  .outer-container {
    margin: 0px 16px 16px 16px;
  }
}
</style>

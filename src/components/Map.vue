<template>
  <div class="outer-container">
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
  } {
    return {
      map: null,
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
    showGoal: Boolean,
    showGuess: Boolean,
    roundStarted: Boolean,
    gameIsFinished: Boolean,
  },
  watch: {
    answerCoords: function() {
      if (this.answerCoords?.lng && this.answerCoords?.lat) {
        this.answerLatLng = [this.answerCoords.lng, this.answerCoords.lat];
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
    // gameIsFinished: function() {
    //   if (this.gameIsFinished) {
    //     if (this.map) {
    //       this.map.addSource("a", {
    //         type: "geojson",
    //         data: {
    //           type: "Feature",
    //           properties: {},
    //           geometry: {
    //             type: "LineString",
    //             coordinates: [this.answerLatLng, this.guessCoords],
    //           },
    //         },
    //       });
    //       this.map.addLayer({
    //         id: "a",
    //         type: "line",
    //         source: "a",
    //         layout: {
    //           "line-join": "round",
    //           "line-cap": "round",
    //         },
    //         paint: {
    //           "line-color": "#888",
    //           "line-width": 8,
    //         },
    //       });
    //     }
    //   } else {
    //     if (this.map) {
    //       this.map.removeLayer("a");
    //       this.map.removeSource("a");
    //     }
    //   }
    // },
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
@media only screen and (max-width: 1000px) {
  .outer-container {
    width: 90%;
  }
}
</style>

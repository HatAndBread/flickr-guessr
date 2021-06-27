<template>
  <div class="map-container">
    <div id="map" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapbox.accessToken = process.env.VUE_APP_MAPBOX_KEY;
export default defineComponent({
  name: "Map",
  data(): { map: null | mapbox.Map } {
    return {
      map: null,
    };
  },
  mounted: function() {
    console.log("Hello!");
    this.map = new mapbox.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [140.0, 38.2],
      zoom: 9,
      maxZoom: 18,
    });
    console.log("hey the map updated", this.map);
  },
  updated: function() {
    console.log("hey the map updated", this.map);
  },
});
</script>

<style scoped>
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 50vh;
}
</style>

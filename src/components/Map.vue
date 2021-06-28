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
  props: {
    zoom: Number,
    onMapClick: Function,
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
      }
    });
  },
});
</script>

<style scoped>
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

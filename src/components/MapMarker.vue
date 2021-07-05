<template>
  <div :class="className" ref="markerRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType, watch } from "vue";
import mapbox from "mapbox-gl";
export default defineComponent({
  name: "MapMarker",
  props: {
    map: Object as PropType<mapbox.Map>,
    coords: Object as PropType<mapbox.LngLatLike>,
    className: String,
  },
  setup(props) {
    const marker = ref<null | mapbox.Marker>(null);
    const markerRef = ref<null | HTMLElement>(null);
    watch(
      () => [props.coords, marker],
      () => {
        if (marker.value && props.coords) {
          marker.value.setLngLat(props.coords);
        }
      }
    );
    onMounted(function() {
      if (props.map && markerRef.value && props.coords) {
        marker.value = new mapbox.Marker(markerRef.value, {
          offset: [0, -25],
        })
          .setLngLat(props.coords)
          .addTo(props.map);
      }
    });
    return {
      markerRef,
    };
  },
});
</script>

<style>
.marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  margin: 0;
}

.goal {
  background-image: url("~@/assets/goal.svg");
}

.guess {
  background-image: url("~@/assets/guess.svg");
}

.no-show {
  display: none;
  pointer-events: none;
}
</style>

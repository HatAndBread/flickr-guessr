<template>
  <div></div>
  <button @click="startGame">Start</button>
  <p>{{ currentTime }}</p>
  <div class="images-container">
    <div v-if="apiError">There has been an error.</div>
    <Image
      v-for="(url, index) in imageUrls"
      :key="index"
      :src="url.url"
      :originalItem="url.originalItem"
      alt="error!"
      :errorCallback="imageErrorCallback"
      :showAltOnError="false"
      :onClick="imageClick"
      v-else
    />
  </div>
  <div class="modal large-image-modal" v-if="largeImageUrl">
    <div class="modal-closer" @click="closeModal">x</div>
    <img :src="largeImageUrl" />
  </div>
  <p v-if="distanceAway">{{ distanceAway }} km away!</p>
  <Map :zoom="1" :onMapClick="handleMapClick" :answerCoords="answerCoords" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getPictures } from "./Flickr/getPictures";
import { getUrlString } from "./Flickr/getUrlString";
import { LatLngPhoto } from "../types/flickrTypes";
import { getDistanceBetween } from "./Flickr/getDistanceBetween";
import { getRandomCoordsAndPictures } from "./Flickr/getRandomCoordsAndPictures";
import Map from "@/components/Map.vue";
import Image from "@/components/Image.vue";
export default defineComponent({
  name: "Flickr",
  components: {
    Image,
    Map,
  },
  setup() {
    let imageUrls = ref<{ url: string; originalItem: LatLngPhoto }[]>([]);
    const currentTime = ref(0);
    const apiError = ref(false);
    const distanceAway = ref<null | string>(null);
    const imageErrorCallback = () => (apiError.value = true);
    const largeImageUrl = ref<null | string>(null);
    const answerCoords = ref<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
    const handleMapClick = (lngLat: { lat: number; lng: number }) => {
      if (answerCoords.value) {
        distanceAway.value = getDistanceBetween(
          lngLat.lat,
          lngLat.lng,
          answerCoords.value.lat,
          answerCoords.value.lng
        ).toFixed(0);
      }
    };
    const imageClick = function(item: LatLngPhoto) {
      largeImageUrl.value = getUrlString(item, "l");
    };
    const closeModal = () => (largeImageUrl.value = null);
    const startGame = async () => {
      await getRandomCoordsAndPictures(answerCoords, imageUrls);
      const interval = setInterval(() => {
        if (currentTime.value < 10) {
          currentTime.value += 1;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };
    return {
      currentTime,
      startGame,
      getPictures,
      imageUrls,
      imageErrorCallback,
      apiError,
      imageClick,
      largeImageUrl,
      closeModal,
      answerCoords,
      handleMapClick,
      distanceAway,
    };
  },
});
</script>

<style>
.images-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.images-container img {
  margin: 8px;
  cursor: pointer;
}
</style>

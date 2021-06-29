<template>
  <div>
    <button @click="startGame">Start</button>
    <p>{{ currentTime }}</p>
    <div class="image-map-container">
      <div class="images-container" v-if="imageUrls.length > 0">
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
      <Map
        :zoom="0"
        :onMapClick="handleMapClick"
        :answerCoords="answerCoords"
      />
    </div>
    <p v-if="distanceAway">{{ distanceAway }} km away!</p>
  </div>
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
.image-map-container {
  display: flex;
  justify-content: center;
  width: 100vw;
}
.images-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0;
  column-count: 0;
  margin: 16px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  background-color: rgba(50, 50, 50, 0.7);
  box-shadow: rgba(50, 50, 50, 0.7) 1px 1px 1px 1px;
}
.images-container .Image {
  cursor: pointer;
  width: 180px;
  height: 180px;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
@media only screen and (max-width: 1000px) {
  .image-map-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>

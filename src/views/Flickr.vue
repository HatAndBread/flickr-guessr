<template>
  <div>
    <button @click="startGame" v-if="!gameIsFinished">Start</button>
    <p>{{ currentTime }}</p>
    <p>Try: {{ roundNumber }}</p>
    <Hearts :lives="lives" />
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
        <BigImage :src="largeImageUrl" />
      </div>
      <Map
        :zoom="0"
        :onMapClick="handleMapClick"
        :answerCoords="answerCoords"
        :showGoal="showGoal"
        :showGuess="showGuess"
        :roundStarted="roundStarted"
        :gameIsFinished="gameIsFinished"
      />
    </div>
    <p v-if="distanceAway">{{ distanceAway }} km away!</p>
    <div v-if="gameIsFinished">
      The game is finished
      <button @click="playAgain">Play Again</button>
    </div>
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
import BigImage from "@/components/BigImage.vue";
import Hearts from "@/components/Hearts.vue";
export default defineComponent({
  name: "Flickr",
  components: {
    Image,
    Map,
    BigImage,
    Hearts,
  },
  setup() {
    let imageUrls = ref<{ url: string; originalItem: LatLngPhoto }[]>([]);
    const roundNumber = ref(0);
    const roundStarted = ref(false);
    const lives = ref(0);
    const currentTime = ref(60);
    const apiError = ref(false);
    const showGoal = ref(false);
    const showGuess = ref(false);
    const gameIsFinished = ref(false);
    const distanceAway = ref<null | string>(null);
    const imageErrorCallback = () => (apiError.value = true);
    const largeImageUrl = ref<null | string>(null);
    const answerCoords = ref<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
    const endRound = () => {
      if (roundNumber.value === 5) {
        gameIsFinished.value = true;
      }
      roundStarted.value = false;
      showGoal.value = true;
    };
    const handleMapClick = (lngLat: { lat: number; lng: number }) => {
      if (roundStarted.value) {
        showGuess.value = true;
        if (lives.value > 1) {
          lives.value -= 1;
        } else {
          lives.value -= 1;
          endRound();
        }
        if (answerCoords.value) {
          distanceAway.value = getDistanceBetween(
            lngLat.lat,
            lngLat.lng,
            answerCoords.value.lat,
            answerCoords.value.lng
          ).toFixed(0);
          if (parseInt(distanceAway.value) < 10) {
            console.log("You won!");
          }
        }
      }
    };
    const imageClick = function(item: LatLngPhoto) {
      largeImageUrl.value = getUrlString(item, "l");
      document.body.style.height = `100vh`;
      document.body.style.overflowY = `hidden`;
    };
    const closeModal = () => {
      largeImageUrl.value = null;
      document.body.style.height = `initial`;
      document.body.style.overflowY = `initial`;
    };
    const startGame = async () => {
      await getRandomCoordsAndPictures(answerCoords, imageUrls);
      roundNumber.value += 1;
      roundStarted.value = true;
      showGoal.value = false;
      showGuess.value = false;
      gameIsFinished.value = false;
      lives.value = 5;
      currentTime.value = 60;
      const interval = setInterval(() => {
        if (currentTime.value > 0) {
          currentTime.value -= 1;
          if (!roundStarted.value) {
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
          if (roundStarted.value) {
            endRound();
          }
        }
      }, 1000);
    };
    const playAgain = () => {
      roundNumber.value = 0;
      startGame();
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
      lives,
      roundNumber,
      roundStarted,
      showGoal,
      showGuess,
      gameIsFinished,
      playAgain,
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
  width: 200px;
  height: 200px;
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
@media only screen and (max-width: 500px) {
  .images-container .Image {
    width: 45vw;
    height: 45vw;
  }
}
</style>

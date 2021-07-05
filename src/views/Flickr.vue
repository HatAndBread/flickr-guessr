<template>
  <div class="FlickrGame">
    <button @click="startGame" v-if="!gameIsStarted">
      Start
    </button>
    <button
      class="map-image-toggle-btn"
      @click="toggleMap"
      v-if="gameIsStarted && !showNextRoundButton && !gameIsFinished"
    >
      Show {{ showMap ? "Images" : "Map" }}
    </button>
    <button @click="startGame" v-if="showNextRoundButton">Next Round</button>
    <button @click="playAgain" v-if="gameIsFinished">Play Again</button>
    <GameStatus
      :lives="lives"
      :roundNumber="roundNumber"
      :currentTime="currentTime"
      :distanceAway="distanceAway"
      :roundStarted="roundStarted"
      :countryBonus="countryBonus"
      :points="points"
    />
    <div class="image-map-container">
      <Map
        :zoom="1.5"
        :onMapClick="handleMapClick"
        :answerCoords="answerCoords"
        :showGoal="showGoal"
        :showGuess="showGuess"
        :roundStarted="roundStarted"
        :gameIsFinished="gameIsFinished"
        :distanceAway="distanceAway"
        :countryBonus="countryBonus"
        :showMap="showMap"
        :gameIsStarted="gameIsStarted"
      />
      <div class="images-container" v-if="imageUrls.length > 0 && !showMap">
        <div v-if="apiError">There has been an error.</div>
        <div
          class="small-image-container"
          v-for="(url, index) in imageUrls"
          :key="index"
          v-else
        >
          <Image
            :src="url.url"
            :originalItem="url.originalItem"
            alt="error!"
            :errorCallback="imageErrorCallback"
            :showAltOnError="false"
            :onClick="imageClick"
          />
        </div>
      </div>
      <div class="modal large-image-modal" v-if="largeImageUrl">
        <div class="modal-closer" @click="closeModal">x</div>
        <BigImage :src="largeImageUrl" />
      </div>
    </div>
    <after-each-round-modal
      :showAfterRoundModal="showAfterRoundModal"
      :pointsThisRound="allRoundsResults[roundNumber - 1]"
      :distanceAway="distanceAway"
      :closeAfterRoundModal="closeAfterRoundModal"
      :startGame="startGame"
      :activateNextRoundButton="activateNextRoundButton"
      :winMessage="winMessage"
    />
    <after-each-game-modal
      :showAfterGameModal="showAfterGameModal"
      :closeModal="closeAfterGameModal"
      :points="points"
      :allRoundsResults="allRoundsResults"
      :winMessage="winMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getPictures } from "./Flickr/getPictures";
import { getUrlString } from "./Flickr/getUrlString";
import { LatLngPhoto } from "../types/flickrTypes";
import { getDistanceBetween } from "./Flickr/getDistanceBetween";
import { getRandomCoordsAndPictures } from "./Flickr/getRandomCoordsAndPictures";
import { getCountryCode } from "./Flickr/getCountryCode";
import Map from "@/components/Map.vue";
import Image from "@/components/Image.vue";
import BigImage from "@/components/BigImage.vue";
import GameStatus from "@/components/GameStatus.vue";
import AfterEachRoundModal from "@/components/AfterEachRoundModal.vue";
import AfterEachGameModal from "@/components/AfterEachGameModal.vue";
export default defineComponent({
  name: "Flickr",
  components: {
    Image,
    Map,
    BigImage,
    GameStatus,
    AfterEachRoundModal,
    AfterEachGameModal,
  },
  setup() {
    let imageUrls = ref<{ url: string; originalItem: LatLngPhoto }[]>([]);
    const roundNumber = ref(0);
    const roundStarted = ref(false);
    const lives = ref(5);
    const currentTime = ref(60);
    const apiError = ref(false);
    const showGoal = ref(false);
    const showGuess = ref(false);
    const showMap = ref(false);
    const winMessage = ref<null | string>(null);
    const showNextRoundButton = ref(false);
    const activateNextRoundButton = () => (showNextRoundButton.value = true);
    const gameIsStarted = ref(false);
    const gameIsFinished = ref(false);
    const showAfterRoundModal = ref(false);
    const closeAfterRoundModal = () => (showAfterRoundModal.value = false);
    const showAfterGameModal = ref(false);
    const closeAfterGameModal = () => (showAfterGameModal.value = false);
    const points = ref(0);
    const allRoundsResults = ref<number[]>([0, 0, 0, 0, 0]);
    const countryBonus = ref(0);
    const distanceAway = ref<null | string>(null);
    const imageErrorCallback = () => (apiError.value = true);
    const largeImageUrl = ref<null | string>(null);
    const answerCoords = ref<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
    const answerCountryCode = ref("");
    const toggleMap = () => {
      showMap.value ? (showMap.value = false) : (showMap.value = true);
    };
    const endRound = () => {
      if (roundNumber.value === 5) {
        setTimeout(() => {
          showAfterGameModal.value = true;
        }, 2000);
        gameIsFinished.value = true;
        imageUrls.value = [];
      }
      roundStarted.value = false;
      showGoal.value = true;
    };
    const addPoints = (win?: boolean) => {
      if (distanceAway.value) {
        const distance = parseInt(distanceAway.value);
        const p = (40000 - distance * 2) * (lives.value + 1);
        const divisor = distance * 0.01 < 1 ? 1 : distance * 0.01;
        const totalPoints =
          (win ? p : Math.floor(p / divisor / 2)) + countryBonus.value;
        allRoundsResults.value[roundNumber.value - 1] = totalPoints;
        points.value += totalPoints;
      }
      countryBonus.value = 0;
      if (roundNumber.value < 5) {
        setTimeout(() => {
          showAfterRoundModal.value = true;
        }, 2500);
      }
    };
    const handleMapClick = async (lngLat: { lat: number; lng: number }) => {
      if (roundStarted.value) {
        showGuess.value = true;
        const countryCode = await getCountryCode(lngLat);
        if (
          countryCode === answerCountryCode.value &&
          countryBonus.value === 0
        ) {
          countryBonus.value = lives.value * 1000;
        }
        if (answerCoords.value) {
          distanceAway.value = getDistanceBetween(
            lngLat.lat,
            lngLat.lng,
            answerCoords.value.lat,
            answerCoords.value.lng
          ).toFixed(0);
          if (parseInt(distanceAway.value) <= 10) {
            winMessage.value = `Congratulations!🎉🥳✨ \n You guessed within ${distanceAway.value} km of the original location!`;
            endRound();
            addPoints(true);
          } else if (lives.value > 1) {
            lives.value -= 1;
          } else {
            lives.value -= 1;
            endRound();
            addPoints();
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
      roundStarted.value = true;
      distanceAway.value = null;
      gameIsStarted.value = true;
      winMessage.value = null;
      showNextRoundButton.value = false;
      showMap.value = false;
      points.value += countryBonus.value;
      countryBonus.value = 0;
      await getRandomCoordsAndPictures(
        answerCoords,
        imageUrls,
        answerCountryCode
      );
      roundNumber.value += 1;
      showGoal.value = false;
      showGuess.value = false;
      gameIsFinished.value = false;
      lives.value = 5;
      currentTime.value = 60;
      const interval = setInterval(() => {
        if (currentTime.value > 0) {
          currentTime.value -= 0.1;
          if (!roundStarted.value) {
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
          if (roundStarted.value) {
            endRound();
            addPoints();
          }
        }
      }, 100);
    };
    const playAgain = () => {
      points.value = 0;
      roundNumber.value = 0;
      allRoundsResults.value = [0, 0, 0, 0, 0];
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
      showAfterRoundModal,
      showNextRoundButton,
      showAfterGameModal,
      showMap,
      toggleMap,
      closeAfterGameModal,
      activateNextRoundButton,
      closeAfterRoundModal,
      gameIsStarted,
      points,
      countryBonus,
      allRoundsResults,
      gameIsFinished,
      playAgain,
      winMessage,
    };
  },
});
</script>

<style>
.FlickrGame {
  font-family: "Amatic SC", monospace;
  margin-bottom: 16px;
}
.image-map-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.images-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  row-gap: 0;
  column-count: 0;
  margin: 0px 32px;
  justify-content: center;
  align-items: center;
  height: 68vh;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-top-style: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
}
.small-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.images-container .Image {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: lightgray;
}
.images-container img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 350px) {
  .images-container {
    margin: 0px 16px;
  }
}
</style>

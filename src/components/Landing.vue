<template>
  <div class="hello">
    <h1 class="landing-title">Games For Geography Geeks</h1>
    <p class="landing-explanation"></p>
    <Image :src="earth" alt="🌍" width="250" :showAltOnError="false" />
    <div class="card-container">
      <game-card
        title="Flickr Guessr"
        description="Examine four randomally selected photographs from Flickr that were all taken within a 5 kilometer radius of one another. Use context clues and other hints to pinpoint on a map where in the world
        they were taken. Guess within 10 kilometers
        for mega bounus points!"
        :img="flickrIcon"
        link="flickr-guessr"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store";
import Image from "@/components/Image.vue";
import GameCard from "@/components/GameCard.vue";
import earth from "../assets/planet-earth.svg";
import flickrIcon from "../assets/picture.svg";

export default defineComponent({
  name: "Landing",
  components: {
    Image,
    GameCard,
  },
  data: function() {
    return { earth, flickrIcon };
  },
  props: {
    userName: String,
  },
  methods: {
    doStuff: () => {
      store.setUserName(`Idiot ${Math.floor(Math.random() * 1000)}`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #5f2892;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

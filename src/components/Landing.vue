<template>
  <div class="landing">
    <div class="landing-main">
      <h1 class="landing-title">Games For Geography Geeks</h1>
      <Image :src="earth" alt="🌍" width="250" :showAltOnError="false" />
      <div class="card-container">
        <game-card
          title="Flickr Guessr"
          description="Examine four randomly selected photographs from Flickr that were taken within a 5 kilometer radius of one another. Use context clues and other hints to pinpoint on a map where in the world
        they were taken. Guess within 10 kilometers
        for mega bonus points!"
          :img="flickrIcon"
          link="flickr-guessr"
        />
      </div>
    </div>
    <footer>
      <div>Made with ❤️ by Joshua Hume.</div>
      <div class="footer-links">
        <a href="https://github.com/HatAndBread" target="_blank">
          <img :src="gitIcon" alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/joshua-hume-0259691ab/"
          target="_blank"
        >
          <img :src="linkIcon" alt="LinkedIn" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../store";
import Image from "@/components/Image.vue";
import GameCard from "@/components/GameCard.vue";
import earth from "../assets/planet-earth.svg";
import flickrIcon from "../assets/picture.svg";
import gitIcon from "@/assets/github.png";
import linkIcon from "@/assets/linkedin.png";

export default defineComponent({
  name: "Landing",
  components: {
    Image,
    GameCard,
  },
  data: function() {
    return { earth, flickrIcon, gitIcon, linkIcon };
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
.landing-main {
  min-height: calc(100vh - 80px);
}
h1 {
  color: #5f2892;
}
.card-container {
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
footer {
  background-color: lavender;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
}
.footer-links {
  margin: 8px;
  display: flex;
  justify-content: space-between;
  width: 100px;
}
</style>

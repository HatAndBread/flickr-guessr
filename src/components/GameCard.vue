<template>
  <div class="GameCard">
    <Image :src="img" alt="" width="100" :showAltOnError="false" />
    <div class="text-content">
      <router-link :to="`/${link}`">
        <div class="card-title">{{ title }}</div>
      </router-link>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Image from "@/components/Image.vue";
export default defineComponent({
  components: {
    Image,
  },
  props: {
    title: String,
    description: String,
    link: String,
    img: String,
  },
});
</script>

<style scoped>
.GameCard {
  max-width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  margin: 16px;
  min-height: 100px;
  width: 80%;
  box-shadow: gray 0px 0px 2px 2px;
  border-radius: 16px;
}
.text-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background-color: transparent;
}
.card-title {
  font-size: 32px;
}
.description {
  padding: 8px;
  text-align: left;
  margin: 0;
  font-family: monospace;
  font-size: large;
}
.Image {
  min-width: 100px;
}
@media only screen and (max-width: 600px) {
  .description {
    font-size: medium;
  }
}
</style>

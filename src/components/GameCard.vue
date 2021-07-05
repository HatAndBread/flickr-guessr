<template>
  <div class="GameCard">
    <router-link :to="`/${link}`">
      <div class="card-title">{{ title }}</div>
    </router-link>
    <Image :src="img" alt="" width="100" :showAltOnError="false" />
    <p class="description">{{ description }}</p>
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
  padding: 8px;
  margin: 16px;
  min-height: 100px;
  width: 80%;
  box-shadow: gray 0px 0px 2px 2px;
  border-radius: 16px;
}
.card-title {
  font-size: 32px;
}
.description {
  padding: 8px;
  text-align: left;
  font-family: monospace;
  font-size: large;
}
.Image {
  min-width: 100px;
  float: left;
  margin-right: 16px;
}
@media only screen and (max-width: 600px) {
  .description {
    font-size: medium;
  }
}
</style>

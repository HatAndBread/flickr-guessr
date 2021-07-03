<template>
  <div class="Hearts" v-if="typeof lives === 'number'">
    <img :src="heartSrc" alt="♥️" v-for="life in lives" :key="life" />
    <div class="" v-if="!lives">-----</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import heartSrc from "@/assets/heart.svg";

export default defineComponent({
  props: {
    lives: Number,
  },
  data: function() {
    return {
      heartSrc,
    };
  },
});
</script>

<style scoped>
.Hearts {
  color: red;
}
img {
  width: 24px;
  height: 24px;
  margin-left: 4px;
  margin-right: 4px;
}
@media only screen and (max-width: 800px) {
  img {
    width: 16px;
    height: 16px;
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>

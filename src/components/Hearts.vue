<template>
  <div class="Hearts" v-if="lives">
    <img :src="heartSrc" alt="♥️" v-for="life in lives" :key="life" />
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
  width: 40px;
  height: 40px;
  margin: 8px;
}
</style>

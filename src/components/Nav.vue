<template>
  <div class="Nav">
    <router-link to="/"
      ><Image :src="earth" alt="🌍" width="32" class="earth"
    /></router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Image from "./Image.vue";
import earth from "@/assets/planet-earth.svg";

export default defineComponent({
  name: "Nav",
  data: function() {
    return { earth };
  },
  components: {
    Image,
  },
});
</script>

<style scoped>
.Nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}
.earth {
  margin: 8px;
}
</style>

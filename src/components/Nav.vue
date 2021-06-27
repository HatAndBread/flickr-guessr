<template>
  <div class="Nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Nav",
});
</script>

<style scoped>
.Nav {
  height: 80px;
  width: 100%;
  background-color: lavender;
}
</style>

<template>
  <div class="Nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/flickr-guessr">Flickr Guessr</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Nav",
});
</script>

<style scoped>
.Nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  background-color: lavender;
  margin-bottom: 8px;
}
</style>

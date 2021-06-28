<template>
  <div></div>
  <button @click="startGame">Start</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Flickr",
  setup() {
    const startGame = () => {
      console.log("Game started!");
    };
    const getPictures = async () => {
      await fetch("/");
    };
    return {
      startGame,
    };
  },
});
</script>

<style scoped></style>

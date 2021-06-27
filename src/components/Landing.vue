<template>
  <div class="hello">
    <h1 class="landing-title">Flickr Geoguessr</h1>
    <p class="landing-explanation"></p>
    <h1>{{ msg }}</h1>
    <p class="fuck" v-bind:title="msg">{{ apiKey }} asfsadsfds</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Landing",
  props: {
    msg: String,
    apiKey: String,
  },
  methods: {
    doStuff: () => {
      console.log("shit");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: lightcoral;
}
</style>

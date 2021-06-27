<template>
  <div class="hello">
    <h1 class="landing-title">Flickr Geoguessr</h1>
    <p class="landing-explanation"></p>
    <h1>{{ msg }}</h1>
    <p class="" v-bind:title="msg">{{ userName }} asfsadsfds</p>
    <button @click="doStuff">Click me</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { store } from '../store';

export default defineComponent({
  name: "Landing",
  props: {
    msg: String,
    userName: String,
  },
  methods: {
    doStuff: () => {
      store.setUserName(`Idiot ${Math.floor(Math.random()* 1000)}`)
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

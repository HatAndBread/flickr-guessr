<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "./components/Nav.vue";
import "./globalCss.css";
console.log("env: ", process.env);
console.log(process);
export default defineComponent({
  components: {
    Nav,
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Amatic SC", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  font-size: x-large;
}
</style>

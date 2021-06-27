<template>
  <div id="app">
    <Nav />
    <Landing msg="Fuck" :apiKey="store.state.flickrKey" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "./components/Nav.vue";
import Landing from "./components/Landing.vue";

interface Store {
  debug: boolean;
  state: {
    flickrKey: string;
    mapboxKey: string;
    userName: null | string;
  };
  setUserName: (newName: string) => void;
}

export const store: Store = {
  debug: true,
  state: {
    flickrKey: process.env.VUE_APP_FLICKR_KEY,
    mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
    userName: null,
  },
  setUserName: function (newName: string) {
    this.state.userName = newName;
  },
};

export default defineComponent({
  components: {
    Nav,
    Landing,
  },
  data(): { store: Store } {
    return {
      store,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

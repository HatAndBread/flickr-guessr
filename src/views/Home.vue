<template>
  <div class="home">
    <Landing
      msg="Welcome to Your Vue.js App adflaskjfkldjasf"
      :userName="store.state.userName"
    />
    <Image :src="earth" alt="foo-foo" width="50" />
    <Map />
  </div>
</template>

<script lang="ts">
import Landing from "@/components/Landing.vue";
import Image from "@/components/Image.vue";
import { defineComponent } from "vue";
import { store, Store } from "@/store";
import earth from "../assets/planet-earth.svg";
import Map from "@/components/Map.vue";

export default defineComponent({
  name: "Home",
  components: {
    Landing,
    Image,
    Map,
  },
  data(): { store: Store; earth: string } {
    return { store, earth };
  },
});
</script>

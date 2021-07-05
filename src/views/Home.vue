<template>
  <div class="home">
    <Landing :userName="store.state.userName" />
  </div>
</template>

<script lang="ts">
import Landing from "@/components/Landing.vue";
import { defineComponent } from "vue";
import { store, Store } from "@/store";
import earth from "../assets/planet-earth.svg";

export default defineComponent({
  name: "Home",
  components: {
    Landing,
  },
  data(): { store: Store; earth: string } {
    return { store, earth };
  },
});
</script>

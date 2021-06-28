<template>
  <div>
    <div v-if="hasError">{{ alt }}</div>
    <img :src="src" :alt="alt" @error="onError" :width="getWidth" v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  data(): { hasError: boolean } {
    return {
      hasError: false,
    };
  },
  props: {
    src: String,
    alt: String,
    width: String,
  },
  methods: {
    onError: function() {
      this.hasError = true;
    },
  },
  computed: {
    getWidth(): string | undefined {
      return typeof this.width === "string" ? this.width : undefined;
    },
  },
});
</script>

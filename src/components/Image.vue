<template>
  <div class="Image">
    <div v-if="hasError && showAltOnError">{{ alt }}</div>
    <img
      :src="src"
      :alt="alt"
      @error="onError"
      :width="getWidth"
      v-else-if="!hasError"
      @click="handleClick"
      :class="{ pointer: onClick }"
    />
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
    errorCallback: Function,
    showAltOnError: Boolean,
    onClick: Function,
    originalItem: Object,
  },
  methods: {
    onError: function() {
      this.hasError = true;
    },
    handleClick: function() {
      if (
        this.onClick &&
        typeof this.onClick === "function" &&
        this.originalItem
      ) {
        this.onClick(this.originalItem);
      }
    },
  },
  computed: {
    getWidth(): string | undefined {
      return typeof this.width === "string" ? this.width : undefined;
    },
  },
  watch: {
    hasError: function(val) {
      if (val && this.errorCallback) {
        this.errorCallback();
      }
    },
  },
});
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.Image img {
  border-radius: 8px;
  max-height: 80vh;
}
</style>
